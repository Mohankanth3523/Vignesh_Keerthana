import { useState } from 'react';
import { ArrowUp, Check, Link2, Music, Share2 } from 'lucide-react';
import { wedding } from '../../config/wedding';
import { useMusic } from '../../hooks/useMusic';
import { useLang } from '../../i18n/LanguageContext';
import { copyText, getSiteUrl, shareInvitation } from '../../utils/sharing';
import { Button } from '../ui/Button';
import { FallingPetals, JasmineString, Thoranam } from '../ui/FloralDecoration';
import OrnamentalDivider from '../ui/OrnamentalDivider';
import Reveal from '../ui/Reveal';

export default function ClosingSection() {
  const { t, lang, pick } = useLang();
  const { isPlaying, toggle } = useMusic();
  const [copied, setCopied] = useState(false);
  const isTa = lang === 'ta';

  const onCopy = async () => {
    if (await copyText(getSiteUrl())) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section id="closing" aria-labelledby="closing-title" className="relative overflow-hidden pb-24 pt-0">
      <Thoranam height={64} />
      <FallingPetals count={5} />
      <div className="relative mx-auto max-w-3xl px-5 pt-16 text-center sm:pt-20">
        <Reveal>
          <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-[19rem]">
            <div className="border border-gold p-2" style={{ borderRadius: '999px 999px 6px 6px' }}>
              <div className="arch aspect-[2/3] overflow-hidden bg-gold-soft/30">
                <img
                  src={wedding.closing.srcSmall}
                  srcSet={`${wedding.closing.srcSmall} 720w, ${wedding.closing.src} 1400w`}
                  sizes="(min-width: 640px) 304px, 70vw"
                  alt={wedding.closing.alt}
                  width={wedding.closing.width}
                  height={wedding.closing.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[50%_25%]"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute -left-8 top-6" aria-hidden="true">
              <JasmineString length={140} delay={0.2} />
            </div>
            <div className="pointer-events-none absolute -right-8 top-6" aria-hidden="true">
              <JasmineString length={140} delay={0.9} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className={`mx-auto mt-12 max-w-xl text-pretty text-ink/90 ${isTa ? 'tamil text-lg leading-9' : 'font-display text-2xl italic leading-relaxed sm:text-[1.9rem]'}`}>{t.closing.message}</p>
          <OrnamentalDivider className="mt-8" />
          <p className="eyebrow mt-8">{t.closing.gratitude}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 id="closing-title" className="mt-6 flex flex-col items-center gap-1">
            <span className={`text-maroon ${isTa ? 'tamil text-3xl font-semibold' : 'names text-[2.2rem] xs:text-[2.5rem] sm:text-5xl'}`}>{pick(wedding.bride.fullName)}</span>
            <span className="gold-foil anim-foil font-display text-3xl italic">&amp;</span>
            <span className={`text-maroon ${isTa ? 'tamil text-3xl font-semibold' : 'names text-[2.2rem] xs:text-[2.5rem] sm:text-5xl'}`}>{pick(wedding.groom.fullName)}</span>
          </h2>
          <p className="mt-6 font-serif text-lg tracking-[0.2em] text-gold-deep">{isTa ? pick(wedding.dateRangeShort) : '15–16 NOVEMBER 2026'}</p>
        </Reveal>

        <Reveal delay={0.2} className="mx-auto mt-12 grid max-w-md grid-cols-2 gap-3">
          <Button onClick={() => void shareInvitation(lang)} icon={<Share2 className="relative h-4 w-4" strokeWidth={1.6} />} className="col-span-2">
            {t.closing.share}
          </Button>
          <Button variant="outline" onClick={onCopy} aria-live="polite" className="!px-3" icon={copied ? <Check className="relative h-4 w-4" strokeWidth={1.8} /> : <Link2 className="relative h-4 w-4" strokeWidth={1.6} />}>
            {copied ? t.closing.copied : t.closing.copyLink}
          </Button>
          <Button variant="outline" onClick={toggle} aria-pressed={isPlaying} className="!px-3" icon={<Music className="relative h-4 w-4" strokeWidth={1.6} />}>
            {isPlaying ? t.closing.musicOn : t.closing.musicOff}
          </Button>
          <Button
            variant="ghost"
            onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
            className="col-span-2"
            icon={<ArrowUp className="relative h-4 w-4" strokeWidth={1.6} />}
          >
            {t.closing.top}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
