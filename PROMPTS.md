# PROMPTS.md

Ce fichier documente les instructions que j'ai données pour construire HemoLink dans le cadre du Figma to Code Challenge — Édition 4.

## Outil d'IA utilisé

**OpenCode** (powered by Claude) — assistant IA en ligne de commande pour le développement logiciel. Utilisé pour la génération de code, l'itération rapide, le debugging et la documentation.

---

## Prompt 1 — Initialisation du projet et stack technique

> Je veux créer une landing page pour le don de sang au Bénin avec Next.js 16 (App Router), TypeScript strict, Tailwind CSS 4 (avec le système `@theme inline` dans le CSS, pas de fichier tailwind.config.js), et Framer Motion pour les animations.
>
> La palette doit être : rouge crimson `#B91C1C` comme couleur primaire, `#FFFBF5` (cream) comme background principal, et `#F97316` (coral) pour les accents et CTAs. Typo Geist Sans.
>
> Pas de shadcn/ui, pas de Radix. Je veux des composants custom en Tailwind pur pour garder le bundle minimal.
>
> Le projet doit être en français, avec `lang="fr"` sur le html.

---

## Prompt 2 — Structure et sections

> Voici les sections que je veux, dans cet ordre :
> 1. **Navigation** fixe avec scroll-spy, menu drawer sur mobile, 5 liens max + bouton CTA "Donner maintenant"
> 2. **Hero** en 2 colonnes : à gauche le texte (badge urgence CNTS, headline "Chaque Goutte Compte.", sous-titre, 2 boutons), à droite une grosse goutte de sang SVG animée avec un effet heartbeat et un glow pulsant rouge/orange. En dessous une barre de stats blanche (1 Don, 450ml, 24/7, 15 Min)
> 3. **Pourquoi donner** — 3 piliers avec icônes et stats chiffrées, mentionner les Béninois
> 4. **Qui peut donner** — 4 critères (18-65 ans, ≥50kg, délai entre dons, bonne santé) + section jaune pour les reports temporaires
> 5. **Test d'éligibilité** — Formulaire interactif avec genre (boutons homme/femme), âge (input numérique only), année de naissance (input numérique only avec validation croisée age/année), poids (input décimal only), date dernier don (date picker). Algorithme : 18-65 ans, ≥50kg, 3 mois hommes, 4 mois femmes. Trois états de résultat : éligible (vert), presque éligible avec date (orange), non éligible (rouge)
> 6. **Le don étape par étape** — Fusionner le déroulement ET la préparation en une seule section timeline 4 étapes avec les conseils avant/après intégrés
> 7. **Où donner** — Annuaire avec carte Leaflet (react-leaflet, ssr: false), 10 centres CNTS au Bénin (Cotonou, Porto-Novo, Parakou, Abomey-Calavi, Djougou, Natitingou, Lokossa, Ouidah, Bohicon, Kandi) avec vraies coordonnées GPS. 3 modes d'affichage (liste, carte, les deux). Recherche textuelle + filtres par ville et type de don. Géolocalisation avec fallback sur le Bénin si refusée. Cartes expand/collapse avec horaires et contact
> 8. **Réserves sanguines** — 8 groupes sanguins en barres verticales remplies, 4 niveaux de couleur (critique/faible/suffisant/optimal), animation de remplissage au scroll, bannière d'alerte si groupes critiques
> 9. **FAQ** — 12 questions en 5 catégories (Éligibilité, Déroulement, Santé, Pratique, Idées reçues), filtres par catégorie, accordion animé
> 10. **Footer** — Bannière CTA avec gradient hero (crimson→coral), 4 colonnes (marque, menu, ressources avec liens externes Ministère Santé Bénin + OMS, urgence 117), disclaimer médical, copyright 2026

---

## Prompt 3 — Référence visuelle SuperDesign

> Voici du code HTML généré par SuperDesign que j'ai récupéré. Je veux que tu t'en inspires pour aligner le visuel :
> - La goutte de sang dans le hero doit être grande (280px), avec un double halo flou (orange + rouge) qui pulse, et des mini-gouttes qui orbitent autour
> - Les réserves sanguines doivent être des cartes avec des barres verticales (comme dans la référence), pas des barres horizontales
> - Le footer doit avoir la structure à 4 colonnes avec la bannière CTA au-dessus
> - La navigation doit être épurée à 5 liens
>
> [Code HTML SuperDesign fourni — ~760 lignes]

---

## Prompt 4 — Règles d'accessibilité et responsive

