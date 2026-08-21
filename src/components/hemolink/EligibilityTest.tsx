'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { CheckCircle2, XCircle, CalendarClock, HelpCircle, Droplets, AlertTriangle } from 'lucide-react';
import { checkEligibility, type EligibilityResult } from '@/lib/eligibility';
import { useToast } from '@/lib/toast';

export default function EligibilityTest() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const toast = useToast();

  const [age, setAge] = useState<string>('');
  const [birthYear, setBirthYear] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [gender, setGender] = useState<'' | 'homme' | 'femme'>('');
  const [lastDonation, setLastDonation] = useState<string>('');
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const e: Record<string, string> = {};
    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const birthYearNum = parseInt(birthYear);
    const currentYear = new Date().getFullYear();

    if (!age || isNaN(ageNum)) e.age = 'Veuillez entrer votre âge.';
    else if (ageNum < 1 || ageNum > 120) e.age = 'Âge invalide.';

    if (!birthYear || isNaN(birthYearNum)) e.birthYear = 'Veuillez entrer votre année de naissance.';
    else if (birthYearNum < 1900 || birthYearNum > currentYear) e.birthYear = 'Année de naissance invalide.';

    if (!weight || isNaN(weightNum)) e.weight = 'Veuillez entrer votre poids.';
    else if (weightNum < 20 || weightNum > 300) e.weight = 'Poids invalide.';

    if (!gender) e.gender = 'Veuillez sélectionner votre genre.';

    // Cross-check: age vs birth year (allow ±1 for birthday not yet passed this year)
    if (
      !isNaN(ageNum) && !isNaN(birthYearNum) &&
      birthYearNum >= 1900 && birthYearNum <= currentYear &&
      ageNum >= 1 && ageNum <= 120
    ) {
      const expectedAge = currentYear - birthYearNum;
      const diff = Math.abs(ageNum - expectedAge);
      if (diff > 1) {
        e.age = `Incohérence : si vous êtes né(e) en ${birthYearNum}, vous devriez avoir ${expectedAge} ou ${expectedAge - 1} ans, et non ${ageNum} ans.`;
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    if (!validate()) {
      const errorMsgs = Object.values(errors).filter(Boolean);
      if (errorMsgs.length > 0) {
        toast(errorMsgs.join(' '), 'error', true);
      } else {
        toast('Veuillez corriger les erreurs du formulaire.', 'error', true);
      }
      return;
    }

    const res = checkEligibility({
      age: parseInt(age),
      weight: parseFloat(weight),
      gender,
      lastDonationDate: lastDonation || null,
    });
    setResult(res);
    // Auto-scroll to result
    setTimeout(() => {
      document.getElementById('eligibility-result')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  function reset() {
    setAge('');
    setBirthYear('');
    setWeight('');
    setGender('');
    setLastDonation('');
    setResult(null);
    setErrors({});
  }

  const currentYear = new Date().getFullYear();

  return (
    <section id="test" className="py-14 sm:py-20 lg:py-28 gradient-crimson-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-crimson font-semibold text-sm tracking-wide uppercase mb-4"
          >
            Test d'éligibilité
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4"
          >
            Vérifiez votre éligibilité{' '}
            <span className="text-gradient">en quelques secondes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-stone-600 text-lg leading-relaxed"
          >
            Répondez à 5 questions pour savoir si vous pouvez donner votre sang.
            Ce test est indicatif et ne remplace pas l'entretien médical.
          </motion.p>
        </div>

        <div className="max-w-xl mx-auto overflow-hidden">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg shadow-red-900/5 p-6 sm:p-8 border border-red-100/50 overflow-hidden"
            aria-label="Formulaire de test d'éligibilité au don de sang"
          >
            {/* Gender */}
            <div className="mb-6">
              <label id="gender-label" className="block text-sm font-semibold text-stone-800 mb-3">
                Genre
              </label>
              <div
                className="grid grid-cols-2 gap-3"
                role="radiogroup"
                aria-labelledby="gender-label"
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    setGender('femme');
                    setErrors((prev) => ({ ...prev, gender: '' }));
                  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    setGender('homme');
                    setErrors((prev) => ({ ...prev, gender: '' }));
                  }
                }}
              >
                {['homme', 'femme'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    role="radio"
                    aria-checked={gender === g}
                    tabIndex={gender === g || (!gender && g === 'homme') ? 0 : -1}
                    onClick={() => { setGender(g as 'homme' | 'femme'); setErrors((prev) => ({ ...prev, gender: '' })); }}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                      gender === g
                        ? 'border-crimson bg-red-50 text-crimson'
                        : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {g === 'homme' ? 'Homme' : 'Femme'}
                  </button>
                ))}
              </div>
              {errors.gender && <p className="text-crimson text-xs mt-2 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {errors.gender}</p>}
            </div>

            {/* Age & Birth year row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="age" className="block text-sm font-semibold text-stone-800 mb-2">
                  Âge (ans)
                </label>
                <input
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  placeholder="ex. 28"
                  value={age}
                  onChange={(e) => { const v = e.target.value.replace(/[^0-9]/g, ''); setAge(v); setErrors((prev) => ({ ...prev, age: '', birthYear: '' })); }}
                  onKeyDown={(e) => { if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') e.preventDefault(); }}
                  onPaste={(e) => { const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 3); e.preventDefault(); setAge(pasted); setErrors((prev) => ({ ...prev, age: '', birthYear: '' })); }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className={`w-full px-4 py-3 rounded-xl border-2 text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:outline-none ${
                    errors.age ? 'border-crimson bg-red-50/50' : 'border-stone-200 focus:border-crimson'
                  }`}
                  aria-describedby={errors.age ? 'age-error' : undefined}
                />
                {errors.age && (
                  <p id="age-error" className={`text-xs mt-1.5 flex items-center gap-1 ${errors.age.includes('Incohérence') ? 'text-amber-600' : 'text-crimson'}`}>
                    {errors.age.includes('Incohérence') ? <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" /> : <XCircle className="w-3.5 h-3.5" />}
                    {errors.age}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="birthYear" className="block text-sm font-semibold text-stone-800 mb-2">
                  Année de naissance
                </label>
                <input
                  id="birthYear"
                  type="number"
                  min="1900"
                  max={currentYear}
                  placeholder="ex. 1998"
                  value={birthYear}
                  onChange={(e) => { const v = e.target.value.replace(/[^0-9]/g, ''); setBirthYear(v); setErrors((prev) => ({ ...prev, age: '', birthYear: '' })); }}
                  onKeyDown={(e) => { if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') e.preventDefault(); }}
                  onPaste={(e) => { const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 4); e.preventDefault(); setBirthYear(pasted); setErrors((prev) => ({ ...prev, age: '', birthYear: '' })); }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className={`w-full px-4 py-3 rounded-xl border-2 text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:outline-none ${
                    errors.birthYear ? 'border-crimson bg-red-50/50' : 'border-stone-200 focus:border-crimson'
                  }`}
                  aria-describedby={errors.birthYear ? 'birthyear-error' : undefined}
                />
                {errors.birthYear && <p id="birthyear-error" className="text-crimson text-xs mt-1.5 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {errors.birthYear}</p>}
              </div>
            </div>

            {/* Weight */}
            <div className="mb-6">
              <label htmlFor="weight" className="block text-sm font-semibold text-stone-800 mb-2">
                Poids (kg)
              </label>
              <input
                id="weight"
                type="number"
                min="20"
                max="300"
                step="0.1"
                placeholder="ex. 65"
                value={weight}
                onChange={(e) => { const v = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'); setWeight(v); setErrors((prev) => ({ ...prev, weight: '' })); }}
                onKeyDown={(e) => { if (!/[0-9.]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') e.preventDefault(); if (e.key === '.' && e.currentTarget.value.includes('.')) e.preventDefault(); }}
                inputMode="decimal"
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:outline-none ${
                  errors.weight ? 'border-crimson bg-red-50/50' : 'border-stone-200 focus:border-crimson'
                }`}
                aria-describedby={errors.weight ? 'weight-error' : undefined}
              />
              {errors.weight && <p id="weight-error" className="text-crimson text-xs mt-1.5 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {errors.weight}</p>}
            </div>

            {/* Last donation */}
            <div className="mb-8">
              <label htmlFor="lastDonation" className="block text-sm font-semibold text-stone-800 mb-2">
                Date de votre dernier don <span className="font-normal text-stone-600">(facultatif)</span>
              </label>
              <input
                id="lastDonation"
                type="date"
                value={lastDonation}
                onChange={(e) => setLastDonation(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="date-input w-full px-4 py-3 rounded-xl border-2 border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus:outline-none focus:border-crimson"
                aria-describedby="lastDonation-hint"
              />
              <p id="lastDonation-hint" className="text-xs text-stone-700 mt-1.5 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> Laissez vide si vous n'avez jamais donné.
              </p>
            </div>

            <button
              type="submit"
              className="w-full gradient-crimson text-white font-semibold py-4 px-6 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all text-base shadow-md shadow-red-900/10 flex items-center justify-center gap-2"
            >
              <Droplets className="w-4 h-4" />
              Vérifier mon éligibilité
            </button>
          </motion.form>

          {/* Result */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result.status}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`mt-6 rounded-2xl p-6 sm:p-8 border ${
                  result.status === 'eligible'
                    ? 'bg-emerald-50 border-emerald-200'
                    : result.status === 'next_date'
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-red-50 border-red-200'
                }`}
                role="alert"
                id="eligibility-result"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    result.status === 'eligible'
                      ? 'bg-emerald-100 text-emerald-600'
                      : result.status === 'next_date'
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-red-100 text-crimson'
                  }`}>
                    {result.status === 'eligible' ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : result.status === 'next_date' ? (
                      <CalendarClock className="w-6 h-6" />
                    ) : (
                      <XCircle className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg mb-2 ${
                      result.status === 'eligible'
                        ? 'text-emerald-800'
                        : result.status === 'next_date'
                        ? 'text-amber-800'
                        : 'text-red-800'
                    }`}>
                      {result.status === 'eligible'
                        ? 'Vous semblez éligible !'
                        : result.status === 'next_date'
                        ? 'Presque éligible !'
                        : 'Non éligible pour le moment'}
                    </h3>
                    <div className="space-y-1.5">
                      {result.reasons.map((r, i) => (
                        <p key={i} className="text-sm text-stone-700 leading-relaxed">{r}</p>
                      ))}
                    </div>
                    {result.status === 'eligible' && (
                      <a
                        href="#centres"
                        className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                      >
                        Trouver un centre près de chez moi →
                      </a>
                    )}
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="mt-5 w-full py-2.5 rounded-xl border-2 border-stone-200 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  Refaire le test
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
