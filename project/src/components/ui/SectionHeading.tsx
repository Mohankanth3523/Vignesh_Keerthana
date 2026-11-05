import type { ReactNode } from 'react';
import OrnamentalDivider from './OrnamentalDivider';
import Reveal from './Reveal';

interface Props {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  tone?: 'dark' | 'light';
  className?: string;
}

export default function SectionHeading({ eyebrow, title, id, tone = 'dark', className = '' }: Props) {
  return (
    <Reveal className={`text-center ${className}`}>
      <p className={`eyebrow ${tone === 'light' ? '!text-gold-soft' : ''}`}>{eyebrow}</p>
      <h2 id={id} className={`heading mt-4 text-balance ${tone === 'light' ? '!text-cream' : ''}`}>
        {title}
      </h2>
      <OrnamentalDivider className="mt-6" tone={tone === 'light' ? 'light' : 'gold'} />
    </Reveal>
  );
}