> Je veux que le site soit accessible : focus visible crimson sur `:focus-visible`, attributs ARIA partout (aria-expanded, aria-label, role=alert, role=radiogroup), HTML sémantique (header, nav, main, section, footer). Navigation clavier complète.
>
> Responsive de 390px à 1440px. Breakpoints Tailwind standards (sm/md/lg/xl). Le menu mobile est un drawer avec animation Framer Motion.

---

## Prompt 5 — Consignes spécifiques

> - Tous les centres sont au Bénin, référencés au CNTS (Centre National de Transfusion Sanguine), pas à l'EFS
> - Les fréquences de don sont celles du Bénin : 3 mois pour les hommes, 4 mois pour les femmes
> - Le texte "des Français" → "des Béninois"
> - Copyright 2026
> - Les champs numériques (âge, année de naissance, poids) doivent bloquer toute saisie non numérique : filtre keydown, regex onChange, sanitization onPaste, inputMode="numeric"/"decimal"
> - Ajoute une validation croisée entre l'âge et l'année de naissance : si la différence entre (année actuelle - année de naissance) et l'âge dépasse 1, affiche une erreur contextualisée
> - Pas de backend, toutes les données sont statiques locales
> - Output Next.js standalone pour le déploiement
> - Le build doit passer avec 0 erreurs TypeScript et 0 warnings ESLint

---

## Itérations et corrections

### Apostrophes françaises dans JSX

Les chaînes JSX contenant des apostrophes (l'Hôpital, d'après, qu'on) doivent utiliser des double-quotes ou des template literals pour éviter les erreurs de parsing JavaScript.

### Directive 'use client'

Tous les composants utilisant des hooks (useState, useEffect, useRef, useInView) doivent avoir `'use client'` en première ligne.

### Conflit Leaflet + Framer Motion

Framer Motion modifie le z-index des éléments du DOM, ce qui peut cacher les tuiles de la carte Leaflet. Fix : forcer le z-index des panneaux Leaflet via CSS :

```css
.leaflet-tile-pane,
.leaflet-pane > svg,
.leaflet-pane > canvas {
  z-index: 1 !important;
}
```

### Géolocalisation : communication entre composants

Le bouton "Utiliser ma position" est dans `CenterDirectory` (panel de recherche) mais la logique de géolocalisation est dans `CenterMap` (composant dynamique). Solution : exposer la fonction `locate` via un global window (`__hemolink_locate`) depuis CenterMap, et l'appeler depuis CenterDirectory.

---

## Limites rencontrées avec l'outil IA

### Données statiques vs temps réel

L'IA ne peut pas fournir de données en temps réel sur les réserves sanguines ou les statuts d'ouverture des centres. Toutes les données sont fictives et à titre indicatif. L'IA a aidé à structurer les types TypeScript et les interfaces, mais les valeurs réelles doivent être fournies par une source officielle.

### Conflits de z-index (Leaflet + Framer Motion)

L'IA a initialisé le code sans anticiper le conflit entre les z-index de Framer Motion et les tuiles de Leaflet. Le diagnostic et la correction (CSS ciblé sur `.leaflet-tile-pane`) ont nécessité des itérations manuelles. L'IA ne pouvait pas reproduire le bug visuellement.

### Navigation vers sections dans un composant à onglets

La migration du `HorizontalSlider` vers `SectionTabs` a créé un défi de navigation : les liens d'ancrage du footer et de la navigation devaient non seulement changer l'onglet actif mais aussi scroller verticalement la section dans le viewport. L'IA a proposé plusieurs approches (polling du slider, scroll programmatique) avant d'aboutir à la solution finale combinant `requestAnimationFrame` et calcul de offsets.

### Géolocalisation : séparation des composants

Le bouton de géolocalisation et le composant carte sont dans des fichiers différents, dynamiquement importés. L'IA a proposé d'abord un pattern `window.__hemolink_locate` (global) avant de converger vers un `GeoProvider` React context — plus propre mais nécessitant un restructurage de l'arbre de composants.

### Accessibilité des composants animés

L'IA génère naturellement des `<div>` pour tout. L'audit a11y a révélé l'absence de `role="progressbar"`, `role="radiogroup"`, `aria-checked`, etc. sur des composants qui semblaient fonctionnels. Ces corrections ont nécessité un audit manuel systématique que l'IA seule ne couvrait pas.

### Performance mobile

Les animations Framer Motion avec `whileInView` sur mobile peuvent causer des saccades. L'ajout de `prefers-reduced-motion` dans le CSS et l'optimisation du scrolling sur iOS (`-webkit-overflow-scrolling: touch`) ont été des ajustements manuels post-itération.
