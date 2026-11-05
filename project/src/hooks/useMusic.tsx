import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { wedding } from '../config/wedding';

interface MusicState {
  isPlaying: boolean;
  /** Whether the guest turned music off during this visit. */
  userMuted: boolean;
  /** Start music — must be called from a user gesture (click / tap). */
  start: () => void;
  toggle: () => void;
  /** Pause without recording a preference (e.g. while the film plays). */
  pauseForMedia: () => void;
}

const MusicContext = createContext<MusicState | null>(null);
const PREF_KEY = 'vk-wedding-music-muted';

function readPref(): boolean {
  try {
    return window.sessionStorage.getItem(PREF_KEY) === '1';
  } catch {
    return false;
  }
}
function writePref(muted: boolean) {
  try {
    window.sessionStorage.setItem(PREF_KEY, muted ? '1' : '0');
  } catch {
    /* ignore */
  }
}

/**
 * Background music. Never autoplays: playback only begins after an explicit
 * tap (the "Open Wedding Invitation" button or the music toggle). The guest's
 * on/off choice is remembered for the current browser session.
 */
export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userMuted, setUserMuted] = useState(readPref);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(wedding.music.src);
      audio.loop = true;
      audio.preload = 'none';
      audio.volume = 0;
      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const fadeTo = useCallback((audio: HTMLAudioElement, target: number, then?: () => void) => {
    window.clearInterval(fadeRef.current);
    const step = (target - audio.volume) / 20;
    if (Math.abs(step) < 0.001) {
      audio.volume = target;
      then?.();
      return;
    }
    fadeRef.current = window.setInterval(() => {
      const next = audio.volume + step;
      if ((step > 0 && next >= target) || (step < 0 && next <= target)) {
        audio.volume = Math.max(0, Math.min(1, target));
        window.clearInterval(fadeRef.current);
        then?.();
      } else {
        audio.volume = Math.max(0, Math.min(1, next));
      }
    }, 40);
  }, []);

  const play = useCallback(() => {
    const audio = getAudio();
    audio.preload = 'auto';
    audio
      .play()
      .then(() => fadeTo(audio, wedding.music.volume))
      .catch(() => setIsPlaying(false));
  }, [fadeTo, getAudio]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeTo(audio, 0, () => audio.pause());
  }, [fadeTo]);

  const start = useCallback(() => {
    if (!readPref()) play();
  }, [play]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
      setUserMuted(true);
      writePref(true);
    } else {
      play();
      setUserMuted(false);
      writePref(false);
    }
  }, [isPlaying, pause, play]);

  const pauseForMedia = useCallback(() => pause(), [pause]);

  // Pause when the tab is hidden; resume if it was playing.
  useEffect(() => {
    let resume = false;
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.visibilityState === 'hidden' && !audio.paused) {
        resume = true;
        audio.pause();
      } else if (document.visibilityState === 'visible' && resume) {
        resume = false;
        audio.play().catch(() => undefined);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.clearInterval(fadeRef.current);
      audioRef.current?.pause();
    };
  }, []);

  const value = useMemo(
    () => ({ isPlaying, userMuted, start, toggle, pauseForMedia }),
    [isPlaying, userMuted, start, toggle, pauseForMedia],
  );
  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic(): MusicState {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used inside <MusicProvider>');
  return ctx;
}
