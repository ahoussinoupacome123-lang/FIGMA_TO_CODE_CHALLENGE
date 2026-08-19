import { Droplets, Heart, ArrowRight, ExternalLink, Facebook, Twitter, Phone } from 'lucide-react';

const footerLinks = [
  { label: 'Accueil', href: '#' },
  { label: 'Pourquoi donner', href: '#pourquoi' },
  { label: `Test d'éligibilité`, href: '#test' },
  { label: 'Centres de don', href: '#centres' },
];

const resourceLinks = [
  { label: 'Questions fréquentes', href: '#faq' },
  { label: 'Santé & Nutrition', href: '#pourquoi' },
  { label: 'Ministère de la Santé', href: 'https://www.sante.gouv.bj/', external: true },
  { label: 'OMS - Transfusion', href: 'https://www.who.int/health-topics/blood-safety-and-availability', external: true },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white">
      {/* CTA Banner */}
      <div className="gradient-hero py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Heart className="w-4 h-4 text-orange-300" aria-hidden="true" />
            <span className="text-white/90 text-sm font-medium">Prêt à sauver des vies ?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-2xl mx-auto leading-tight">
            Chaque don compte.
            <br />
            Le vôtre pourrait être celui qui manque.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#test"
              className="group inline-flex items-center gap-2 bg-white text-crimson font-semibold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Vérifier mon éligibilité
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#centres"
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white font-medium px-8 py-4 rounded-full text-lg hover:bg-white/25 transition-all"
            >
              Trouver un centre
            </a>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="w-6 h-6 text-crimson-light" />
                <span className="text-xl font-extrabold">HemoLink</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed mb-6">
                La plateforme solidaire du don de sang au Bénin. Facilitons ensemble l&apos;accès au sang pour tous ceux qui en ont besoin.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-crimson transition-colors" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-crimson transition-colors" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
                <h3 className="font-bold text-sm mb-6">Menu</h3>
              <ul className="space-y-4 text-sm">
                {footerLinks.map((link) => (
                  <li key={link.href + link.label}>
                    {'external' in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-1">
                        {link.label} <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <a href={link.href} className="text-white/80 hover:text-white transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-sm mb-6">Ressources</h3>
              <ul className="space-y-4 text-sm">
                {resourceLinks.map((link) => (
                  <li key={link.href + link.label}>
                    {'external' in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-1">
                        {link.label} <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <a href={link.href} className="text-white/80 hover:text-white transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Urgence */}
            <div>
              <h3 className="font-bold text-sm mb-6">Urgence</h3>
              <p className="text-white/80 text-sm mb-4 leading-relaxed">
                En cas d'urgence transfusionnelle, appelez immédiatement le numéro d'urgence national.
              </p>
              <a
                href="tel:117"
                className="inline-flex items-center gap-2 bg-coral text-stone-900 font-bold px-6 py-3 rounded-xl hover:bg-orange-500 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                Appeler le 117
              </a>
            </div>
          </div>

          {/* Medical disclaimer */}
          <div className="bg-white/5 rounded-2xl border border-white/5 p-5 mb-10" role="note" aria-label="Avertissement médical">
            <p className="text-xs text-white/80 leading-relaxed">
              <strong className="text-white/80">Avertissement médical :</strong> Les informations présentées sur HemoLink sont fournies à titre indicatif et ne sauraient se substituer à un avis médical professionnel. Seul un médecin habilité peut confirmer votre aptitude au don de sang après un entretien clinique.
            </p>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-stone-800 pt-6 text-center">
            <p className="text-xs text-white/70">
              © 2026 HemoLink Bénin. Tous droits réservés. Développé pour la solidarité nationale.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
