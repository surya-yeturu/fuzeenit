import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import Button from './Button';
import ThemeToggle from './ThemeToggle';
import { useScrollPosition } from '../hooks/useReducedMotion';
import { useExpertModal } from '../context/ExpertModalContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Courses', path: '/courses' },
  { label: 'Career', path: '/career' },
  { label: 'Resources', path: '/resources' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrollPosition();
  const location = useLocation();
  const { openModal } = useExpertModal();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 shadow-nav backdrop-blur-sm dark:bg-surface-100/95 dark:shadow-nav-dark'
          : 'bg-white dark:bg-surface-100'
      }`}
    >
      <nav className="container-main" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between md:h-18 lg:h-20">
          <Link to="/" className="flex-shrink-0" aria-label="FUZEN IT Home">
            <Logo className="h-10 md:h-11" />
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 link-hover ${
                  location.pathname === link.path ||
                  (link.path !== '/' && location.pathname.startsWith(link.path))
                    ? 'text-brand-red'
                    : 'text-primary/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => openModal()}>
              Talk to an Expert
            </Button>
            <Button as={Link} to="/courses" size="sm">
              Explore Courses
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg text-primary transition-colors hover:bg-gray-light dark:text-white dark:hover:bg-surface-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gray-100 bg-white dark:border-white/10 dark:bg-surface-100 lg:hidden"
          >
            <div className="container-main space-y-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    location.pathname === link.path ||
                    (link.path !== '/' && location.pathname.startsWith(link.path))
                      ? 'bg-brand-red/5 text-brand-red dark:bg-brand-red/10'
                      : 'text-primary hover:bg-gray-light dark:text-white dark:hover:bg-surface-200'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 space-y-2 border-t border-gray-100 pt-4 dark:border-white/10">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => { openModal(); setMobileOpen(false); }}
                >
                  Talk to an Expert
                </Button>
                <Button as={Link} to="/courses" className="w-full">
                  Explore Courses
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
