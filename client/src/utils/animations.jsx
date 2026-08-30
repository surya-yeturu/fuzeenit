import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const fadeInUp = (delay = 0) => {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] },
  };
};

export const FadeIn = ({ children, delay = 0, className = '' }) => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const PageTransition = ({ children }) => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
