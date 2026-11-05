import { useId, type CSSProperties } from 'react';

/**
 * Hand-drawn SVG ornaments inspired by South Indian wedding decor:
 * mango-leaf thoranam, jasmine strings, temple bells, kolam and gold filigree.
 * All vector, all tiny — no image downloads.
 */

/* ── Gold pearl-swag garland (luxury thoranam) ─────────────────────────── */
export function Thoranam({ className = '', height = 58 }: { className?: string; height?: number }) {
  const id = useId().replace(/:/g, '');
  const W = 88;
  return (
    <svg className={className} width="100%" height={height} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3e2b8" />
          <stop offset="0.45" stopColor="#c6a15b" />
          <stop offset="1" stopColor="#8e6c2e" />
        </linearGradient>
        <radialGradient id={`p${id}`} cx="0.35" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#f6eedb" />
          <stop offset="1" stopColor="#d9c79c" />
        </radialGradient>
        <pattern id={`t${id}`} width={W} height={height} patternUnits="userSpaceOnUse">
          {/* rope: double hairline */}
          <rect x="0" y="2" width={W} height="1.2" fill={`url(#g${id})`} />
          <rect x="0" y="5.5" width={W} height="0.6" fill="#c6a15b" opacity="0.6" />
          {/* main swag: gold thread with pearls */}
          <path d={`M0 7 Q ${W / 2} 34 ${W} 7`} fill="none" stroke="#a5813f" strokeWidth="0.8" />
          <path d={`M0 7 Q ${W / 2} 34 ${W} 7`} fill="none" stroke="#b08a45" strokeWidth="4.4" strokeLinecap="round" strokeDasharray="0 5.6" />
          <path d={`M0 7 Q ${W / 2} 34 ${W} 7`} fill="none" stroke={`url(#p${id})`} strokeWidth="3.2" strokeLinecap="round" strokeDasharray="0 5.6" />
          {/* inner swag */}
          <path d={`M10 7 Q ${W / 2} 24 ${W - 10} 7`} fill="none" stroke="#c6a15b" strokeWidth="0.7" opacity="0.7" />
          {/* centre pearl drop */}
          <line x1={W / 2} y1="20.5" x2={W / 2} y2="27" stroke="#a5813f" strokeWidth="0.6" />
          <circle cx={W / 2} cy="29" r="2.1" fill={`url(#p${id})`} stroke="#b08a45" strokeWidth="0.6" />
          {/* junction rosette + hanging gold drop */}
          {[0, W].map((x) => (
            <g key={x} transform={`translate(${x} 0)`}>
              <line x1="0" y1="10" x2="0" y2={height - 18} stroke="#a5813f" strokeWidth="0.7" />
              {[0, 1, 2].map((i) => (
                <circle key={i} cx="0" cy={16 + i * 6} r="1.6" fill={`url(#p${id})`} stroke="#b08a45" strokeWidth="0.6" />
              ))}
              <path d={`M0 ${height - 18} C 5 ${height - 12}, 5 ${height - 6}, 0 ${height - 3} C -5 ${height - 6}, -5 ${height - 12}, 0 ${height - 18} Z`} fill={`url(#g${id})`} />
              <circle cx="0" cy={height - 9} r="1.3" fill="#812c32" />
              {/* rosette */}
              {[0, 60, 120, 180, 240, 300].map((r) => (
                <ellipse key={r} cx="0" cy="-3.2" rx="1.8" ry="3" fill={`url(#g${id})`} transform={`translate(0 7) rotate(${r})`} />
              ))}
              <circle cx="0" cy="7" r="2.2" fill="#812c32" stroke="#e3c98d" strokeWidth="0.6" />
            </g>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height={height} fill={`url(#t${id})`} />
    </svg>
  );
}

/* ── Temple bell ────────────────────────────────────────────────────────── */
export function Bell({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={className} style={style} viewBox="0 0 40 60" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`bell${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#8e6c2e" />
          <stop offset="0.35" stopColor="#e9d095" />
          <stop offset="0.6" stopColor="#c6a15b" />
          <stop offset="1" stopColor="#7d5c22" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="5" r="4" fill="none" stroke="#a5813f" strokeWidth="2" />
      <path d="M20 9 C 11 12, 9 22, 9 34 C 9 41, 6 44, 4 47 L 36 47 C 34 44, 31 41, 31 34 C 31 22, 29 12, 20 9 Z" fill={`url(#bell${id})`} />
      <path d="M4 47 L36 47 L34 50 L6 50 Z" fill="#8e6c2e" />
      <path d="M12 26 C 16 24, 24 24, 28 26" stroke="#7d5c22" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="20" cy="54" r="4" fill={`url(#bell${id})`} />
    </svg>
  );
}

/* ── Hanging jasmine string with a bell ─────────────────────────────────── */
export function JasmineString({
  length = 220,
  className = '',
  bell = true,
  delay = 0,
}: {
  length?: number;
  className?: string;
  bell?: boolean;
  delay?: number;
}) {
  const id = useId().replace(/:/g, '');
  const flowers = Math.floor((length - 20) / 13);
  return (
    <div className={`anim-sway pointer-events-none ${className}`} style={{ animationDelay: `${delay}s` }} aria-hidden="true">
      <svg width="22" height={length + (bell ? 46 : 0)} viewBox={`0 0 22 ${length + (bell ? 46 : 0)}`} focusable="false">
        <defs>
          <radialGradient id={`jas${id}`}>
            <stop offset="0" stopColor="#fffef8" />
            <stop offset="1" stopColor="#efe6cf" />
          </radialGradient>
        </defs>
        <line x1="11" y1="0" x2="11" y2={length} stroke="#a5813f" strokeWidth="1" />
        {Array.from({ length: flowers }, (_, i) => {
          const y = 10 + i * 13;
          const accent = i % 6 === 5;
          return (
            <g key={i} transform={`translate(11 ${y}) rotate(${i * 37})`}>
              {accent ? (
                <>
                  <circle r="5.2" fill="#d4475b" />
                  <circle r="2.2" fill="#9e2335" />
                </>
              ) : (
                <>
                  {[0, 72, 144, 216, 288].map((a) => (
                    <ellipse key={a} cx="0" cy="-3.4" rx="2.3" ry="3.6" fill={`url(#jas${id})`} stroke="#e2d6b5" strokeWidth="0.4" transform={`rotate(${a})`} />
                  ))}
                  <circle r="1.3" fill="#e9cf7d" />
                </>
              )}
            </g>
          );
        })}
        {bell && (
          <g transform={`translate(1 ${length - 2}) scale(0.5)`}>
            <circle cx="20" cy="5" r="4" fill="none" stroke="#a5813f" strokeWidth="2" />
            <path d="M20 9 C 11 12, 9 22, 9 34 C 9 41, 6 44, 4 47 L 36 47 C 34 44, 31 41, 31 34 C 31 22, 29 12, 20 9 Z" fill="#c6a15b" />
            <path d="M14 14 C 12 22, 12 34, 11 44" stroke="#f3e2b8" strokeWidth="2.4" fill="none" opacity="0.7" />
            <path d="M4 47 L36 47 L34 50 L6 50 Z" fill="#8e6c2e" />
            <circle cx="20" cy="55" r="4" fill="#a5813f" />
          </g>
        )}
      </svg>
    </div>
  );
}

/* ── Gold filigree corner ───────────────────────────────────────────────── */
export function FloralCorner({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" aria-hidden="true" focusable="false">
      <g stroke="#c6a15b" strokeWidth="1.3" strokeLinecap="round">
        <path d="M6 114 V 22 C 6 13, 13 6, 22 6 H 114" />
        <path d="M14 114 V 30 C 14 21, 21 14, 30 14 H 114" opacity="0.55" />
        <path d="M22 6 C 34 18, 34 34, 22 40 C 14 44, 8 38, 12 32 C 16 26, 24 30, 22 36" />
        <path d="M6 22 C 18 34, 34 34, 40 22 C 44 14, 38 8, 32 12 C 26 16, 30 24, 36 22" />
        <path d="M40 40 C 54 40, 64 30, 64 18" opacity="0.8" />
        <path d="M40 40 C 40 54, 30 64, 18 64" opacity="0.8" />
        <path d="M64 18 C 70 12, 78 12, 84 16" opacity="0.6" />
        <path d="M18 64 C 12 70, 12 78, 16 84" opacity="0.6" />
      </g>
      <g fill="#c6a15b">
        <path d="M40 40 C 46 30, 56 30, 58 36 C 52 36, 46 38, 40 40 Z" opacity="0.9" />
        <path d="M40 40 C 30 46, 30 56, 36 58 C 36 52, 38 46, 40 40 Z" opacity="0.9" />
        <circle cx="40" cy="40" r="3.2" />
        <circle cx="88" cy="18" r="1.8" />
        <circle cx="18" cy="88" r="1.8" />
        <circle cx="98" cy="10" r="1.3" />
        <circle cx="10" cy="98" r="1.3" />
      </g>
    </svg>
  );
}

/* ── Kolam background pattern (dot grid with interlaced loops) ──────────── */
export function KolamPattern({ className = '', opacity = 0.12 }: { className?: string; opacity?: number }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={className} width="100%" height="100%" aria-hidden="true" focusable="false" style={{ opacity }}>
      <defs>
        <pattern id={`kolam${id}`} width="72" height="72" patternUnits="userSpaceOnUse">
          <g fill="#812c32">
            <circle cx="18" cy="18" r="1.6" />
            <circle cx="54" cy="18" r="1.6" />
            <circle cx="18" cy="54" r="1.6" />
            <circle cx="54" cy="54" r="1.6" />
            <circle cx="36" cy="36" r="1.6" />
          </g>
          <g fill="none" stroke="#a5813f" strokeWidth="1">
            <path d="M36 8 C 52 8, 64 20, 64 36 C 64 52, 52 64, 36 64 C 20 64, 8 52, 8 36 C 8 20, 20 8, 36 8 Z" />
            <path d="M36 22 L50 36 L36 50 L22 36 Z" />
            <path d="M0 0 C 10 10, 10 26, 0 36 M72 0 C 62 10, 62 26, 72 36 M0 72 C 10 62, 10 46, 0 36 M72 72 C 62 62, 62 46, 72 36" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#kolam${id})`} />
    </svg>
  );
}

/* ── Large rangoli medallion (for backgrounds) ──────────────────────────── */
export function Medallion({ className = '' }: { className?: string }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg className={className} viewBox="-100 -100 200 200" fill="none" aria-hidden="true" focusable="false">
      <g stroke="#c6a15b" strokeWidth="0.6">
        <circle r="96" />
        <circle r="90" strokeDasharray="1 3" />
        <circle r="58" />
        <circle r="22" />
        {petals.map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <path d="M0 -22 C 10 -36, 10 -48, 0 -58 C -10 -48, -10 -36, 0 -22 Z" />
            <path d="M0 -58 C 14 -70, 14 -82, 0 -90 C -14 -82, -14 -70, 0 -58 Z" />
            <circle cy="-94" r="1.4" fill="#c6a15b" />
          </g>
        ))}
        {petals.map((a) => (
          <path key={`s${a}`} transform={`rotate(${a + 11.25})`} d="M0 -26 C 5 -34, 5 -42, 0 -50 C -5 -42, -5 -34, 0 -26 Z" opacity="0.6" />
        ))}
      </g>
    </svg>
  );
}

