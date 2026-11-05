import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { LoaderCircle, Maximize, Minimize, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext';

interface Props {
  src: string;
  poster: string;
  width: number;
  height: number;
  title: string;
  /** Called when playback starts (used to pause background music). */
  onPlay?: () => void;
}

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

/** Custom, lightweight video player — no autoplay, keyboard accessible. */
export default function VideoPlayer({ src, poster, width, height, title, onPlay }: Props) {
  const { t } = useLang();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFull, setIsFull] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimer = useRef<number | undefined>(undefined);

  const pokeControls = useCallback(() => {
    setControlsVisible(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setControlsVisible(false);
    }, 2600);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused || v.ended) {
      setStarted(true);
      setLoading(v.readyState < 3);
      v.play().catch(() => {
        setLoading(false);
        setPlaying(false);
      });
    } else {
      v.pause();
    }
    pokeControls();
  }, [pokeControls]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const wrap = wrapRef.current;
    const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!wrap || !v) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (wrap.requestFullscreen) {
        await wrap.requestFullscreen();
      } else if (v.webkitEnterFullscreen) {
        v.webkitEnterFullscreen(); // iPhone Safari
      }
    } catch {
      v.webkitEnterFullscreen?.();
    }
  }, []);

  useEffect(() => {
    const onFs = () => setIsFull(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFs);
    return () => {
      document.removeEventListener('fullscreenchange', onFs);
      window.clearTimeout(hideTimer.current);
    };
  }, []);

  // Pause when scrolled out of view.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && !v.paused && !document.fullscreenElement) v.pause();
    }, { threshold: 0.15 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const seek = (e: PointerEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * duration;
    setTime(v.currentTime);
  };

  const onSeekKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    if (e.key === 'ArrowRight') v.currentTime = Math.min(duration, v.currentTime + 5);
    if (e.key === 'ArrowLeft') v.currentTime = Math.max(0, v.currentTime - 5);
  };

  const progress = duration ? (time / duration) * 100 : 0;

  return (
    <div
      ref={wrapRef}
      className={`group relative mx-auto overflow-hidden bg-maroon-deep ${isFull ? 'flex h-full w-full items-center justify-center' : ''}`}
      style={isFull ? undefined : { aspectRatio: `${width} / ${height}` }}
      onPointerMove={pokeControls}
      onPointerDown={pokeControls}
    >
      <video
        ref={videoRef}
        className={`h-full w-full ${isFull ? 'object-contain' : 'object-cover'}`}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        width={width}
        height={height}
        aria-label={title}
        onClick={togglePlay}
        onPlay={() => {
          setPlaying(true);
          onPlay?.();
          pokeControls();
        }}
        onPause={() => {
          setPlaying(false);
          setControlsVisible(true);
        }}
        onEnded={() => {
          setPlaying(false);
          setControlsVisible(true);
        }}
        onWaiting={() => setLoading(true)}
        onPlaying={() => setLoading(false)}
        onCanPlay={() => setLoading(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />

      {/* Big centre play button */}
      {!playing && !error && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={t.video.play}
          className={`absolute flex items-center justify-center ${started ? 'inset-x-0 top-0 bottom-24' : 'inset-0 bg-gradient-to-t from-maroon-deep/55 via-transparent to-transparent'}`}
        >
          <span className="anim-glow flex h-20 w-20 items-center justify-center rounded-full border border-gold-soft/80 bg-maroon/85 text-gold-soft shadow-2xl backdrop-blur-sm transition-transform duration-500 group-hover:scale-105 sm:h-24 sm:w-24">
            <Play className="ml-1 h-8 w-8" strokeWidth={1.4} fill="currentColor" />
          </span>
          {!started && <span className="sr-only">{title}</span>}
        </button>
      )}

      {loading && !error && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-maroon-deep/30 text-gold-soft" role="status">
          <LoaderCircle className="h-9 w-9 animate-spin" strokeWidth={1.4} />
          <span className="text-xs tracking-[0.2em] uppercase t-caps">{t.video.loading}</span>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-maroon-deep/85 p-8 text-center text-sm text-cream" role="alert">
          {t.video.error}
        </div>
      )}

      {/* Control bar */}
      {started && !error && (
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent px-3 pb-3 pt-10 transition-opacity duration-500 sm:px-4 ${
            controlsVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div
            role="slider"
            tabIndex={0}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(time)}
            aria-valuetext={`${fmt(time)} / ${fmt(duration)}`}
            onPointerDown={seek}
            onKeyDown={onSeekKey}
            className="group/seek relative mb-2 h-5 cursor-pointer touch-none"
          >
            <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/25" />
            <div className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-gold-soft" style={{ width: `${progress}%` }} />
            <div className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-soft shadow" style={{ left: `${progress}%` }} />
          </div>
          <div className="flex items-center gap-1 text-cream">
            <button type="button" onClick={togglePlay} aria-label={playing ? t.video.pause : t.video.play} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10">
              {playing ? <Pause className="h-5 w-5" strokeWidth={1.6} /> : <Play className="h-5 w-5" strokeWidth={1.6} />}
            </button>
            <button type="button" onClick={toggleMute} aria-label={muted ? t.video.unmute : t.video.mute} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10">
              {muted ? <VolumeX className="h-5 w-5" strokeWidth={1.6} /> : <Volume2 className="h-5 w-5" strokeWidth={1.6} />}
            </button>
            <span className="ml-1 font-sans text-xs tabular-nums text-cream/85">
              {fmt(time)} / {fmt(duration)}
            </span>
            <button type="button" onClick={toggleFullscreen} aria-label={isFull ? t.video.exitFullscreen : t.video.fullscreen} className="ml-auto flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10">
              {isFull ? <Minimize className="h-5 w-5" strokeWidth={1.6} /> : <Maximize className="h-5 w-5" strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
