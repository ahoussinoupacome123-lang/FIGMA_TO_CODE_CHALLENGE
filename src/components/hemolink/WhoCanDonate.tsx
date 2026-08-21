'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2, XCircle, Calendar, Scale, User, AlertCircle } from 'lucide-react';

const criteria = [
  {
    icon: User,
    title: 'Âge entre 18 et 65 ans',
    desc: 'Vous devez avoir au moins 18 ans révolus. La limite supérieure est fixée à 65 ans révolus. Au-delà de 65 ans, un avis médical spécialisé est nécessaire.',
    valid: true,
  },
  {
    icon: Scale,
    title: 'Poids minimum de 50 kg',
    desc: 'Ce seuil garantit que le prélèvement de 450 ml ne mettra pas votre santé en danger. Il n\'y a pas de poids maximum.',
    valid: true,
  },
  {
    icon: Calendar,
    title: 'Délai respecté entre les dons',
    desc: '3 mois minimum entre deux dons pour les hommes, 4 mois pour les femmes. Ces délais permettent à votre organisme de reconstituer ses réserves.',
    valid: true,
  },
  {
    icon: CheckCircle2,
    title: 'Se sentir en bonne santé',
    desc: 'Pas de fièvre, pas de traitement antibiotique en cours, pas de symptômes grippaux le jour du don. Un état de forme générale est indispensable.',
    valid: true,
  },
];

const temporaryDeferrals = [
  { condition: 'Tatouage ou piercing récent', delay: '4 mois' },
  { condition: 'Voyage dans une zone tropicale', delay: 'Variable selon la zone' },
  { condition: 'Grossesse ou accouchement', delay: '6 mois après l\'accouchement' },
  { condition: 'Intervention chirurgicale', delay: '4 mois' },
  { condition: 'Maladie infectieuse', delay: 'Après guérison complète' },
];

export default function WhoCanDonate() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="eligibilite" className="py-14 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-crimson font-semibold text-sm tracking-wide uppercase mb-4"
          >
            Qui peut donner
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4"
          >
            Les critères sont plus simples{' '}
            <span className="text-gradient">{`que ce qu'on imagine`}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-stone-600 text-lg leading-relaxed"
          >
            La plupart des adultes en bonne santé sont éligibles. Voici les
            conditions de base à remplir.
          </motion.p>
        </div>

        {/* Criteria grid */}
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {criteria.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4 p-5 sm:p-6 rounded-2xl border border-stone-100 hover:border-red-100 hover:shadow-sm transition-all bg-stone-50/50"
            >
              <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${
                c.valid ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-crimson'
              }`}>
                <c.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 mb-1">{c.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Temporary deferrals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-amber-700" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900">Report temporaire</h3>
              <p className="text-sm text-stone-700">Ces situations nécessitent d&apos;attendre avant de donner</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {temporaryDeferrals.map((d) => (
              <div
                key={d.condition}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-white/70 rounded-xl px-4 py-3 border border-amber-100"
              >
                <span className="text-sm text-stone-700">{d.condition}</span>
                <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
                  {d.delay}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-stone-700 mt-4">
            <XCircle className="w-3.5 h-3.5 inline mr-1" aria-hidden="true" />
            Seul un entretien médical professionnel peut confirmer votre aptitude au don.
            En cas de doute, présentez-vous au centre : le médecin tranchera.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