/* ── Falling jasmine petals (CSS-only, few elements) ────────────────────── */
const PETALS = [
  { left: '6%', size: 12, dur: 16, delay: 0, drift: 60, spin: 280 },
  { left: '18%', size: 9, dur: 19, delay: 5, drift: -40, spin: -200 },
  { left: '31%', size: 11, dur: 15, delay: 9, drift: 50, spin: 320 },
  { left: '47%', size: 8, dur: 21, delay: 2, drift: -30, spin: 240 },
  { left: '62%', size: 12, dur: 17, delay: 7, drift: 40, spin: -300 },
  { left: '76%', size: 9, dur: 20, delay: 11, drift: -50, spin: 260 },
  { left: '89%', size: 11, dur: 18, delay: 4, drift: 30, spin: -240 },
];

export function FallingPetals({ count = 7, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {PETALS.slice(0, count).map((p, i) => (
        <svg
          key={i}
          className="petal"
          width={p.size}
          height={p.size * 1.4}
          viewBox="0 0 10 14"
          style={
            {
              left: p.left,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              '--drift': `${p.drift}px`,
              '--spin': `${p.spin}deg`,
            } as CSSProperties
          }
        >
          <path d="M5 0 C 9 3, 10 9, 5 14 C 0 9, 1 3, 5 0 Z" fill={i % 3 === 2 ? '#f1c27a' : '#fffaf0'} stroke="#e6d6b0" strokeWidth="0.5" />
        </svg>
      ))}
    </div>
  );
}

