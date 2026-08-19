'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  Clock,
  Phone,
  Mail,
  Filter,
  X,
  CalendarCheck,
  Droplets,
  ChevronDown,
  Map as MapIcon,
  List,
  Crosshair,
  Navigation,
  Loader2,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { centers, cities, donationTypes, donationTypeLabels, type Center, type DonationType } from '@/data/centers';
import { useGeo } from '@/lib/geo';

const CenterMap = dynamic(() => import('./CenterMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[350px] lg:min-h-[500px] rounded-2xl bg-stone-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-3 border-crimson border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-stone-700">Chargement de la carte...</p>
      </div>
    </div>
  ),
});

type ViewMode = 'list' | 'map' | 'both';

export default function CenterDirectory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { status: geoStatus, locate } = useGeo();

  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<DonationType | ''>('');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCenter, setExpandedCenter] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('both');
  const [quickFilter, setQuickFilter] = useState<'all' | 'open' | 'no_rdv'>('all');

  const filtered = useMemo(() => {
    return centers.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch = !search || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.address.toLowerCase().includes(q);
      const matchCity = !cityFilter || c.city === cityFilter;
      const matchType = !typeFilter || c.donationTypes.includes(typeFilter);
      const matchQuick = quickFilter === 'all' || (quickFilter === 'open' && c.isOpen) || (quickFilter === 'no_rdv' && !c.appointmentRequired);
      return matchSearch && matchCity && matchType && matchQuick;
    });
  }, [search, cityFilter, typeFilter, quickFilter]);

  const activeFiltersCount = [cityFilter, typeFilter].filter(Boolean).length;

  const clearFilters = () => { setCityFilter(''); setTypeFilter(''); setSearch(''); };

  const handleMapSelectCenter = (id: number) => {
    setExpandedCenter(id);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) setViewMode('list');
  };

  const handleLocate = () => {
    locate();
  };

  const hasResults = filtered.length > 0;

  return (
    <section id="centres" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-block text-crimson font-semibold text-sm tracking-wide uppercase mb-4"
          >
            {"Où donner"}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4"
          >
            Trouvez le centre le plus{' '}
            <span className="text-gradient">proche de chez vous</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-stone-600 text-lg leading-relaxed"
          >
            {`${centers.length} centres de transfusion répartis sur ${cities.length} villes au Bénin.`}
          </motion.p>
        </div>

        {/* Search bar */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-600" />
              <input
                type="text"
                placeholder="Rechercher par ville, nom..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-stone-200 bg-white text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-crimson transition-colors"
                aria-label="Rechercher un centre"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={"relative flex items-center gap-2 px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all whitespace-nowrap " + (showFilters || activeFiltersCount > 0 ? 'border-crimson bg-red-50 text-crimson' : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300')}
              aria-expanded={showFilters}
              aria-label="Filtres"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filtres</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-crimson text-white text-xs flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Quick filter pills */}
          <div className='flex items-center gap-2 mt-4 overflow-x-auto pb-1' role='radiogroup' aria-label='Filtres rapides'>
            {([['all', 'Tous les centres'], ['open', 'Ouverts maintenant'], ['no_rdv', 'Sans rendez-vous']] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setQuickFilter(val)}
                className={`whitespace-nowrap px-4 py-2 rounded-2xl text-sm font-medium transition-all border ${
                  quickFilter === val
                    ? 'bg-crimson text-white border-crimson shadow-sm'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-crimson hover:text-crimson'
                }`}
                role='radio'
                aria-checked={quickFilter === val}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Geolocation + View toggle + count */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleLocate}
                className="flex items-center gap-1.5 text-sm font-medium text-crimson hover:text-crimson-dark transition-colors"
                aria-label="Utiliser ma position"
              >
                {geoStatus === 'requesting' && <Loader2 className="w-4 h-4 animate-spin" />}
                {geoStatus !== 'requesting' && geoStatus !== 'granted' && <Crosshair className="w-4 h-4" />}
                {geoStatus === 'granted' && <Navigation className="w-4 h-4" />}
                <span>{geoStatus === 'granted' ? 'Localisé' : geoStatus === 'requesting' ? 'Localisation...' : 'Utiliser ma position'}</span>
              </button>
              <span className="text-stone-300">|</span>
              <p className="text-sm text-stone-700" aria-live="polite">
                <span className="font-semibold text-stone-700">{filtered.length}</span> centre{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex items-center bg-stone-100 rounded-lg p-0.5" role="radiogroup" aria-label="Mode d'affichage">
              <ViewButton active={viewMode === 'list'} onClick={() => setViewMode('list')} label="Liste" icon={<List className="w-3.5 h-3.5" />} />
              <ViewButton active={viewMode === 'map'} onClick={() => setViewMode('map')} label="Carte" icon={<MapIcon className="w-3.5 h-3.5" />} />
              <ViewButton active={viewMode === 'both'} onClick={() => setViewMode('both')} label="Liste + Carte" icon={<><List className="w-3.5 h-3.5" /> <MapIcon className="w-3.5 h-3.5" /></>} hidden />
            </div>
          </div>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="max-w-3xl mx-auto mb-6 bg-white rounded-xl border border-stone-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-stone-800">{`Filtrer les résultats`}</span>
                  {activeFiltersCount > 0 && (
                    <button onClick={clearFilters} className="text-xs text-crimson hover:text-crimson-dark font-medium flex items-center gap-1">
                      <X className="w-3 h-3" /> Effacer tout
                    </button>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city-filter" className="block text-xs font-medium text-stone-700 mb-1.5">Ville</label>
                    <select id="city-filter" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm text-stone-900 bg-white focus:outline-none focus:border-crimson">
                      <option value="">Toutes les villes</option>
                      {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="type-filter" className="block text-xs font-medium text-stone-700 mb-1.5">Type de don</label>
                    <select id="type-filter" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as DonationType | '')} className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-sm text-stone-900 bg-white focus:outline-none focus:border-crimson">
                      <option value="">Tous les types</option>
                      {donationTypes.map((t) => <option key={t} value={t}>{donationTypeLabels[t]}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No results */}
        {!hasResults && (
          <div className="text-center py-16">
            <MapPin className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-stone-700 mb-2">Aucun centre trouvé</h3>
            <p className="text-sm text-stone-700 mb-4">Essayez d'élargir vos critères de recherche.</p>
            <button onClick={clearFilters} className="text-sm text-crimson font-medium hover:text-crimson-dark">Réinitialiser les filtres</button>
          </div>
        )}

        {/* Results */}
        {hasResults && (
          <div className={viewMode === 'both' ? 'lg:grid lg:grid-cols-2 lg:gap-6' : ''}>
            {(viewMode === 'map' || viewMode === 'both') && (
              <div className={(viewMode === 'both' ? 'order-1 ' : '') + 'mb-6 lg:mb-0'}>
                <div className="h-[400px] lg:h-[560px]">
                  <CenterMap filteredCenters={filtered} onSelectCenter={handleMapSelectCenter} />
                </div>
              </div>
            )}
            {(viewMode === 'list' || viewMode === 'both') && (
              <div className={viewMode === 'both' ? 'lg:max-h-[560px] lg:overflow-y-auto lg:pr-2 space-y-3' : 'space-y-3'}>
                <AnimatePresence mode="popLayout">
                  {filtered.map((center, i) => (
                    <CenterCard key={center.id} center={center} isExpanded={expandedCenter === center.id} onToggle={() => setExpandedCenter(expandedCenter === center.id ? null : center.id)} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function ViewButton({ active, onClick, label, icon, hidden }: { active: boolean; onClick: () => void; label: string; icon: React.ReactNode; hidden?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={"hidden " + (hidden ? 'sm:hidden' : 'sm:flex') + ' items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ' + (active ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-700 hover:text-stone-900')}
      role="radio"
      aria-checked={active}
    >
      {icon} {label}
    </button>
  );
}

function CenterCard({ center, isExpanded, onToggle, index }: { center: Center; isExpanded: boolean; onToggle: () => void; index: number }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ delay: index * 0.03 }} className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-md transition-shadow">
      <button onClick={onToggle} className="w-full text-left p-5 sm:p-6 flex items-start gap-4" aria-expanded={isExpanded} aria-controls={`center-details-${center.id}`}>
        <div className={"flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center " + (center.isOpen ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-100 text-stone-600')}>
          <MapPin className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug">{center.name}</h3>
              <p className="text-stone-700 text-xs sm:text-sm mt-1">{center.address}, {center.city}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={"inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full " + (center.isOpen ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-700')}>
                <span className={"w-1.5 h-1.5 rounded-full " + (center.isOpen ? 'bg-emerald-500 pulse-dot' : 'bg-stone-600')} />
                {center.isOpen ? 'Ouvert' : "Fermé"}
              </span>
              <ChevronDown className={"w-4 h-4 text-stone-600 transition-transform " + (isExpanded ? 'rotate-180' : '')} aria-hidden="true" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {center.donationTypes.map((t) => (
              <span key={t} className="text-[11px] font-medium bg-red-50 text-crimson px-2 py-0.5 rounded-md">{donationTypeLabels[t]}</span>
            ))}
            {center.appointmentRequired && (
              <span className="text-[11px] font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                <CalendarCheck className="w-3 h-3" aria-hidden="true" /> Sur rendez-vous
              </span>
            )}
          </div>
        </div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div id={`center-details-${center.id}`} className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 border-t border-stone-100">
              <div className="pt-5 grid sm:grid-cols-2 gap-5">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-crimson" aria-hidden="true" />
                    <span className="text-sm font-semibold text-stone-800">Horaires d&apos;ouverture</span>
                  </div>
                  <div className="space-y-1.5">
                    {center.hours.map((h) => (
                      <div key={h.jours} className="flex items-center justify-between text-sm">
                        <span className="text-stone-600">{h.jours}</span>
                        <span className={"font-medium " + (h.horaires === "Fermé" ? 'text-stone-600' : 'text-stone-900')}>{h.horaires}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Droplets className="w-4 h-4 text-crimson" aria-hidden="true" />
                      <span className="text-sm font-semibold text-stone-800">Informations</span>
                    </div>
                    <p className="text-sm text-stone-700 mb-1">{center.nature}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-stone-600" aria-hidden="true" />
                      <a href={"tel:" + center.phone.replace(/\s/g, '')} className="text-sm text-crimson hover:underline">{center.phone}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-stone-600" aria-hidden="true" />
                      <a href={"mailto:" + center.email} className="text-sm text-crimson hover:underline">{center.email}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
