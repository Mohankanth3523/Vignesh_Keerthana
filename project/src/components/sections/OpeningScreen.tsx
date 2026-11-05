import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { wedding } from '../../config/wedding';
import { useLang } from '../../i18n/LanguageContext';
import { FallingPetals, JasmineString, KolamPattern, Thoranam } from '../ui/FloralDecoration';
import OrnamentalDivider from '../ui/OrnamentalDivider';
import { Button } from '../ui/Button';

interface Props {
  /** Fired the moment the guest taps "Open" — the site starts revealing. */
  onOpen: () => void;
  /** Fired when the door animation has finished and the overlay can unmount. */
  onDone: () => void;
}

const silk = [0.22, 1, 0.36, 1] as const;
const doorEase = [0.65, 0, 0.35, 1] as const;

/**
 * Cinematic opening: an ivory invitation card whose two halves swing open
 * like temple doors when the guest taps the button.
 */
export default function OpeningScreen({ onOpen, onDone }: Props) {
  const { t, lang, toggle, pick } = useLang();
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => document.body.classList.remove('no-scroll');
  }, []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    window.scrollTo(0, 0);
    onOpen();
    window.setTimeout(onDone, reduce ? 450 : 2300);
  };

  const fadeIn = (delay: number, y = 16) => ({
    initial: { opacity: 0, y },
    animate: opening ? { opacity: 0, y: -14 } : { opacity: 1, y: 0 },
    transition: opening ? { duration: 0.5, ease: silk } : { duration: 1.1, delay, ease: silk },
  });

  const doorTransition = { duration: reduce ? 0.01 : 1.5, delay: reduce ? 0 : 0.45, ease: doorEase };

  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-hidden"
      style={{ perspective: '1800px' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="opening-title"
      initial={{ opacity: 1 }}
      animate={{ opacity: opening && reduce ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Doors */}
      {(['left', 'right'] as const).map((side) => (
        <motion.div
          key={side}
          aria-hidden="true"
          className={`absolute inset-y-0 w-1/2 overflow-hidden bg-ivory ${side === 'left' ? 'left-0' : 'right-0'}`}
          style={{
            transformOrigin: side === 'left' ? 'left center' : 'right center',
            backfaceVisibility: 'hidden',
            backgroundImage:
              'radial-gradient(ellipse at 50% 30%, rgba(255,253,247,.95), transparent 70%), radial-gradient(ellipse at 50% 100%, rgba(227,201,141,.25), transparent 60%)',
          }}
          initial={{ rotateY: 0, x: '0%' }}
          animate={opening ? { rotateY: side === 'left' ? -100 : 100, x: side === 'left' ? '-8%' : '8%' } : { rotateY: 0, x: '0%' }}
          transition={doorTransition}
        >
          <KolamPattern className="absolute inset-0" opacity={0.06} />
          <div
            className={`absolute inset-y-3 border-y border-gold/70 sm:inset-y-5 ${side === 'left' ? 'left-3 right-0 border-l sm:left-5' : 'left-0 right-3 border-r sm:right-5'}`}
          />
          <div
            className={`absolute inset-y-[1.15rem] border-y border-gold/40 sm:inset-y-7 ${side === 'left' ? 'left-[1.15rem] right-0 border-l sm:left-7' : 'left-0 right-[1.15rem] border-r sm:right-7'}`}
          />
          {/* centre seam */}
          <div className={`absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent ${side === 'left' ? 'right-0' : 'left-0'}`} />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(${side === 'left' ? '90deg' : '270deg'}, transparent 70%, rgba(100,31,41,0.06))` }}
          />
        </motion.div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 overflow-y-auto overscroll-contain">
        <motion.div
          className="absolute inset-x-0 top-0"
          initial={{ y: -90 }}
          animate={opening ? { y: -120, opacity: 0 } : { y: 0 }}
          transition={opening ? { duration: 0.7, ease: silk } : { duration: 1.4, delay: 0.2, ease: silk }}
        >
          <Thoranam height={70} />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[62px] flex justify-between px-5 sm:px-12"
          initial={{ opacity: 0, y: -30 }}
          animate={opening ? { opacity: 0 } : { opacity: 1, y: 0 }}
          transition={opening ? { duration: 0.4 } : { duration: 1.4, delay: 0.6, ease: silk }}
        >
          <JasmineString length={150} className="hidden xs:block" delay={0.3} />
          <JasmineString length={200} className="hidden sm:block" delay={1.1} />
          <span className="flex-1" />
          <JasmineString length={200} className="hidden sm:block" delay={0.7} />
          <JasmineString length={150} className="hidden xs:block" delay={0} />
        </motion.div>

        {!opening && <FallingPetals count={5} />}

        <button
          type="button"
          onClick={toggle}
          className={`absolute right-4 top-[78px] z-10 rounded-full border border-gold/50 bg-cream/70 px-3 py-1.5 text-xs text-maroon backdrop-blur-sm sm:right-12 ${lang === 'en' ? 'tamil' : ''}`}
          aria-label={t.nav.languageLabel}
        >
          {t.nav.language}
        </button>

        <div className="relative mx-auto flex min-h-full max-w-xl flex-col items-center justify-center px-6 pb-10 pt-24 text-center sm:px-8 sm:pt-32">
          <motion.img
            src="assets/decorations/ganesha.webp"
            alt="Lord Ganesha"
            width={588}
            height={661}
            className="h-16 w-auto drop-shadow-[0_6px_12px_rgba(100,31,41,0.18)] xs:h-20 sm:h-24"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={opening ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
            transition={opening ? { duration: 0.45 } : { duration: 1.4, delay: 0.3, ease: silk }}
          />

          <motion.p {...fadeIn(0.6)} className={`mt-4 text-maroon ${lang === 'ta' ? 'tamil text-[0.95rem]' : 'font-display text-lg font-medium tracking-[0.08em]'}`}>
            {pick(wedding.blessing)}
          </motion.p>

          <motion.p {...fadeIn(0.8)} className="mt-3 font-display text-[1.05rem] italic text-muted xs:text-lg sm:text-xl">
            {t.opening.blessingsLine}
          </motion.p>
          <motion.p {...fadeIn(0.95)} className="mt-1 font-display text-[1.05rem] italic text-muted xs:text-lg sm:text-xl">
            {t.opening.invited}
          </motion.p>

          <motion.div {...fadeIn(1.1)} className="mt-6">
            <OrnamentalDivider />
          </motion.div>

          <h1 id="opening-title" className="mt-6 flex flex-col items-center">
            <motion.span
              className={`names text-maroon ${lang === 'ta' ? 'tamil text-[2.3rem] font-semibold' : 'text-[2.6rem] xs:text-5xl sm:text-6xl'}`}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={opening ? { opacity: 0, y: -14 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={opening ? { duration: 0.5 } : { duration: 1.4, delay: 1.25, ease: silk }}
            >
              {pick(wedding.groom.shortName)}
            </motion.span>
            <motion.span
              className="gold-foil anim-foil my-1 font-display text-4xl italic sm:text-5xl"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={opening ? { opacity: 0 } : { opacity: 1, scale: 1 }}
              transition={opening ? { duration: 0.4 } : { duration: 1.2, delay: 1.55, ease: silk }}
            >
              &amp;
            </motion.span>
            <motion.span
              className={`names text-maroon ${lang === 'ta' ? 'tamil text-[2.3rem] font-semibold' : 'text-[2.6rem] xs:text-5xl sm:text-6xl'}`}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={opening ? { opacity: 0, y: -14 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={opening ? { duration: 0.5 } : { duration: 1.4, delay: 1.7, ease: silk }}
            >
              {pick(wedding.bride.shortName)}
            </motion.span>
          </h1>

          <motion.p {...fadeIn(2.0)} className="mt-6 text-[0.68rem] font-medium uppercase tracking-[0.3em] text-gold-deep t-caps sm:text-xs">
            {t.opening.tagline}
          </motion.p>
          <motion.p {...fadeIn(2.1)} className="mt-2 font-serif text-sm italic text-ink/80">
            {pick(wedding.dateRangeLabel)}
          </motion.p>

          <motion.div {...fadeIn(2.3)} className="mt-7 sm:mt-9">
            <Button onClick={handleOpen} icon={<MailOpen className="relative h-4 w-4" strokeWidth={1.6} />} className="sm:px-8">
              {t.opening.button}
            </Button>
          </motion.div>
          <motion.p {...fadeIn(2.5)} className="mt-4 text-[0.7rem] tracking-wide text-muted">
            ♪ {t.opening.hint}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
