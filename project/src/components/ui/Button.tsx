import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost' | 'light';

const base =
  'group relative inline-flex min-h-12 items-center justify-center gap-2.5 overflow-hidden px-5 py-3 text-center text-[0.7rem] font-medium uppercase leading-snug tracking-[0.18em] sm:px-6 sm:tracking-[0.22em] t-caps transition-[transform,background-color,color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 sm:text-xs';

const variants: Record<Variant, string> = {
  primary:
    'btn-shimmer bg-maroon text-cream border border-gold/70 shadow-[inset_0_0_0_3px_#812c32,inset_0_0_0_4px_rgba(227,201,141,0.55),0_14px_30px_-14px_rgba(100,31,41,0.6)] hover:bg-maroon-dark',
  outline:
    'border border-gold text-maroon bg-cream/60 hover:bg-maroon hover:text-cream hover:border-maroon backdrop-blur-[2px]',
  ghost: 'text-maroon link-underline px-1 min-h-10',
  light: 'border border-gold-soft/70 text-gold-soft hover:bg-gold-soft hover:text-maroon-dark',
};

interface Common {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Button({ variant = 'primary', icon, children, className = '', type = 'button', ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {icon}
      <span className="relative">{children}</span>
    </button>
  );
}

export function LinkButton({ variant = 'primary', icon, children, className = '', ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {icon}
      <span className="relative">{children}</span>
    </a>
  );
}
