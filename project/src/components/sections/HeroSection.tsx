import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { wedding } from '../../config/wedding';
import { useLang } from '../../i18n/LanguageContext';
import { FallingPetals, JasmineString, Medallion } from '../ui/FloralDecoration';
import OrnamentalDivider from '../ui/OrnamentalDivider';

const silk = [0.22, 1, 0.36, 1] as const;

export default function HeroSection({ revealed }: { revealed: boolean }) {
  const { t, lang, pick } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  const show = (delay: number, y = 26) => ({
    initial: { opacity: 0, y },
    animate: revealed ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration: 1.1, delay: delay + 0.6, ease: silk },
  });

  const isTa = lang === 'ta';

  return (
    <section ref={ref} id="top" aria-labelledby="hero-names" className="relative overflow-hidden pb-20 pt-20 sm:pb-28 sm:pt-24">
      {/* Background ornament */}
      <motion.div className="pointer-events-none absolute inset-0 flex items-start justify-center" style={{ y: bgY }} aria-hidden="true">
        <Medallion className="anim-spin-slow mt-10 w-[150vw] max-w-[900px] opacity-[0.22] sm:mt-0 lg:w-[70vw]" />
      </motion.div>
      <FallingPetals />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        {/* Mandapam photo */}
        <motion.div
          className="relative mx-auto w-full max-w-[19rem] xs:max-w-[21rem] sm:max-w-[24rem]"
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={revealed ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 30 }}
          transition={{ duration: 1.6, delay: 0.5, ease: silk }}
        >
          {/* pillars of the mandapam */}
          <div className="absolute -inset-x-5 bottom-0 top-[18%] flex justify-between" aria-hidden="true">
            {[0, 1].map((i) => (
              <div key={i} className="relative w-3 rounded-t-full bg-gradient-to-b from-gold-soft via-gold to-gold-deep shadow-[inset_-2px_0_3px_rgba(0,0,0,0.15)] sm:w-4">
                <span className="absolute -inset-x-1.5 top-0 h-2 rounded-full bg-gold-deep" />
                <span className="absolute -inset-x-1.5 bottom-0 h-3 bg-gold-deep" />
                <span className="absolute -inset-x-1 top-1/3 h-1.5 rounded-full bg-gold-deep/70" />
              </div>
            ))}
          </div>

          <div className="relative rounded-t-full border border-gold p-2.5 sm:p-3" style={{ borderRadius: '999px 999px 6px 6px' }}>
            <div className="absolute inset-[5px] border border-gold/45" style={{ borderRadius: '999px 999px 4px 4px' }} aria-hidden="true" />
            <div className="arch relative aspect-[2/3] overflow-hidden bg-gold-soft/30">
              <motion.img
                src={wedding.hero.srcSmall}
                srcSet={`${wedding.hero.srcSmall} 800w, ${wedding.hero.src} 1200w`}
                sizes="(min-width: 640px) 384px, 80vw"
                alt={wedding.hero.alt}
                width={wedding.hero.width}
                height={wedding.hero.height}
                fetchPriority="high"
                decoding="async"
                className="h-[108%] w-full object-cover object-[50%_20%]"
                style={{ y: photoY }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroon-deep/25 via-transparent to-transparent" />
            </div>
          </div>

          <div className="pointer-events-none absolute -left-9 top-[16%] sm:-left-12" aria-hidden="true">
            <JasmineString length={170} delay={0.5} />
          </div>
          <div className="pointer-events-none absolute -right-9 top-[16%] sm:-right-12" aria-hidden="true">
            <JasmineString length={170} delay={1.4} />
          </div>
        </motion.div>

        {/* Text */}
        <div className="relative text-center">
          <motion.p {...show(0.2)} className="eyebrow">
            {t.hero.eyebrow}
          </motion.p>
          <motion.div {...show(0.35)}>
            <OrnamentalDivider className="mt-5" />
          </motion.div>

          <h1 id="hero-names" className="mt-7 flex flex-col items-center gap-1">
            <motion.span
              {...show(0.5, 36)}
              className={`text-maroon ${isTa ? 'tamil text-[2.4rem] font-semibold leading-tight sm:text-5xl' : 'names whitespace-nowrap text-[2.3rem] xs:text-[2.7rem] sm:text-6xl lg:text-[3.4rem] xl:text-[4rem]'}`}
            >
              {pick(wedding.bride.fullName)}
            </motion.span>
            <motion.span {...show(0.7, 10)} className="gold-foil anim-foil font-display text-4xl italic sm:text-5xl">
              &amp;
            </motion.span>
            <motion.span
              {...show(0.85, 36)}
              className={`text-maroon ${isTa ? 'tamil text-[2.4rem] font-semibold leading-tight sm:text-5xl' : 'names whitespace-nowrap text-[2.3rem] xs:text-[2.7rem] sm:text-6xl lg:text-[3.4rem] xl:text-[4rem]'}`}
            >
              {pick(wedding.groom.fullName)}
            </motion.span>
          </h1>

          <motion.p {...show(1.05)} className={`mx-auto mt-8 max-w-sm text-ink/85 ${isTa ? 'text-base leading-8' : 'font-display text-xl italic leading-relaxed sm:text-2xl'}`}>
            {t.hero.line1}
            <br />
            {t.hero.line2}
          </motion.p>

          <motion.div {...show(1.25)} className="mt-9 inline-flex flex-col items-center">
            <span className="h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="py-3 font-serif text-xl tracking-[0.18em] text-maroon sm:text-2xl">
              {isTa ? pick(wedding.dateRangeLabel) : '15 & 16 NOVEMBER 2026'}
            </p>
            <span className="h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="mt-3 text-sm text-muted">
              {pick(wedding.venue.name)} · {pick(wedding.venue.shortAddress)}
            </p>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#couple"
        {...show(1.6, 0)}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.62rem] uppercase tracking-[0.3em] text-muted sm:flex"
      >
        {t.hero.scroll}
        <span className="relative h-8 w-px overflow-hidden bg-gold/30">
          <span className="anim-scroll-cue absolute left-0 top-0 h-3 w-px bg-maroon" />
        </span>
      </motion.a>
    </section>
  );
}
