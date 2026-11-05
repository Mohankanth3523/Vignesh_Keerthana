import { wedding } from '../../config/wedding';
import { useMusic } from '../../hooks/useMusic';
import { useLang } from '../../i18n/LanguageContext';
import { FloralCorner } from '../ui/FloralDecoration';
import OrnamentalDivider from '../ui/OrnamentalDivider';
import Reveal from '../ui/Reveal';
import VideoPlayer from '../ui/VideoPlayer';

export default function VideoSection() {
  const { t, lang } = useLang();
  const { pauseForMedia } = useMusic();
  const isTa = lang === 'ta';

  return (
    <section id="film" aria-labelledby="film-title" className="section overflow-hidden">
      <div className="container-wide grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
        <Reveal className="text-center lg:text-left">
          <p className="eyebrow">{t.video.eyebrow}</p>
          <h2 id="film-title" className="heading mt-4 text-balance">
            {isTa ? t.video.heading : (
              <>
                A Little Glimpse
                <br className="hidden sm:block" /> of Our Celebration
              </>
            )}
          </h2>
          <OrnamentalDivider className="mt-6 lg:justify-start" />
          <p className={`mx-auto mt-6 max-w-md text-ink/80 lg:mx-0 ${isTa ? 'tamil leading-8' : 'font-display text-xl italic leading-relaxed'}`}>{t.video.text}</p>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto">
          <div className="relative p-3 sm:p-4" style={{ width: 'min(100%, 380px, calc(78svh * 9 / 16 + 2rem))' }}>
            <div className="absolute inset-0 border border-gold/80" aria-hidden="true" />
            <div className="absolute inset-[6px] border border-gold/40" aria-hidden="true" />
            {[
              'left-0 top-0',
              'right-0 top-0 rotate-90',
              'right-0 bottom-0 rotate-180',
              'left-0 bottom-0 -rotate-90',
            ].map((p) => (
              <FloralCorner key={p} className={`pointer-events-none absolute z-10 h-14 w-14 ${p}`} />
            ))}
            <div className="relative shadow-[0_40px_80px_-40px_rgba(74,22,30,0.8)]">
              <VideoPlayer
                src={wedding.video.src}
                poster={wedding.video.poster}
                width={wedding.video.width}
                height={wedding.video.height}
                title={t.video.heading}
                onPlay={pauseForMedia}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
