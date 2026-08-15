'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Droplets } from 'lucide-react';

const navLinks = [
  { href: '#pourquoi', label: 'Pourquoi ?' },
  { href: '#eligibilite', label: 'Qui peut donner ?' },
  { href: '#test', label: "Test d'éligibilité" },
  { href: '#centres', label: 'Centres' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Intercept hash link clicks and handle sections inside the horizontal slider
  useEffect(() => {
    const handleHashNavigation = (id: string | null) => {
      if (!id) return;
      const clean = id.startsWith('#') ? id.slice(1) : id;
      const section = document.getElementById(clean);
      if (!section) return;

      const slider = document.querySelector('[role="list"][aria-label="Sections glissantes"]') as HTMLElement | null;
      if (slider && slider.contains(section)) {
        const kids = Array.from(slider.children) as HTMLElement[];
        let idx = kids.findIndex((k) => k.contains(section));
        if (idx === -1) idx = 0;
        const targetLeft = kids[idx].offsetLeft;
        slider.scrollTo({ left: targetLeft, behavior: 'smooth' });
        const details = Array.from(slider.querySelectorAll('details')) as HTMLDetailsElement[];
        if (details.length) details.forEach((d, i) => { d.open = i === idx; });

        // Poll until horizontal scroll finishes or the section is visible, then vertically center it
        const start = Date.now();
        const iv = setInterval(() => {
          try {
            const rect = section.getBoundingClientRect();
            const reached = Math.abs((slider.scrollLeft || 0) - targetLeft) < 6;
            const visible = rect.top >= 0 && rect.top < window.innerHeight;
            if (reached || visible || Date.now() - start > 1200) {
              clearInterval(iv);
              const headerH = document.querySelector('header')?.clientHeight || 80;
              const targetY = window.scrollY + rect.top - Math.min(headerH + 24, Math.round(window.innerHeight * 0.15));
              section.setAttribute('tabindex', '-1');
              window.scrollTo({ top: targetY, behavior: 'smooth' });
              (section as HTMLElement).focus();
            }
          } catch (e) {
            clearInterval(iv);
          }
        }, 50);
        setTimeout(() => clearInterval(iv), 1500);
      } else {
        // Regular section outside slider — vertical slide
        setTimeout(() => {
          try {
            const headerH = document.querySelector('header')?.clientHeight || 80;
            const rect = section.getBoundingClientRect();
            const targetY = window.scrollY + rect.top - Math.min(headerH + 24, Math.round(window.innerHeight * 0.12));
            section.setAttribute('tabindex', '-1');
            window.scrollTo({ top: targetY, behavior: 'smooth' });
            (section as HTMLElement).focus();
          } catch (e) {
            // ignore
          }
        }, 50);
      }
    };

    const clickHandler = (ev: MouseEvent) => {
      const anchor = (ev.target as HTMLElement)?.closest?.('a') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      // handle both '#id' and full-url with hash
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;
      const fragment = href.slice(hashIndex + 1);
      if (!fragment) return;
      ev.preventDefault();
      handleHashNavigation(fragment);
      // update the URL hash without default jump
      if (window.history && window.location.hash !== `#${fragment}`) {
        window.history.pushState(null, '', `#${fragment}`);
      }
    };

    const onHashChange = () => handleHashNavigation(window.location.hash);

    document.addEventListener('click', clickHandler);
    window.addEventListener('hashchange', onHashChange);
    // handle initial load with hash
    if (window.location.hash) handleHashNavigation(window.location.hash);

    return () => {
      document.removeEventListener('click', clickHandler);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-red-100/50'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navigation principale">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <a
              href="#"
              className={`flex items-center gap-2 font-bold text-lg transition-colors ${
                scrolled ? 'text-crimson' : 'text-white'
              }`}
            >
              <Droplets className="w-6 h-6 heartbeat" />
              <span>HemoLink</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-red-50 hover:text-crimson ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-crimson bg-red-50/80'
                      : scrolled
                      ? 'text-stone-600'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#test"
                className={`ml-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  scrolled
                    ? 'bg-crimson text-white hover:bg-crimson-dark shadow-sm'
                    : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                }`}
              >
                Donner maintenant
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-stone-700 hover:bg-stone-100' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
            <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl">
              <div className="pt-20 px-6 pb-8">
                <div className="flex items-center gap-2 mb-8">
                  <Droplets className="w-5 h-5 text-crimson" />
                  <span className="font-bold text-lg text-stone-900">HemoLink</span>
                </div>
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === link.href.replace('#', '')
                          ? 'bg-red-50 text-crimson'
                          : 'text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="#test"
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 block text-center px-4 py-3 rounded-full bg-crimson text-white text-sm font-semibold hover:bg-crimson-dark transition-colors"
                  >
                    Vérifier mon éligibilité
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
