import type { ReactNode } from 'react';
import { FloralCorner } from './FloralDecoration';

interface Props {
  children: ReactNode;
  className?: string;
  /** Size of the filigree corners in px. */
  corner?: number;
  as?: 'div' | 'article' | 'section';
}

/** Ivory card with a double gold hairline and filigree corners. */
export default function DecorativeFrame({ children, className = '', corner = 64, as: Tag = 'div' }: Props) {
  const pos = [
    'left-1.5 top-1.5',
    'right-1.5 top-1.5 rotate-90',
    'right-1.5 bottom-1.5 rotate-180',
    'left-1.5 bottom-1.5 -rotate-90',
  ];
  return (
    <Tag className={`frame-gold card-paper relative ${className}`}>
      {pos.map((p) => (
        <FloralCorner key={p} className={`pointer-events-none absolute ${p}`} style={{ width: corner, height: corner }} />
      ))}
      <div className="relative">{children}</div>
    </Tag>
  );
}
