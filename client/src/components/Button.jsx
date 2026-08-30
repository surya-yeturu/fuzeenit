const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Component = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed dark:focus-visible:ring-offset-surface-100';

  const variants = {
    primary:
      'bg-brand-red text-white hover:bg-brand-red-dark active:bg-brand-red-dark',
    secondary:
      'bg-surface text-white hover:bg-surface-200 active:bg-surface-200',
    outline:
      'border border-surface/20 text-primary hover:border-brand-red hover:text-brand-red bg-transparent dark:border-white/20 dark:text-white dark:hover:border-brand-red-light dark:hover:text-brand-red-light',
    'outline-light':
      'border border-white/30 text-white hover:border-white hover:bg-white/10 bg-transparent',
    ghost:
      'text-primary hover:text-brand-red bg-transparent dark:text-white/90 dark:hover:text-brand-red-light',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-sm rounded-lg',
    lg: 'px-8 py-3.5 text-base rounded-lg',
  };

  return (
    <Component
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
