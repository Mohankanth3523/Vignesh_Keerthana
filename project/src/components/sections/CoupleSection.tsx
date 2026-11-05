import { wedding, type Person } from '../../config/wedding';
import { useLang } from '../../i18n/LanguageContext';
import DecorativeFrame from '../ui/DecorativeFrame';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

function PersonCard({ person, delay }: { person: Person; delay: number }) {
  const { lang, pick } = useLang();
  const isTa = lang === 'ta';
  return (
    <Reveal delay={delay} className="w-full">
      <DecorativeFrame as="article" className="group px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8" corner={58}>
        <div className="mx-auto w-full max-w-[17rem] border border-gold/70 p-2" style={{ borderRadius: '999px 999px 6px 6px' }}>
          <div className="arch aspect-[3/4] overflow-hidden bg-gold-soft/30">
            <img
              src={person.portrait.srcSmall}
              srcSet={`${person.portrait.srcSmall} 540w, ${person.portrait.src} 1080w`}
              sizes="(min-width: 640px) 272px, 70vw"
              alt={person.portrait.alt}
              width={person.portrait.width}
              height={person.portrait.height}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
          </div>
        </div>

        <div className="mt-7 text-center">
          <p className="eyebrow">{pick(person.role)}</p>
          <h3 className={`mt-3 text-maroon ${isTa ? 'tamil text-3xl font-semibold' : 'display text-[2.6rem] sm:text-5xl'}`}>{pick(person.fullName)}</h3>
          <p className={`mt-1 text-gold-deep ${isTa ? 'font-display text-lg' : 'tamil text-lg'}`}>
            {isTa ? person.fullName.en : person.fullName.ta}
          </p>
          <p className="mt-2 font-serif text-sm italic tracking-wide text-ink/80">{person.qualification}</p>
          <span className="mx-auto my-5 block h-px w-16 bg-gold/60" aria-hidden="true" />
          <p className={`text-ink/85 ${isTa ? 'tamil text-[0.95rem] leading-7' : 'font-display text-lg italic leading-snug'}`}>{pick(person.parents)}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted">{pick(person.hometown)}</p>
        </div>
      </DecorativeFrame>
    </Reveal>
  );
}

export default function CoupleSection() {
  const { t } = useLang();
  return (
    <section id="couple" aria-labelledby="couple-title" className="section">
      <div className="container-wide">
        <SectionHeading id="couple-title" eyebrow={t.couple.eyebrow} title={t.couple.heading} />
        <div className="mx-auto mt-14 grid max-w-4xl items-center gap-10 sm:mt-16 md:grid-cols-[1fr_auto_1fr] md:gap-6">
          <PersonCard person={wedding.bride} delay={0} />
          <Reveal delay={0.2} className="flex justify-center" y={0}>
            <span className="gold-foil anim-foil font-display text-6xl italic md:text-7xl" aria-hidden="true">
              &amp;
            </span>
          </Reveal>
          <PersonCard person={wedding.groom} delay={0.15} />
        </div>
      </div>
    </section>
  );
}
