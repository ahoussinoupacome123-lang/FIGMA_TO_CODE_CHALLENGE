'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Users, Baby, Car, AlertTriangle } from 'lucide-react';

const stats = [
  { value: '10 000', unit: 'par jour', label: 'de patients ont besoin de sang', icon: AlertTriangle },
  { value: '1 million', unit: '', label: 'de dons sont nécessaires chaque année', icon: Users },
  { value: '3', unit: 'vies', label: 'peuvent être sauvées par un seul don', icon: Heart },
  { value: '42 %', unit: '', label: 'des Béninois sont éligibles mais ne donnent pas', icon: Baby },
];

const impacts = [
  {
    title: 'Accidents de la route',
    desc: "Un accidenté grave peut nécessiter jusqu'à 30 poches de sang lors de son prise en charge d'urgence. Chaque poche provient d'un donneur différent. Sans les réserves, les équipes chirurgicales ne peuvent pas opérer.",
    icon: Car,
  },
  {
    title: 'Pathologies chroniques',
    desc: "Les patients atteints de leucémie, de lymphome ou d'aplasie médullaire dépendent de transfusions régulières, parfois toutes les 2 à 3 semaines. Le don de sang est leur traitement, pas seulement une option.",
    icon: Heart,
  },
  {
    title: 'Accouchements et nouveau-nés',
    desc: "Les hémorragies obstétricales restent une cause majeure de complications pendant la grossesse et l'accouchement. Les nouveau-nés prématurés peuvent également nécessiter des transfusions de sang.",
    icon: Baby,
  },
];

function AnimatedCounter({ value, unit, icon: Icon, label }: (typeof stats)[0]) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <dl>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-crimson mb-3">
          <Icon className="w-6 h-6" />
        </div>
        <dt className="text-3xl sm:text-4xl font-bold text-stone-900">
          {value}
          {unit && <span className="text-base font-medium text-crimson ml-1">{unit}</span>}
        </dt>
        <dd className="text-sm text-stone-700 mt-1">{label}</dd>
      </dl>
    </motion.div>
  );
}

export default function WhyDonate() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="pourquoi" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={sectionRef} className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-crimson font-semibold text-sm tracking-wide uppercase mb-4"
          >
            Pourquoi donner
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4"
          >
            Votre sang a un pouvoir que{' '}
            <span className="text-gradient">rien ne peut remplacer</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-stone-600 text-lg leading-relaxed"
          >
            Le sang ne peut être ni fabriqué, ni synthétisé. Chaque goutte vient d'un donneur.
            Voici pourquoi votre geste compte concrètement.
          </motion.p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.value} {...stat} />
          ))}
        </div>

        {/* Impact cards - middle one featured */}
        <div className="grid md:grid-cols-3 gap-6">
          {impacts.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl p-6 sm:p-8 border transition-all interactive-scale ${
                i === 1
                  ? 'bg-crimson text-white border-crimson shadow-xl md:-translate-y-4'
                  : 'bg-white border-stone-100 hover:shadow-md'
              }`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5 ${
                i === 1 ? 'bg-white/20 text-white' : 'gradient-crimson text-white'
              }`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-bold mb-3 ${i === 1 ? 'text-white' : 'text-stone-900'}`}>{item.title}</h3>
              <p className={`leading-relaxed text-[15px] ${i === 1 ? 'text-white/80' : 'text-stone-600'}`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
