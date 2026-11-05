import { useCallback, useEffect, useRef, type TouchEvent } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryImage } from '../../data/gallery';
import { useLang } from '../../i18n/LanguageContext';

interface Props {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}

export default function Lightbox({ images, index, onClose, onIndex }: Props) {
  const { t, pick } = useLang();
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const count = images.length;

  const prev = useCallback(() => index !== null && onIndex((index - 1 + count) % count), [index, count, onIndex]);
  const next = useCallback(() => index !== null && onIndex((index + 1) % count), [index, count, onIndex]);

  useEffect(() => {
    if (!open) return;
    const lastFocus = document.activeElement as HTMLElement | null;
    document.body.classList.add('no-scroll');
    closeRef.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
      lastFocus?.focus?.();
    };
  }, [open, onClose, prev, next]);

  // Preload neighbours for instant navigation.
  useEffect(() => {
    if (index === null) return;
    [index - 1, index + 1].forEach((i) => {
      const img = new Image();
      img.src = images[(i + count) % count].full;
    });
  }, [index, images, count]);

  const onTouchStart = (e: TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
    touchX.current = null;
  };

  const current = index !== null ? images[index] : null;

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[70] flex flex-col bg-maroon-deep/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex items-center justify-between px-4 py-3 text-gold-soft sm:px-6">
            <span className="font-sans text-xs tracking-[0.25em] tabular-nums">
              {String(index! + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <button ref={closeRef} type="button" onClick={onClose} aria-label={t.gallery.close} className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-soft/40 hover:bg-white/10">
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20" onClick={onClose}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={current.id}
                src={current.full}
                alt={current.alt}
                width={current.width}
                height={current.height}
                onClick={(e) => e.stopPropagation()}
                className="max-h-full max-w-full object-contain shadow-2xl"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label={t.gallery.prev}
              className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold-soft/40 bg-maroon-deep/60 text-gold-soft hover:bg-maroon sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={1.4} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label={t.gallery.next}
              className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold-soft/40 bg-maroon-deep/60 text-gold-soft hover:bg-maroon sm:right-6"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={1.4} />
            </button>
          </div>

          <p className="px-6 pb-6 pt-4 text-center font-display text-lg italic text-gold-soft sm:text-xl">{pick(current.caption)}</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
