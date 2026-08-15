'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ClipboardCheck,
  Stethoscope,
  Droplets,
  Cookie,
  Clock,
  FileText,
  GlassWater,
  Sun,
  Moon,
  Utensils,
  ShieldCheck,
} from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: ClipboardCheck,
    title: 'Accueil & Inscription',
    duration: '5 min',
    desc: "On vous accueille et vous remplissez un questionnaire de santé. Pensez à apporter une pièce d'identité. L'équipe est là pour vous guider à chaque étape, rien n'est laissé au hasard.",
    tips: [
      "Munissez-vous d'une pièce d'identité avec photo",
      'Si vous avez votre carte de donneur, apportez-la',
    ],
  },
  {
    num: '02',
    icon: Stethoscope,
    title: 'Entretien médical',
    duration: '15 min',
    desc: "Un médecin vous pose des questions confidentielles sur votre santé, vos voyages et vos habitudes de vie. Cet échange est obligatoire et garanti confidentiel. C'est le médecin qui valide ou non votre aptitude.",
    tips: [
      'Soyez honnête, il n\'y a aucun jugement',
      'Listez vos traitements si besoin',
    ],
  },
  {
    num: '03',
    icon: Droplets,
    title: 'Le prélèvement',
    duration: '10 min',
    desc: 'Vous êtes installé confortablement. La piqûre est une petite pincette qui dure moins d\'une seconde. Le prélèvement de 450 ml dure environ 8 à 12 minutes. Le personnel est présent en permanence.',
    tips: [
      'Détendez-vous, la plupart des donneurs ne ressentent rien',
      'Prévenez immédiatement si vous vous sentez mal',
    ],
  },
  {
    num: '04',
    icon: Cookie,
    title: 'Collation & Repos',
    duration: '15 min',
    desc: 'Après le don, un repos de 15 minutes est obligatoire. Vous profiterez d\'une collation (boissons, jus de fruits, biscuits) pour reprendre des forces avant de quitter le centre.',
    tips: [
      'Ne sautez pas cette étape, elle est importante',
      'Restez assis quelques minutes même si vous vous sentez bien',
    ],
  },
];

const preparation = [
  {
    category: 'Avant le don',
    icon: Sun,
    items: [
      { icon: GlassWater, text: 'Buvez abondamment dans les heures précédant le don (eau, jus)' },
      { icon: Utensils, text: 'Mangez un repas léger mais suffisant avant de venir' },
      { icon: FileText, text: 'Apportez une pièce d\'identité avec photo' },
      { icon: Moon, text: 'Dormez suffisamment la nuit précédente' },
    ],
  },
  {
    category: 'Après le don',
    icon: Moon,
    items: [
      { icon: GlassWater, text: 'Continuez à bien vous hydrater dans les 24h' },
      { icon: ShieldCheck, text: 'Évitez les efforts physiques intenses pendant 24h' },
      { icon: Clock, text: 'Ne conduisez pas si vous ressentez le moindre malaise' },
      { icon: Utensils, text: 'Mangez normalement, pas de régime particulier requis' },
    ],
  },
];

export default function DonationProcess() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-crimson font-semibold text-sm tracking-wide uppercase mb-4"
          >
            Le don étape par étape
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4"
          >
            Environ <span className="text-gradient">45 minutes</span> tout compris
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-stone-600 text-lg leading-relaxed"
          >
            De l\'accueil au départ, voici exactement ce qui vous attend. Aucune surprise, chaque étape est pensée pour votre confort et votre sécurité.
          </motion.p>
        </div>

        {/* Steps timeline */}
        <div className="relative mb-20">
          {/* Vertical line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-crimson/20 via-crimson/10 to-transparent" aria-hidden="true" />

          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.05 }}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-12 items-center ${
                  i % 2 === 1 ? 'lg:direction-rtl' : ''
                }`}
              >
                <div className={`${i % 2 === 1 ? 'lg:order-2 lg:text-left' : 'lg:text-right'} mb-6 lg:mb-0`}>
                  <div className={`inline-flex items-center gap-3 mb-4 ${i % 2 === 1 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className="w-11 h-11 rounded-xl gradient-crimson text-white flex items-center justify-center shadow-md shadow-red-900/10">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-stone-700">ÉTAPE {step.num}</span>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-stone-900">{step.title}</h3>
                        <span className="text-xs bg-red-50 text-crimson font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-stone-600 text-[15px] leading-relaxed mb-4">{step.desc}</p>
                  <ul className="space-y-1.5">
                    {step.tips.map((tip) => (
                      <li key={tip} className="text-xs text-stone-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-crimson/40 mt-1.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Empty space for the other column */}
                <div className="hidden lg:block" />

                {/* Dot on the line */}
                <div className="hidden lg:flex absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-crimson border-4 border-cream z-10" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Preparation tips */}
        <div className="grid md:grid-cols-2 gap-6">
          {preparation.map((section, i) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-stone-100 p-6 sm:p-8 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-crimson flex items-center justify-center">
                  <section.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">{section.category}</h3>
              </div>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <item.icon className="w-4.5 h-4.5 text-stone-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-stone-700 leading-relaxed">{item.text}</span>
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