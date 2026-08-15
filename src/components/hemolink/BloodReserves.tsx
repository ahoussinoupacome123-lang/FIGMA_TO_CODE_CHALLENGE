'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { AlertTriangle, Droplets } from 'lucide-react';
import { bloodReserves, getLevelColor, getLevelLabel, getLevelDescription } from '@/data/blood-reserves';

export default function BloodReserves() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const criticalCount = bloodReserves.filter((b) => b.level === 'critique').length;

  return (
    <section className='py-20 sm:py-28 bg-cream'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div ref={ref} className='text-center max-w-2xl mx-auto mb-12'>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className='inline-block text-crimson font-semibold text-sm tracking-wide uppercase mb-4'
          >
            État des réserves
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className='text-3xl sm:text-4xl font-bold text-stone-900 mb-4'
          >
            État des réserves au{' '}
            <span className='text-gradient'>Bénin</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className='text-stone-600 text-lg leading-relaxed'
          >
            Mise à jour en temps réel. Donnez selon les besoins prioritaires.
          </motion.p>
        </div>

        {/* Alert banner if critical */}
        {criticalCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className='bg-red-50 border border-red-200/60 rounded-2xl p-4 sm:p-5 mb-10 flex items-start gap-4'
          >
            <AlertTriangle className='w-5 h-5 text-crimson flex-shrink-0 mt-0.5' />
            <div>
              <p className='text-sm font-semibold text-red-800'>
                {criticalCount} groupe{criticalCount > 1 ? 's sanguin' : ' sanguin'} en niveau critique
              </p>
              <p className='text-sm text-red-700/80 mt-0.5'>
                Les réserves sont inférieures à 3 jours. Si vous êtes du groupe concerné, votre don est urgent.
              </p>
            </div>
          </motion.div>
        )}

        {/* Blood type vertical bar cards */}
        <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4'>
          {bloodReserves.map((blood, i) => (
            <BloodBarCard key={blood.group} blood={blood} index={i} />
          ))}
        </div>

        {/* Legend */}
        <div className='flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10'>
          {(['critique', 'faible', 'suffisant', 'optimal'] as const).map((level) => (
            <div key={level} className='flex items-center gap-2'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: getLevelColor(level) }}
              />
              <span className='text-xs text-stone-700'>{getLevelLabel(level)}</span>
            </div>
          ))}
        </div>

        <p className='text-center text-xs text-stone-700 mt-6'>
          <Droplets className='w-3.5 h-3.5 inline mr-1' />
          Données indicatives mises à jour régulièrement. Consultez le CNTS pour les données officielles.
        </p>
      </div>
    </section>
  );
}

function BloodBarCard({ blood, index }: { blood: (typeof bloodReserves)[0]; index: number }) {
  const color = getLevelColor(blood.level);
  const label = getLevelLabel(blood.level);
  const isCritical = blood.level === 'critique';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className='bg-white p-4 sm:p-6 rounded-3xl text-center shadow-sm hover:shadow-md transition-shadow'
    >
      <div className='text-xl sm:text-2xl font-black text-crimson mb-4'>{blood.group}</div>
      <div className='h-20 sm:h-24 w-full bg-stone-100 rounded-full relative overflow-hidden flex flex-col justify-end'>
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: `${blood.percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.05 + 0.3, ease: 'easeOut' }}
          className='w-full rounded-full'
          style={{ backgroundColor: color }}
        />
      </div>
      <div className={`mt-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isCritical ? 'animate-pulse' : ''}`} style={{ color }}>
        {label}
      </div>
    </motion.div>
  );
}
