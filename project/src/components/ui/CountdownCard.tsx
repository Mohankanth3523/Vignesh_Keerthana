import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  value: number;
  label: string;
  pad?: number;
}

/** Gold-bordered number block with a soft vertical roll on change. */
export default function CountdownCard({ value, label, pad = 2 }: Props) {
  const text = String(value).padStart(pad, '0');
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-[5.2rem] w-[4.4rem] items-center justify-center border border-gold/70 bg-maroon-deep/40 shadow-[inset_0_0_0_4px_rgba(74,22,30,0.9),inset_0_0_0_5px_rgba(227,201,141,0.35)] xs:h-24 xs:w-[5rem] sm:h-32 sm:w-28">
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gold" aria-hidden="true" />
        <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 bg-gold" aria-hidden="true" />
        <div className="relative h-[1.15em] w-full overflow-hidden text-center font-serif text-[2.1rem] leading-none text-gold-soft tabular-nums xs:text-[2.4rem] sm:text-6xl">
          <AnimatePresence initial={false}>
            <motion.span
              key={text}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ y: '-70%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '70%', opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {text}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <span className="eyebrow mt-3 !text-gold-soft/90">{label}</span>
    </div>
  );
}
