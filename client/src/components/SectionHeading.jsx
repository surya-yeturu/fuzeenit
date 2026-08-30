const SectionHeading = ({
  label,
  title,
  description,
  align = 'center',
  light = false,
  className = '',
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const textColor = light ? 'text-white' : 'text-primary';
  const descColor = light ? 'text-white/70' : 'text-secondary';

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {label && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-red">
          {label}
        </p>
      )}
      <h2 className={`text-3xl font-bold tracking-tight md:text-4xl ${textColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed md:text-lg ${descColor}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
