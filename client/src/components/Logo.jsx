import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Logo automatically switches between variants:
 * - logo.png        → light backgrounds (black text)
 * - logo-light.png  → dark backgrounds (white text)
 */
const Logo = ({ className = 'h-8', onDarkBackground = false }) => {
  const { isDark } = useTheme();
  const [imgError, setImgError] = useState(false);
  const useLightLogo = onDarkBackground || isDark;
  const src = useLightLogo ? '/logo-light.png' : '/logo.png';

  if (imgError) {
    return (
      <span
        className={`inline-flex flex-col leading-none ${useLightLogo ? 'text-white' : 'text-primary'} ${className}`}
      >
        <span className="text-lg font-bold tracking-tight">
          FUZEN <span className="text-brand-red">IT</span>
        </span>
        <span className={`text-[10px] font-medium uppercase tracking-widest ${useLightLogo ? 'text-white/80' : 'text-gray-brand dark:text-white/70'}`}>
          Solutions
        </span>
      </span>
    );
  }

  return (
    <img
      src={src}
      alt="FUZEN IT Solutions"
      className={`${className} w-auto object-contain object-left transition-opacity duration-200`}
      onError={() => setImgError(true)}
      draggable={false}
    />
  );
};

export default Logo;
