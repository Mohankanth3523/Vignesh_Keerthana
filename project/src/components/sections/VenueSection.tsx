import { useState } from 'react';
import { Check, Copy, MapPin, Navigation } from 'lucide-react';
import { wedding } from '../../config/wedding';
import { useLang } from '../../i18n/LanguageContext';
import { copyText } from '../../utils/sharing';
import { Button, LinkButton } from '../ui/Button';
import DecorativeFrame from '../ui/DecorativeFrame';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

export default function VenueSection() {
  const { t, lang, pick } = useLang();
  const [copied, setCopied] = useState(false);
  const { venue } = wedding;
  const isTa = lang === 'ta';

  const fullAddress = [venue.name.en, venue.subtitle.en, ...venue.addressLines.en].join(', ');

  const onCopy = async () => {
    const ok = await copyText(`${fullAddress}\n${venue.mapsUrl}`);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section id="venue" aria-labelledby="venue-title" className="section">
      <div className="container-wide">
        <SectionHeading id="venue-title" eyebrow={t.venue.eyebrow} title={t.venue.heading} />

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 sm:mt-16 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <DecorativeFrame as="article" className="h-full px-6 py-10 text-center sm:px-12 sm:py-14">
              <img src="assets/decorations/gopuram.webp" alt="" width={283} height={255} loading="lazy" className="mx-auto h-16 w-auto" />
              <h3 className={`mt-5 text-maroon ${isTa ? 'tamil text-3xl font-semibold' : 'display text-4xl sm:text-5xl'}`}>{pick(venue.name)}</h3>
              <p className={`mt-1 text-gold-deep ${isTa ? 'tamil text-lg' : 'font-display text-xl italic'}`}>{pick(venue.subtitle)}</p>
              <span className="mx-auto my-6 block h-px w-20 bg-gold/60" aria-hidden="true" />
              <address className={`not-italic leading-relaxed text-ink/85 ${isTa ? 'tamil leading-8' : 'text-[0.95rem]'}`}>
                {venue.addressLines[lang].map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              {!isTa && (
                <p className="tamil mt-4 text-sm leading-7 text-muted" lang="ta">
                  {venue.name.ta} {venue.subtitle.ta}, {venue.addressLines.ta[0]}
                </p>
              )}
              <div className="mx-auto mt-9 flex max-w-xs flex-col justify-center gap-3">
                <LinkButton
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<Navigation className="relative h-4 w-4" strokeWidth={1.6} />}
                >
                  {t.venue.open}
                </LinkButton>
                <Button
                  variant="outline"
                  onClick={onCopy}
                  aria-live="polite"
                  icon={copied ? <Check className="relative h-4 w-4" strokeWidth={1.8} /> : <Copy className="relative h-4 w-4" strokeWidth={1.6} />}
                >
                  {copied ? t.venue.copied : t.venue.copy}
                </Button>
              </div>
            </DecorativeFrame>
          </Reveal>

          <Reveal delay={0.15}>
            {venue.mapEmbedUrl ? (
              <div className="frame-gold h-full min-h-[22rem] overflow-hidden bg-cream p-2">
                <iframe
                  title={t.venue.mapTitle}
                  src={venue.mapEmbedUrl}
                  className="h-full min-h-[21rem] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            ) : (
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="frame-gold group relative flex h-full min-h-[22rem] flex-col items-center justify-center overflow-hidden bg-maroon-dark px-6 py-12 text-center text-cream"
              >
                {/* stylised map lines */}
                <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <g fill="none" stroke="#e3c98d" strokeWidth="1.2">
                    <path d="M-20 300 C 80 260, 120 200, 200 190 S 340 120, 430 60" strokeWidth="5" />
                    <path d="M-20 120 C 60 140, 140 160, 200 190 S 320 300, 420 330" strokeWidth="3" />
                    <path d="M60 -10 C 80 80, 120 140, 130 240 S 120 360, 140 420" />
                    <path d="M280 -10 C 270 80, 250 140, 260 220 S 300 360, 290 420" />
                    <path d="M-10 40 H 410 M -10 360 H 410" strokeDasharray="4 8" />
                  </g>
                </svg>
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-gold-soft/70 bg-maroon text-gold-soft transition-transform duration-500 group-hover:-translate-y-1">
                  <MapPin className="h-7 w-7" strokeWidth={1.4} />
                </span>
                <div className="relative mt-6 bg-cream p-3 shadow-xl">
                  <img src={venue.qrImage} alt={t.venue.scan} width={312} height={300} loading="lazy" className="h-32 w-32 [image-rendering:pixelated] sm:h-36 sm:w-36" />
                </div>
                <p className={`relative mt-4 text-gold-soft ${isTa ? 'tamil text-sm' : 'text-xs uppercase tracking-[0.28em]'}`}>{t.venue.scan}</p>
                <p className={`relative mt-2 text-cream/80 ${isTa ? 'tamil text-sm' : 'font-display text-lg italic'}`}>{pick(venue.shortAddress)}</p>
              </a>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
