import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { wedding } from '../../config/wedding';
import { useLang } from '../../i18n/LanguageContext';
import { KolamPattern, Medallion } from '../ui/FloralDecoration';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

export default function StorySection() {
  const { t, lang, pick } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 25]);
  const { kural } = wedding.story;
  const isTa = lang === 'ta';

  return (
    <section ref={ref} id="story" aria-labelledby="story-title" className="section overflow-hidden bg-cream/60">
      <KolamPattern className="pointer-events-none absolute inset-0" opacity={0.07} />
      <motion.div className="pointer-events-none absolute -right-40 -top-24 w-[28rem] opacity-25 sm:-right-24" style={{ rotate }} aria-hidden="true">
        <Medallion />
      </motion.div>
      <motion.div className="pointer-events-none absolute -bottom-32 -left-40 w-[26rem] opacity-20" style={{ rotate }} aria-hidden="true">
        <Medallion />
      </motion.div>

      <div className="container-narrow relative text-center">
        <SectionHeading id="story-title" eyebrow={t.story.eyebrow} title={t.story.heading} />

        <Reveal delay={0.1}>
          <p className={`mx-auto mt-10 max-w-2xl text-pretty text-ink/90 ${isTa ? 'tamil text-lg leading-9' : 'font-display text-[1.45rem] leading-[1.6] sm:text-[1.75rem]'}`}>
            <span className="float-left mr-2 mt-1 hidden font-display text-6xl leading-[0.8] text-gold sm:inline" aria-hidden="true">
              “
            </span>
            {t.story.message}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14 flex justify-center">
          <img src="assets/decorations/kalash.webp" alt="" width={196} height={206} loading="lazy" className="h-16 w-auto" />
        </Reveal>

        <Reveal delay={0.2}>
          <figure className="mx-auto mt-6 max-w-xl border-y border-gold/40 py-8">
            <blockquote className="tamil text-lg font-semibold leading-9 text-maroon sm:text-xl sm:leading-10" lang="ta">
              {kural.ta.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </blockquote>
            <p className="mt-4 font-display text-lg italic leading-snug text-ink/75" lang="en">
              {kural.en.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
            <figcaption className="mt-4 text-[0.68rem] uppercase tracking-[0.25em] text-gold-deep t-caps">{pick(kural.source)}</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
