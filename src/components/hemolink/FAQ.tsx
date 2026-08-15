'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqItems, faqCategories } from '@/data/faq';

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === 'all'
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  return (
    <section id='faq' className='py-20 sm:py-28 gradient-crimson-soft'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div ref={ref} className='text-center max-w-2xl mx-auto mb-12'>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className='inline-block text-crimson font-semibold text-sm tracking-wide uppercase mb-4'
          >
            FAQ & Idées reçues
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className='text-3xl sm:text-4xl font-bold text-stone-900 mb-4'
          >
            Vos questions, nos{' '}
            <span className='text-gradient'>réponses honnêtes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className='text-stone-600 text-lg leading-relaxed'
          >
            On a compilé les questions les plus fréquentes. Si la vôtre n'y est pas,
            n'hésitez pas à contacter directement un centre de transfusion.
          </motion.p>
        </div>

        {/* Category filter */}
        <div className='flex flex-wrap items-center justify-center gap-2 mb-10'>
          <button
            onClick={() => { setActiveCategory('all'); setOpenIndex(null); }}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-crimson text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            Toutes
          </button>
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-crimson text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className='max-w-3xl mx-auto space-y-3'>
          <AnimatePresence mode='popLayout'>
            {filtered.map((item, i) => {
              const isOpen = openIndex === i;
              const globalIndex = faqItems.indexOf(item);
              return (
                <motion.div
                  key={globalIndex}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.03 }}
                  className='bg-white rounded-xl border border-stone-100 overflow-hidden'
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className='w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start gap-3 hover:bg-stone-50/50 transition-colors'
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${globalIndex}`}
                  >
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors ${
                      isOpen ? 'text-crimson' : 'text-stone-600'
                    }`} />
                    <span className={`flex-1 text-sm sm:text-[15px] font-medium leading-snug transition-colors ${
                      isOpen ? 'text-crimson' : 'text-stone-800'
                    }`}>
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-600 flex-shrink-0 mt-1 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${globalIndex}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className='overflow-hidden'
                      >
                        <div className='px-5 sm:px-6 pb-5 sm:pb-6 pt-0 pl-[2.75rem] sm:pl-[3.25rem]'>
                          <p className='text-sm text-stone-600 leading-relaxed'>{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
