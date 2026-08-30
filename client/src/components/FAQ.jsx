import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = ({ items, className = '' }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-100 bg-white overflow-hidden dark:border-white/10 dark:bg-surface-100"
        >
          <button
            onClick={() => toggle(index)}
            className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-light/50 dark:hover:bg-surface-200/50"
            aria-expanded={openIndex === index}
          >
            <span className="pr-4 text-sm font-medium text-primary md:text-base">
              {item.question}
            </span>
            <motion.svg
              className="h-5 w-5 flex-shrink-0 text-gray-brand"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="border-t border-gray-100 px-6 py-4 dark:border-white/10">
                  <p className="text-sm leading-relaxed text-gray-brand dark:text-white/60">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
