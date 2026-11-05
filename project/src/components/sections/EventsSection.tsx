import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarPlus, ChevronDown, Clock, MapPin } from 'lucide-react';
import { wedding } from '../../config/wedding';
import { events, type EventCardData } from '../../data/events';
import { useLang } from '../../i18n/LanguageContext';
import { dateParts, downloadIcs, googleCalendarUrl } from '../../utils/calendar';
import { Button, LinkButton } from '../ui/Button';
import DecorativeFrame from '../ui/DecorativeFrame';
import { KalashIcon, LampIcon } from '../ui/FloralDecoration';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

/** Multi-cusped temple arch crowning each card. */
function TempleArch() {
  return (
    <svg viewBox="0 0 240 70" className="mx-auto h-auto w-56 sm:w-64" fill="none" aria-hidden="true" focusable="false">
      <g stroke="#c6a15b" strokeWidth="1.2" strokeLinecap="round">
        <path d="M6 68 V 52 C 6 46, 14 46, 18 42 C 22 30, 34 30, 40 36 C 46 22, 62 18, 72 26 C 80 10, 100 4, 120 4 C 140 4, 160 10, 168 26 C 178 18, 194 22, 200 36 C 206 30, 218 30, 222 42 C 226 46, 234 46, 234 52 V 68" />
        <path d="M18 68 V 56 C 18 52, 24 52, 28 48 C 32 40, 40 40, 46 44 C 52 34, 64 32, 74 38 C 82 24, 100 16, 120 16 C 140 16, 158 24, 166 38 C 176 32, 188 34, 194 44 C 200 40, 208 40, 212 48 C 216 52, 222 52, 222 56 V 68" opacity="0.5" />
      </g>
      <circle cx="120" cy="4" r="3" fill="#c6a15b" />
      <path d="M120 -6 L 124 2 L 116 2 Z" fill="#c6a15b" transform="translate(0 4)" />
    </svg>
  );
}

function CalendarMenu({ event }: { event: EventCardData }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('touchstart', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('touchstart', close);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative w-full xl:w-auto">
      <Button
        variant="primary"
        className="w-full xl:w-auto"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        icon={<CalendarPlus className="relative h-4 w-4" strokeWidth={1.6} />}
      >
        <span className="inline-flex items-center gap-1.5">
          {t.events.addToCalendar}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={1.6} />
        </span>
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            className="absolute bottom-full left-0 right-0 z-20 mb-2 overflow-hidden border border-gold/60 bg-cream shadow-[0_20px_40px_-20px_rgba(100,31,41,0.45)] sm:left-auto sm:min-w-60"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
          >
            <a
              role="menuitem"
              href={googleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block px-5 py-3.5 text-left text-sm text-ink hover:bg-gold-soft/30"
            >
              {t.events.google}
            </a>
            <button
              role="menuitem"
              type="button"
              onClick={() => {
                downloadIcs(event);
                setOpen(false);
              }}
              className="block w-full border-t border-gold/30 px-5 py-3.5 text-left text-sm text-ink hover:bg-gold-soft/30"
            >
              {t.events.ics}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EventCard({ event, delay }: { event: EventCardData; delay: number }) {
  const { t, lang, pick } = useLang();
  const isTa = lang === 'ta';
  const d = dateParts(event.start, lang);
  const Icon = event.icon === 'lamp' ? LampIcon : KalashIcon;

  return (
    <Reveal delay={delay} className="h-full">
      <DecorativeFrame as="article" className="flex h-full flex-col px-5 pb-8 pt-8 text-center transition-shadow duration-700 hover:shadow-[0_40px_70px_-35px_rgba(100,31,41,0.5)] sm:px-10 sm:pb-10" corner={56}>
        <div className="relative">
          <TempleArch />
          <div className="absolute inset-x-0 bottom-0 flex justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/70 bg-cream text-maroon">
              <Icon className="h-9 w-9" />
            </span>
          </div>
        </div>

        <p className={`mt-5 text-maroon ${isTa ? 'tamil text-2xl font-semibold' : 'eyebrow !text-maroon !text-sm !tracking-[0.4em]'}`}>{pick(event.title)}</p>
        {!isTa && <p className="tamil mt-1 text-sm text-gold-deep">{event.title.ta}</p>}

        <div className="mt-6 flex items-center justify-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/70" />
          <span className="font-serif text-[5.2rem] leading-none text-maroon sm:text-8xl">{d.day}</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/70" />
        </div>
        <p className={`mt-2 text-maroon ${isTa ? 'tamil text-lg' : 'font-serif text-lg uppercase tracking-[0.3em]'}`}>
          {d.month} {d.year}
        </p>
        <p className={`mt-1 text-muted ${isTa ? 'tamil text-sm' : 'text-xs uppercase tracking-[0.35em]'}`}>{pick(event.dayLabel)}</p>

        <p className="mt-6 inline-flex items-center justify-center gap-2 font-display text-2xl text-ink">
          <Clock className="h-4 w-4 text-gold-deep" strokeWidth={1.6} />
          <span className={isTa ? 'tamil text-lg' : ''}>{pick(event.timeLabel)}</span>
        </p>

        <div className="mt-5 text-sm leading-relaxed text-ink/80">
          <p className="eyebrow !text-[0.62rem]">{t.events.venue}</p>
          <p className={`mt-1.5 text-maroon ${isTa ? 'tamil text-base' : 'font-display text-xl'}`}>{pick(wedding.venue.name)}</p>
          <p className={isTa ? 'tamil' : ''}>{pick(wedding.venue.shortAddress)}</p>
        </div>

        {event.detail && (
          <details className="group/details mx-auto mt-5 max-w-sm text-left">
            <summary className="flex cursor-pointer list-none items-center justify-center gap-1.5 text-xs uppercase tracking-[0.2em] text-gold-deep t-caps [&::-webkit-details-marker]:hidden">
              {t.events.muhurtham}
              <ChevronDown className="h-3.5 w-3.5 transition-transform group-open/details:rotate-180" strokeWidth={1.6} />
            </summary>
            <p className="tamil mt-3 border-l-2 border-gold/50 pl-3 text-[0.82rem] leading-7 text-ink/80" lang="ta">
              {event.detail.ta}
            </p>
          </details>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-8 xl:flex-row xl:justify-center">
          <LinkButton
            variant="outline"
            href={wedding.venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full xl:w-auto"
            icon={<MapPin className="relative h-4 w-4" strokeWidth={1.6} />}
          >
            {t.events.viewLocation}
          </LinkButton>
          <CalendarMenu event={event} />
        </div>
      </DecorativeFrame>
    </Reveal>
  );
}

export default function EventsSection() {
  const { t } = useLang();
  return (
    <section id="events" aria-labelledby="events-title" className="section">
      <div className="container-wide">
        <SectionHeading id="events-title" eyebrow={t.events.eyebrow} title={t.events.heading} />
        <Reveal className="mt-8 flex justify-center" delay={0.1}>
          <img src="assets/decorations/nadaswaram.webp" alt="" width={449} height={283} loading="lazy" className="h-14 w-auto opacity-90" />
        </Reveal>
        <div className="mx-auto mt-10 grid max-w-5xl gap-8 md:grid-cols-2 md:gap-10">
          {events.map((e, i) => (
            <EventCard key={e.id} event={e} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
