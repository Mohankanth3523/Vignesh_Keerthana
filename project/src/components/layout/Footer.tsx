import { MessageCircle } from 'lucide-react';
import { wedding } from '../../config/wedding';
import { whatsappUrl } from '../../utils/sharing';
import { useLang } from '../../i18n/LanguageContext';
import { KolamPattern } from '../ui/FloralDecoration';
import OrnamentalDivider from '../ui/OrnamentalDivider';

export default function Footer() {
  const { t, lang, pick } = useLang();
  const names = lang === 'ta' ? `${wedding.groom.fullName.ta} & ${wedding.bride.fullName.ta}` : `${wedding.groom.fullName.en} & ${wedding.bride.fullName.en}`;
  return (
    <footer className="relative overflow-hidden bg-maroon-deep px-5 pb-28 pt-14 text-center text-cream/80 sm:pb-16">
      <KolamPattern className="pointer-events-none absolute inset-0" opacity={0.07} />
      <div className="absolute inset-x-0 top-0 h-1.5 bg-[repeating-linear-gradient(90deg,#c6a15b_0_14px,transparent_14px_20px)] opacity-80" aria-hidden="true" />
      <div className="absolute inset-x-0 top-3 h-px bg-gold/50" aria-hidden="true" />
      <div className="relative mx-auto max-w-xl">
        <p className={`text-gold-soft ${lang === 'ta' ? 'tamil text-3xl' : 'font-display text-4xl'}`}>{pick(wedding.monogram)}</p>
        <OrnamentalDivider tone="light" className="mt-5" />
        <p className={`mt-6 text-sm leading-relaxed ${lang === 'ta' ? 'tamil' : ''}`}>
          {t.closing.footer} <span className="text-gold-soft">{names}</span>
        </p>
        <p className="mt-1 text-xs text-cream/60">
          {pick(wedding.dateRangeShort)} · {pick(wedding.venue.name)}, {pick(wedding.venue.shortAddress)}
        </p>

        {wedding.credit.enabled && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="text-xs uppercase tracking-[0.3em] text-gold-soft/90 t-caps sm:text-sm">{pick(wedding.credit.label)}</p>
            <span className="rounded-sm bg-cream px-5 py-3">
              <img src={wedding.credit.logo} alt="" width={360} height={275} loading="lazy" className="h-16 w-auto" />
            </span>
            <p className="font-display text-2xl text-gold-soft sm:text-3xl">{wedding.credit.name}</p>
            <a
              href={whatsappUrl(wedding.credit.whatsappMessage, wedding.credit.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex min-h-12 items-center gap-2.5 rounded-full border border-gold-soft/70 px-6 py-2.5 text-base text-cream transition-colors hover:bg-gold-soft hover:text-maroon-dark"
              aria-label={`WhatsApp ${wedding.credit.name} at ${wedding.credit.whatsappLabel}`}
            >
              <MessageCircle className="h-5 w-5" strokeWidth={1.6} />
              <span className="tabular-nums tracking-wide">WhatsApp {wedding.credit.whatsappLabel}</span>
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}
