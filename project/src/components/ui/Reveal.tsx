import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Fraction of the element that must be visible before revealing. */
  amount?: number;
}

/** Fade-up on scroll. Framer's MotionConfig handles reduced-motion users. */
export default function Reveal({ children, className, delay = 0, y = 28, amount = 0.25 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
