# HemoLink

> Plateforme de référence pour le don de sang au Bénin

---

## Démo

[Voir la démo](./demo.mp4)

---

## Contexte du challenge

> *Note : Les challengers sont libres de choisir le nom de leur projet (le nom « HemoLink » est utilisé ici à titre d'exemple).*
>
> *L'objectif principal de la landing page est de permettre à un visiteur n'ayant **jamais donné son sang** de repartir avec trois certitudes :*
> - *son **éligibilité** au don,*
> - *le **lieu** où se rendre pour donner,*
> - *le **déroulement concret** de l'expérience.*

---

## Démarche technique

J'ai lu attentivement le brief ci-dessus et décidé de construire une single-page application Next.js 16 optimisée pour le référencement et la performance, avec un parcours utilisateur pensé comme un entonnoir émotionnel puis pragmatique.

### Stack

| Techno | Rôle |
|---|---|
| Next.js 16 (App Router) | SSG, routing, metadata |
| TypeScript 5 | Typage strict |
| Tailwind CSS 4 | Design system utilitaire (pas de config JS — tout via `@theme` dans le CSS) |
| Framer Motion 12 | Animations au scroll (useInView), layout animations |
| Leaflet + react-leaflet | Carte interactive OpenStreetMap |
| Lucide React | Icônes SVG tree-shakeable |

Aucun backend. Toutes les données sont locales et statiques, comme préconisé par le brief.

### Architecture des composants

```
src/
├── app/
│   ├── globals.css          # @theme inline (palette crimson/cream/coral), keyframes, utilitaires
│   ├── layout.tsx           # <html lang="fr">, Geist fonts, meta SEO, Leaflet CSS
│   └── page.tsx             # Composition séquentielle des sections
├── components/hemolink/
│   ├── Navigation.tsx       # Navbar fixe, scroll-spy manuel, drawer mobile (Framer Motion)
│   ├── Hero.tsx             # 2 colonnes : accroche + goutte de sang SVG animée (heartbeat, float, glow)
│   ├── WhyDonate.tsx        # C1 : 3 piliers + stats chiffrées
│   ├── WhoCanDonate.tsx     # C2 : 4 critères + reports temporaires
│   ├── EligibilityTest.tsx  # C3 : Formulaire interactif (genre, âge, année naissance, poids, dernier don)
│   ├── DonationProcess.tsx  # C4+C5 fusionnées : Timeline 4 étapes + préparation avant/après
│   ├── CenterDirectory.tsx  # C6 : Recherche, filtres ville/type, quick-filters, view toggle, expand/collapse
│   ├── CenterMap.tsx        # Carte Leaflet, marqueurs, popups, FlyTo, FitBounds, géolocalisation
│   ├── BloodReserves.tsx    # C7 : 8 groupes sanguins, barres verticales animées, alerte critique
│   ├── FAQ.tsx              # C8 : 12 Q/R, 5 catégories, accordion, filtres
│   └── Footer.tsx           # Bannière CTA gradient, 4 colonnes, urgence 117, disclaimer médical
├── data/
│   ├── centers.ts           # 10 centres CNTS (Bénin) avec coordonnées GPS, horaires, types de dons
│   ├── blood-reserves.ts    # 8 groupes, niveaux, jours de réserve, helpers de coloration
│   └── faq.ts               # 12 items typés (5 catégories)
└── lib/
    ├── eligibility.ts      # Pure function : checkEligibility(input) → { status, reasons, nextDate }
    ├── geo.tsx              # GeoProvider context: geolocation with Benin fallback
    ├── toast.tsx            # ToastProvider context: animated notifications (success/error/warning/info)
    └── utils.ts             # cn() helper (clsx + tailwind-merge)
```

### Design system

La palette est définie entièrement dans `globals.css` via `@theme inline` — pas de fichier de config JS séparé.

```css
--color-crimson: #B91C1C;       /* Primaire — évoque le sang sans agressivité */
--color-coral: #F97316;         /* Accent — appels à l'action */
--color-cream: #FFFBF5;         /* Background — chaleur, accessibilité */
```

Typographie : Geist Sans (déjà intégrée au scaffold Next.js). Hiérarchie par taille et poids uniquement.

Animations CSS custom : `heartbeat`, `float`, `drip`, `pulse-dot`. Framer Motion gère les entrées au scroll (`useInView`), les layout animations (accordion, expand/collapse) et les transitions de résultats.

### Décisions de conception

**1. Fusion C4+C5**
Le déroulement du don et la préparation sont un même parcours temporel. Les séparer créerait une rupture dans le flux. J'ai fusionné ces deux sections en une timeline unique avec les conseils intégrés.

**2. Géolocalisation avec fallback Bénin**
L'API `navigator.geolocation` est utilisée pour centrer la carte sur la position de l'utilisateur. Si l'autorisation est refusée, la carte fait un `flyTo` sur le centre du Bénin (6.4961°N, 2.6292°E) avec un toast informatif.

**3. Validation croisée âge/année de naissance**
Le formulaire d'éligibilité vérifie la cohérence entre l'âge déclaré et l'année de naissance (tolérance ±1 an pour les anniversaires non passés). Le message d'erreur est contextualisé : *"Si vous êtes né(e) en 1998, vous devriez avoir 28 ou 27 ans, et non 35 ans."*

**4. Inputs numériques stricts**
Les champs âge et année de naissance bloquent toute saisie non numérique (keydown filter + onChange regex + onPaste sanitization + inputMode="numeric").

**5. Data d'entrée strict**
Champ poids : uniquement chiffres + un seul point décimal. Bloque les lettres, symboles et points multiples.

### Fonctionnalités clés

**Simulateur d'éligibilité**
- 5 champs : genre, âge, année de naissance, poids, date du dernier don
- Algorithme conforme aux standards béninois : 18-65 ans, ≥50 kg, 3 mois (H) / 4 mois (F) entre les dons
- 3 états de résultat : éligible, non éligible, date prochaine
- Validation croisée âge/année avec message d'incohérence
- Anti-saisie non numérique sur tous les champs numériques

**Annuaire + Carte Leaflet**
- 10 centres CNTS sur 10 villes béninoises
- 3 modes d'affichage : liste, carte, ou les deux côte à côte
- Recherche textuelle + filtres par ville, type de don, statut ouvert/pas de RDV
- Géolocalisation navigateur avec fallback Bénin
- Cartes extensibles (horaires, contact, infos)
- Marqueurs cliquables avec popups détaillés

**Réserves sanguines**
- 8 groupes avec barres de remplissage verticales animées
- Code couleur 4 niveaux (critique/faible/suffisant/optimal)
- Bannière d'alerte automatique pour les groupes critiques

**FAQ**
- 12 questions, 5 catégories filtrables
- Accordion animé (Framer Motion layout)

### Accessibilité

- `lang="fr"` sur la balise racine
- Focus visible crimson sur tous les éléments interactifs (`:focus-visible`)
- Attributs ARIA : `aria-expanded`, `aria-label`, `aria-checked`, `role="alert"`, `role="radiogroup"`
- HTML sémantique : `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Navigation clavier complète sur tous les accordéons, filtres et boutons
- Contrastes conformes WCAG AA

### Performance

- **0 dépendances radium/shadcn** — composants custom Tailwind uniquement
- **Leaflet lazy-loaded** via `next/dynamic({ ssr: false })`
- **Framer Motion `useInView`** avec `once: true` — les animations ne se déclenchent qu'une fois
- **Données statiques** — aucun fetch réseau, tout est en bundle
- **Output standalone** — prêt pour déploiement Docker ou serverless

## Installation et lancement

```bash
npm install
npm run dev
# → http://localhost:3000
```

```bash
npm run build
npm start
```

## Déploiement

Le build génère un output standalone dans `.next/standalone/`. Déployable sur Vercel, Netlify, ou tout serveur Node.js 18+.
Aucune variable d'environnement requise.

---

## Processus & Usage IA

Ce projet a été construit en collaboration avec un assistant IA (OpenCode / Claude) pour accélérer le développement tout en gardant le contrôle total sur les décisions produit et techniques.

### Prompts utilisés

Le fichier [`PROMPTS.md`](./PROMPTS.md) documente l'intégralité des instructions et itérations utilisées pour construire HemoLink, incluant :
- Initialisation du projet et choix de stack
- Structure des sections et brief fonctionnel
- Références visuelles SuperDesign
- Règles d'accessibilité et responsive
- Consignes spécifiques (data Bénin, inputs stricts, validation croisée)

### Bonnes pratiques Git

- **Commits atomiques** : chaque commit a un scope clair (feat, fix, perf, docs, chore, ci)
- **Messages conventionnels** : format `type(scope): description`
- **Issues & documentation** : README complet, PROMPTS.md, LICENSE
- **CI** : configuration GitHub Actions avec tests Playwright + vitest
- **A11y testing** : axe-core intégré dans les dépendances

---

## Licence

Projet éducatif — Figma to Code Challenge Édition 4.
Données fictives à des fins de démonstration.
