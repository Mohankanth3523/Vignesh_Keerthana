import { Bell } from '../ui/FloralDecoration';

/** A short hanging garland of bells between sections. */
export default function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-start justify-center gap-10 sm:gap-16 ${className}`} aria-hidden="true">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-xs bg-gradient-to-r from-transparent via-gold to-transparent sm:max-w-md" />
      {[0.4, 0, 0.8].map((d, i) => (
        <div key={i} className="anim-sway flex flex-col items-center" style={{ animationDelay: `${d}s` }}>
          <span className={`block w-px bg-gold/70 ${i === 1 ? 'h-10' : 'h-6'}`} />
          <Bell className={i === 1 ? 'h-9 w-6' : 'h-7 w-5'} />
        </div>
      ))}
    </div>
  );
}
