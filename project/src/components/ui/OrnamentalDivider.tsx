interface Props {
  className?: string;
  tone?: 'gold' | 'light';
}

/** Gold hairlines meeting at a lotus-and-diamond motif. */
export default function OrnamentalDivider({ className = '', tone = 'gold' }: Props) {
  const c = tone === 'gold' ? '#c6a15b' : '#e3c98d';
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-12 sm:w-20" style={{ background: `linear-gradient(90deg, transparent, ${c})` }} />
      <svg width="74" height="22" viewBox="0 0 74 22" fill="none" focusable="false">
        <g stroke={c} strokeWidth="1" strokeLinecap="round">
          <path d="M2 11 H 18" />
          <path d="M56 11 H 72" />
          <path d="M18 11 C 22 5, 28 5, 30 11 C 28 17, 22 17, 18 11 Z" />
          <path d="M56 11 C 52 5, 46 5, 44 11 C 46 17, 52 17, 56 11 Z" />
        </g>
        <path d="M37 2 L43 11 L37 20 L31 11 Z" fill={c} />
        <path d="M37 6 L40 11 L37 16 L34 11 Z" fill={tone === 'gold' ? '#fffdf7' : '#641f29'} />
        <circle cx="10" cy="11" r="1.3" fill={c} />
        <circle cx="64" cy="11" r="1.3" fill={c} />
      </svg>
      <span className="h-px w-12 sm:w-20" style={{ background: `linear-gradient(270deg, transparent, ${c})` }} />
    </div>
  );
}
