import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi';
import WaitlistModal from '@components/WaitlistModal';

type Props = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

type NavLink = {
  label: string;
  sectionId: string;
} & ({ isRoute: true; path: string } | { isRoute: false; hash: string });

const NAV_LINKS: NavLink[] = [
  {
    label: 'Services',
    sectionId: 'services',
    isRoute: false,
    hash: 'services',
  },
  { label: 'Fleet', sectionId: 'fleet', isRoute: true, path: '/fleet' },
  { label: 'FAQ', sectionId: 'faq', isRoute: false, hash: 'faq' },
  {
    label: 'Security Protocol',
    sectionId: 'security',
    isRoute: true,
    path: '/security-protocol',
  },
];

function TopNavBar(props: Props) {
  const { isDarkMode, onToggleTheme } = props;
  const [activeSection, setActiveSection] = useState<string>('');
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;

    const sectionIds = NAV_LINKS.map((l) => l.sectionId);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return function cleanup() {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [location.pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-borderColor/45 bg-darkSurface/85 backdrop-blur">
      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-6 md:px-8">
        <Link
          to="/"
          className="font-display text-xl font-bold tracking-tight text-primary"
        >
          SafeRides
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              (link.isRoute && location.pathname === link.path) ||
              activeSection === link.sectionId;

            const linkClass = `border-b-2 pb-0.5 transition-colors ${
              isActive
                ? 'border-primary text-onSurface'
                : 'border-transparent text-subdued hover:text-onSurface'
            }`;

            if (link.isRoute) {
              return (
                <Link key={link.sectionId} to={link.path} className={linkClass}>
                  {link.label}
                </Link>
              );
            }

            return (
              <a
                key={link.sectionId}
                href={`/#${link.hash}`}
                className={linkClass}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className="hidden h-10 w-10 items-center justify-center rounded-md border border-borderColor bg-card text-onSurface transition-colors hover:bg-primary/15 lg:inline-flex"
            aria-label={
              isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <button
            className="hidden rounded-sm bg-primary px-6 py-2 text-sm font-bold text-onPrimary lg:block"
            onClick={() => setIsWaitlistOpen(true)}
          >
            Join Waitlist
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center text-onSurface lg:hidden"
            aria-label="Open navigation menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-darkSurface lg:hidden">
          <div className="flex h-[70px] shrink-0 items-center justify-between border-b border-borderColor/45 px-5">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="font-display text-xl font-bold tracking-tight text-primary"
            >
              SafeRides
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-onSurface"
              aria-label="Close navigation menu"
            >
              <FiX size={20} />
            </button>
          </div>
          <nav className="flex flex-col px-5 pt-2 bg-darkSurface">
            {NAV_LINKS.map((link, index) => {
              const isActive =
                (link.isRoute && location.pathname === link.path) ||
                activeSection === link.sectionId;
              const itemClass = `block py-5 text-[17px] font-medium ${
                isActive ? 'text-primary' : 'text-onSurface'
              }`;
              return (
                <div key={link.sectionId}>
                  {link.isRoute ? (
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={itemClass}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={`/#${link.hash}`}
                      onClick={() => setIsMenuOpen(false)}
                      className={itemClass}
                    >
                      {link.label}
                    </a>
                  )}
                  {index < NAV_LINKS.length - 1 && (
                    <div className="h-px w-full bg-borderColor/45" />
                  )}
                </div>
              );
            })}
            <div className="h-px w-full bg-borderColor/45" />
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                setIsWaitlistOpen(true);
              }}
              className="block w-full py-5 text-left text-[17px] font-medium text-onSurface"
            >
              Join Waitlist
            </button>
            <div className="h-px w-full bg-borderColor/45" />
            <button
              type="button"
              onClick={onToggleTheme}
              className="flex w-full items-center gap-3 py-5 text-[17px] font-medium text-onSurface"
            >
              {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </nav>
        </div>
      )}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </header>
  );
}

export default TopNavBar;
