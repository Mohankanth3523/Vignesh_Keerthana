import { useState } from 'react';
import { motion } from 'framer-motion';
import { Expand } from 'lucide-react';
import { gallery } from '../../data/gallery';
import { useLang } from '../../i18n/LanguageContext';
import Lightbox from '../ui/Lightbox';
import SectionHeading from '../ui/SectionHeading';

export default function GallerySection() {
  const { t, pick } = useLang();
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section bg-cream/60">
      <div className="container-wide">
        <SectionHeading id="gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.heading} />

        <ul className="mt-14 columns-2 gap-3 xs:gap-4 sm:mt-16 md:columns-3 md:gap-6">
          {gallery.map((img, i) => {
            const arch = Boolean(img.arch);
            return (
              <motion.li
                key={img.id}
                className="mb-3 break-inside-avoid xs:mb-4 md:mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${t.gallery.open}: ${img.alt}`}
                  className={`group relative block w-full overflow-hidden border border-gold/50 bg-gold-soft/20 p-1.5 transition-shadow duration-500 hover:shadow-[0_25px_50px_-25px_rgba(100,31,41,0.55)] ${
                    arch ? 'rounded-t-full' : ''
                  }`}
                >
                  <span className={`relative block overflow-hidden ${arch ? 'rounded-t-full' : ''}`}>
                    <img
                      src={img.thumb}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      style={{ aspectRatio: `${img.width} / ${img.height}` }}
                    />
                    <span className="absolute inset-0 flex items-end bg-gradient-to-t from-maroon-deep/75 via-maroon-deep/0 to-transparent p-3 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="flex w-full items-center justify-between gap-2 font-display text-sm italic text-cream sm:text-base">
                        {pick(img.caption)}
                        <Expand className="h-4 w-4 shrink-0 text-gold-soft" strokeWidth={1.5} />
                      </span>
                    </span>
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>
      <Lightbox images={gallery} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </section>
  );
}
