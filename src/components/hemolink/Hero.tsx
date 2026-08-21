'use client';

import { motion } from 'framer-motion';
import { Droplets, ShieldCheck, UserMinus, RefreshCw } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen sm:min-h-screen flex items-center overflow-hidden pt-16 sm:pt-0">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Decorative background circles */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 float-animation" />
        <div className="absolute top-1/3 -left-32 w-72 h-72 rounded-full bg-white/5 blood-drop-path" />
        <svg className="absolute top-24 right-16 w-8 h-8 text-white/10 float-animation" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C12 2 5 10 5 15a7 7 0 0014 0c0-5-7-13-7-13z" />
        </svg>
        <svg className="absolute bottom-32 left-20 w-6 h-6 text-white/10 blood-drop-path" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C12 2 5 10 5 15a7 7 0 0014 0c0-5-7-13-7-13z" />
        </svg>
      </div>

      {/* Content - 2 column layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-white/90 text-sm font-medium">Besoin urgent au CNTS de Cotonou</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Chaque{' '}
              <span className="text-orange-300">Goutte</span>
              {' '}Compte.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/90 mb-10 max-w-xl leading-relaxed"
            >
              Le sang est un cadeau précieux. Au Bénin, des milliers de vies dépendent de la solidarité.
              Ensemble, assurons l'avenir de nos familles.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#test"
                className="group inline-flex items-center justify-center gap-2 bg-coral hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-xl active:scale-[0.98]"
              >
                Vérifier mon éligibilité
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#centres"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 rounded-xl text-lg font-bold backdrop-blur-sm transition-all"
              >
                Trouver un centre
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-4 sm:gap-6 list-none p-0 m-0"
            >
              {[
                { icon: ShieldCheck, label: 'Informations certifiées' },
                { icon: UserMinus, label: 'Sans inscription' },
                { icon: RefreshCw, label: 'Mis à jour en temps réel' },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-white/70 text-sm">
                  <Icon className="w-4 h-4 text-orange-300" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: Animated blood drop — desktop full, mobile compact */}
          <div className="flex justify-center relative">
            <div className="relative lg:block hidden">
              {/* Pulsing glow behind the drop */}
              <motion.div
                className="absolute -inset-16 bg-orange-400/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Second glow layer */}
              <motion.div
                className="absolute -inset-8 bg-red-400/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />
              {/* The blood drop icon with heartbeat */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 100 }}
              >
                <Droplets
                  className="text-[280px] text-white/90 heartbeat"
                  strokeWidth={0.5}
                  aria-hidden="true"
                  style={{ filter: 'drop-shadow(0 0 40px rgba(249, 115, 22, 0.3))' }}
                />
              </motion.div>
              {/* Small orbiting drops */}
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Droplets className="w-8 h-8 text-white/40" strokeWidth={1.5} aria-hidden="true" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-6"
                animate={{ y: [0, 6, 0], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <Droplets className="w-6 h-6 text-white/30" strokeWidth={1.5} aria-hidden="true" />
              </motion.div>
            </div>
            {/* Mobile compact illustration */}
            <motion.div
              className="lg:hidden relative flex items-center justify-center my-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute w-24 h-24 bg-orange-400/15 rounded-full blur-2xl" aria-hidden="true" />
              <div className="absolute w-16 h-16 bg-red-400/10 rounded-full blur-xl" aria-hidden="true" />
              <Droplets
                className="text-[80px] text-white/80 heartbeat relative z-10"
                strokeWidth={0.5}
                aria-hidden="true"
                style={{ filter: 'drop-shadow(0 0 20px rgba(249, 115, 22, 0.25))' }}
              />
            </motion.div>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          <dl className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-stone-900 text-center border border-red-50">
            <div>
              <dt className="text-xl sm:text-2xl md:text-3xl font-extrabold text-crimson mb-1">1 Don</dt>
                <dd className="text-stone-700 text-xs sm:text-sm">= 3 vies sauvées</dd>
            </div>
            <div>
              <dt className="text-xl sm:text-2xl md:text-3xl font-extrabold text-crimson mb-1">450ml</dt>
              <dd className="text-stone-700 text-xs sm:text-sm">Volume d'un don</dd>
            </div>
            <div className="md:border-l md:border-stone-100 md:pl-4">
              <dt className="text-xl sm:text-2xl md:text-3xl font-extrabold text-crimson mb-1">24/7</dt>
              <dd className="text-stone-700 text-xs sm:text-sm">Disponibilité centres</dd>
            </div>
            <div className="md:border-l md:border-stone-100 md:pl-4">
              <dt className="text-xl sm:text-2xl md:text-3xl font-extrabold text-crimson mb-1">15 Min</dt>
              <dd className="text-stone-700 text-xs sm:text-sm">Temps moyen du don</dd>
            </div>
          </dl>
        </motion.div>
      </div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-cream" aria-hidden="true" />
    </section>
  );
}
