import { Link } from 'react-router-dom';
import Logo from './Logo';
import { CONTACT_INFO } from '../utils/constants';

const Footer = () => {
  const quickLinks = [
    { label: 'Courses', path: '/courses' },
    { label: 'Career', path: '/career' },
    { label: 'Resources', path: '/resources' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms & Conditions', path: '/terms' },
  ];

  return (
    <footer className="bg-surface text-white">
      <div className="container-main section-padding pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" aria-label="FUZEN IT Home">
              <Logo className="h-10" onDarkBackground />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Professional technology education and career-focused training programs designed for real-world skills.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 transition-colors hover:text-brand-red-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-brand-red-light transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-brand-red-light transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-red-light transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              Legal
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 transition-colors hover:text-brand-red-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-4">
              {['linkedin', 'twitter', 'instagram', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/60 transition-colors hover:bg-brand-red hover:text-white"
                  aria-label={`FUZEN IT on ${social}`}
                >
                  <span className="text-xs font-medium uppercase">{social.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} FUZEN IT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
