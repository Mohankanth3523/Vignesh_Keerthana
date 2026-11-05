import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext';
import { Thoranam } from '../ui/FloralDecoration';
import OrnamentalDivider from '../ui/OrnamentalDivider';
import { wedding } from '../../config/wedding';

const NAV = ['couple', 'events', 'countdown', 'film', 'gallery', 'venue'] as const;

export default function Header() {
  const { t, lang, toggle, pick } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    NAV.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const langButton = (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.nav.languageLabel}
      className={`flex h-10 min-w-10 items-center justify-center rounded-full border border-gold/60 px-3 text-xs font-medium text-maroon transition-colors hover:bg-maroon hover:text-cream ${lang === 'en' ? 'tamil text-[0.8rem]' : 'tracking-[0.15em]'}`}
    >
      {t.nav.language}
    </button>
  );

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled ? 'bg-ivory/85 shadow-[0_1px_0_rgba(198,161,91,0.35)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
          <a href="#top" className="flex items-center gap-2" aria-label={`${wedding.groom.shortName.en} & ${wedding.bride.shortName.en} — home`}>
            <img src="assets/decorations/monogram.webp" alt="" width={753} height={456} className="h-9 w-auto" />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
            {NAV.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`link-underline py-1 text-[0.7rem] font-medium uppercase tracking-[0.2em] t-caps transition-colors ${
                  active === id ? 'text-maroon [background-size:100%_1px]' : 'text-ink/80 hover:text-maroon'
                }`}
              >
                {t.nav[id]}
              </a>
            ))}
            {langButton}
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            {langButton}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.nav.menu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-maroon"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ivory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Thoranam className="shrink-0" height={60} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.nav.close}
              className="absolute right-4 top-16 flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-cream text-maroon"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <nav aria-label="Mobile" className="flex flex-1 flex-col items-center justify-center gap-1 py-10">
              {NAV.map((id, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className={`px-6 py-2.5 text-center text-maroon ${lang === 'ta' ? 'tamil text-2xl' : 'display text-[2rem]'}`}
                >
                  {t.nav[id]}
                </motion.a>
              ))}
              <OrnamentalDivider className="mt-6" />
              <p className="mt-4 text-center font-display text-lg italic text-muted">{pick(wedding.dateRangeLabel)}</p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
