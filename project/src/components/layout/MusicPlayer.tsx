import { motion } from 'framer-motion';
import { Music } from 'lucide-react';
import { useMusic } from '../../hooks/useMusic';
import { useLang } from '../../i18n/LanguageContext';

/** Floating gold music toggle, bottom-right. */
export default function MusicPlayer() {
  const { isPlaying, toggle } = useMusic();
  const { t } = useLang();
  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? t.music.pause : t.music.play}
      aria-pressed={isPlaying}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed bottom-5 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-gold-soft bg-maroon text-gold-soft shadow-[0_12px_30px_-10px_rgba(74,22,30,0.7),inset_0_0_0_3px_#812c32,inset_0_0_0_4px_rgba(227,201,141,0.5)] sm:bottom-7 sm:right-7 ${
        isPlaying ? 'anim-glow' : ''
      }`}
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      {isPlaying ? (
        <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
          {[0, 0.2, 0.4, 0.1].map((d, i) => (
            <span key={i} className="music-bar block h-full w-[3px] rounded-full bg-gold-soft" style={{ animationDelay: `${d}s` }} />
          ))}
        </span>
      ) : (
        <span className="relative" aria-hidden="true">
          <Music className="h-5 w-5" strokeWidth={1.6} />
          <span className="absolute left-1/2 top-1/2 h-[1.5px] w-7 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gold-soft" />
        </span>
      )}
    </motion.button>
  );
}
