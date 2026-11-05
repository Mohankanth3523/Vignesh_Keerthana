import { motion } from 'framer-motion';
import { wedding } from '../../config/wedding';
import { useCountdown } from '../../hooks/useCountdown';
import { useLang } from '../../i18n/LanguageContext';
import CountdownCard from '../ui/CountdownCard';
import { KolamPattern, Thoranam } from '../ui/FloralDecoration';
import OrnamentalDivider from '../ui/OrnamentalDivider';
import Reveal from '../ui/Reveal';

export default function CountdownSection() {
  const { t, lang } = useLang();
  const c = useCountdown(wedding.countdownTarget);
  const isTa = lang === 'ta';

  return (
    <section id="countdown" aria-labelledby="countdown-title" className="relative overflow-hidden bg-maroon-dark pb-20 text-cream sm:pb-24">
      <KolamPattern className="pointer-events-none absolute inset-0" opacity={0.08} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(129,44,50,0.9),transparent_70%)]" aria-hidden="true" />
      <Thoranam className="relative" height={64} />

      <div className="relative mx-auto max-w-4xl px-5 pt-14 text-center sm:pt-16">
        <Reveal>
          <p id="countdown-title" className={`text-gold-soft ${isTa ? 'tamil text-base' : 'eyebrow !text-gold-soft'}`}>
            {c.isComplete ? t.countdown.doneNote : t.countdown.eyebrow}
          </p>
          <OrnamentalDivider tone="light" className="mt-5" />
        </Reveal>

        {c.isComplete ? (
          <motion.h2
            className={`mt-10 text-gold-soft ${isTa ? 'tamil text-3xl font-semibold' : 'names text-4xl sm:text-6xl'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            {t.countdown.done}
          </motion.h2>
        ) : (
          <Reveal delay={0.15}>
            <div className="mt-10 flex justify-center gap-2 xs:gap-3 sm:gap-6" role="timer" aria-live="off" aria-label={`${c.days} ${t.countdown.days}, ${c.hours} ${t.countdown.hours}, ${c.minutes} ${t.countdown.minutes}`}>
              <CountdownCard value={c.days} label={t.countdown.days} />
              <CountdownCard value={c.hours} label={t.countdown.hours} />
              <CountdownCard value={c.minutes} label={t.countdown.minutes} />
              <CountdownCard value={c.seconds} label={t.countdown.seconds} />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.3}>
          <p className={`mt-10 text-cream/80 ${isTa ? 'tamil text-sm' : 'font-display text-xl italic'}`}>{t.countdown.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
