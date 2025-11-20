import * as React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md';
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none';
const variants: Record<string, string> = {
  default: 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20',
  outline: 'border border-white/60 text-white hover:border-blue-500 hover:text-blue-100',
};
const sizes: Record<string, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'md', ...props }, ref) => {
    const classes = [base, variants[variant], sizes[size], className].join(' ').trim();
    return <button ref={ref} className={classes} {...props} />;
  }
);

Button.displayName = 'Button';
