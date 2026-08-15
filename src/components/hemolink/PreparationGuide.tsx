'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2, Droplets, Coffee, ShieldCheck, GlassWater, Moon, Sun, AlertCircle, Heart } from 'lucide-react';

const phases = [
  {
    id: 'avant',
    badge: 'AVANT',
    badgeColor: 'bg-red-50 text-crimson',
    icon: Sun,
    title: 'Bien se préparer',
    items: [
      { text: 'Dormez suffisamment la nuit précédente', icon: Moon },
      { text: 'Mangez un repas léger mais suffisant', icon: Coffee },
      { text: "Buvez beaucoup d'eau (au moins 1,5L)", icon: GlassWater },
      { text: "Apportez une pièce d'identité avec photo", icon: ShieldCheck },
    ],
  },
  {
    id: 'pendant',
    badge: 'PENDANT',
    badgeColor: 'bg-orange-50 text-coral',
    icon: Droplets,
    title: 'Pendant le don',
    items: [
      { text: 'Détendez-vous, la piqûre est rapide', icon: Heart },
      { text: 'Respirez calmement et régulièrement', icon: CheckCircle2 },
      { text: 'Signalez toute gêne immédiate', icon: AlertCircle },
      { text: 'Restez allongé tranquillement', icon: CheckCircle2 },
    ],
  },
  {
    id: 'apres',
    badge: 'APRÈS',
    badgeColor: 'bg-crimson text-white',
    icon: Coffee,
    title: 'Récupération',
    items: [
      { text: 'Prenez votre temps pour vous lever', icon: CheckCircle2 },
      { text: "Buvez beaucoup d'eau (1,5L dans les 24h)", icon: GlassWater },
      { text: 'Évitez les efforts physiques intenses 24h', icon: ShieldCheck },
      { text: 'Mangez normalement, pas de régime spécial', icon: Coffee },
    ],
  },
];

export default function PreparationGuide() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="preparation" className='py-20 sm:py-28 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div ref={ref} className='text-center max-w-2xl mx-auto mb-16'>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className='inline-block text-crimson font-semibold text-sm tracking-wide uppercase mb-4'
          >
            Bien vous préparer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className='text-3xl sm:text-4xl font-bold text-stone-900 mb-4'
          >
            Tout savoir{' '}
            <span className='text-gradient'>avant, pendant et après</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className='text-stone-600 text-lg leading-relaxed'
          >
            Un bon don commence par une bonne préparation. Voici les gestes essentiels
            pour que votre expérience se passe dans les meilleures conditions.
          </motion.p>
        </div>

        <div className='grid md:grid-cols-3 gap-6 lg:gap-8'>
          {phases.map((phase, i) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-3xl border ${
                phase.id === 'pendant'
                  ? 'bg-crimson text-white border-crimson shadow-xl'
                  : 'bg-white border-stone-100 hover:shadow-md'
              } transition-shadow interactive-scale`}
            >
              <span className={`px-3 py-1 text-xs font-bold rounded-full mb-6 inline-block ${
                phase.id === 'pendant' ? 'bg-white/20 text-white' : phase.badgeColor
              }`}>
                {phase.badge}
              </span>

              <div className={`flex items-center gap-3 mb-6 ${phase.id === 'pendant' ? 'text-white' : 'text-stone-900'}`}>
                <phase.icon className={`w-6 h-6 ${phase.id === 'pendant' ? 'text-orange-300' : 'text-crimson'}`} />
                <h3 className='text-xl font-bold'>{phase.title}</h3>
              </div>

              <ul className='space-y-4'>
                {phase.items.map((item) => (
                  <li key={item.text} className={`flex gap-3 ${phase.id === 'pendant' ? 'text-white/80' : 'text-stone-600'}`}>
                    <item.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      phase.id === 'pendant' ? 'text-coral' : 'text-crimson'
                    }`} />
                    <span className='text-[15px] leading-relaxed'>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