/* ── Event icons ────────────────────────────────────────────────────────── */
export function LampIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
      <path d="M32 6 C 36 12, 36 17, 32 20 C 28 17, 28 12, 32 6 Z" fill="#e8891c" />
      <path d="M32 10 C 34 13, 34 16, 32 18 C 30 16, 30 13, 32 10 Z" fill="#f9d36a" />
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 26 C 20 34, 44 34, 50 26" />
        <path d="M14 26 H 50" />
        <path d="M32 33 V 46" />
        <path d="M26 46 H 38 L 41 52 H 23 Z" />
        <path d="M18 56 H 46" />
        <path d="M20 26 C 20 22, 24 21, 26 23" opacity="0.6" />
        <path d="M44 26 C 44 22, 40 21, 38 23" opacity="0.6" />
      </g>
    </svg>
  );
}

export function KalashIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
      <g fill="#6f8f3e">
        <path d="M32 18 C 24 10, 16 10, 10 14 C 18 15, 24 17, 32 18 Z" />
        <path d="M32 18 C 40 10, 48 10, 54 14 C 46 15, 40 17, 32 18 Z" />
        <path d="M32 18 C 28 10, 26 6, 27 2 C 31 6, 32 11, 32 18 Z" opacity="0.85" />
        <path d="M32 18 C 36 10, 38 6, 37 2 C 33 6, 32 11, 32 18 Z" opacity="0.85" />
      </g>
      <circle cx="32" cy="15" r="5" fill="#a5813f" />
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 20 H 40" />
        <path d="M26 20 C 26 24, 24 25, 22 26" />
        <path d="M38 20 C 38 24, 40 25, 42 26" />
        <path d="M22 26 C 10 32, 12 52, 24 56 H 40 C 52 52, 54 32, 42 26 Z" />
        <path d="M17 38 H 47" opacity="0.6" />
        <path d="M22 60 H 42" />
      </g>
      <circle cx="32" cy="44" r="3" fill="#c6a15b" />
    </svg>
  );
}
