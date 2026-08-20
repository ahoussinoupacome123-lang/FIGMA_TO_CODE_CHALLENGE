'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Droplets } from 'lucide-react';

export default function ScrollEnhancements() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFab, setShowFab] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setScrollProgress(progress);
      setShowFab(scrollTop > window.innerHeight * 1.5);
      setShowBackToTop(scrollTop > window.innerHeight * 3);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent pointer-events-none" aria-hidden="true">
        <motion.div
          className="h-full bg-gradient-to-r from-crimson via-coral to-crimson origin-left"
          style={{ scaleX: scrollProgress }}
        />
      </div>

      {/* Sticky FAB — mobile only */}
      <AnimatePresence>
        {showFab && (
          <motion.a
            href="#test"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 gradient-crimson text-white font-bold px-6 py-3.5 rounded-full shadow-2xl shadow-crimson/30 flex items-center gap-2 active:scale-95 transition-transform"
          >
            <Droplets className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm">Vérifier mon éligibilité</span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* Back to top — all screens */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-stone-800 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-stone-700 active:scale-90 transition-all"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
