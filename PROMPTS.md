# PROMPTS.md

Ce document documente la méthodologie de développement d'HemoLink dans le cadre du Figma to Code Challenge — Édition 4.

---

## Outils d'IA sollicités

| Outil | Usage |
|---|---|
| **OpenCode** (Claude, big-pickle) | Assistant CLI principal — génération de code, itération, debugging, refactoring, documentation |
| **z.ai** (GLM 5.2) | Assistant web — vérification de conformité au brief, audit de scoring, suggestions d'amélioration UX/UI |

**Workflow** : OpenCode pour l'implémentation technique, z.ai pour la review et l'audit qualité.

---

## Séquence des prompts significatifs

### Prompt 1 — Initialisation du projet

```
Créer une landing page pour le don de sang au Bénin avec Next.js 16 (App Router),
TypeScript strict, Tailwind CSS 4 (@theme inline, pas de tailwind.config.js),
Framer Motion pour les animations.

Palette : crimson #B91C1C (primaire), cream #FFFBF5 (background), coral #F97316 (accents/CTAs).
Typo : Geist Sans.
Pas de shadcn/ui, pas de Radix. Composants custom Tailwind pur.
Projet en français, lang="fr" sur le html.
```

**Résultat** : Scaffold Next.js 16, globals.css avec @theme inline, layout.tsx avec Geist fonts.

### Prompt 2 — Structure des sections

```
Sections dans cet ordre :
1. Navigation fixe avec scroll-spy, drawer mobile, 5 liens max
2. Hero 2 colonnes : texte à gauche, goutte de sang SVG animée (heartbeat + glow) à droite,
   barre de stats (1 Don, 450ml, 24/7, 15 Min)
3. Pourquoi donner — 3 piliers + stats
4. Qui peut donner — 4 critères + reports temporaires
5. Test d'éligibilité — formulaire interactif avec validation croisée âge/année
6. Le don étape par étape — timeline 4 étapes FUSIONNÉE avec préparation (avant/après)
7. Où donner — annuaire 10 centres CNTS Bénin + carte Leaflet + géolocalisation
8. Réserves sanguines — 8 groupes, barres verticales, alerte critique
9. FAQ — 12 questions, 5 catégories, accordion
10. Footer — CTA gradient, 4 colonnes, urgence 117
```

**Résultat** : page.tsx avec 10 composants séquentiels.

### Prompt 3 — Référence visuelle SuperDesign

```
Inspirer du code SuperDesign pour :
- Goutte de sang hero : 280px, double halo flou (orange + rouge), mini-gouttes orbitales
- Réserves : barres verticales (pas horizontales)
- Footer : structure 4 colonnes + bannière CTA
- Navigation : épurée à 5 liens
```

**Résultat** : Hero avec SVG animé (heartbeat CSS + float + glow), BloodReserves avec barres verticales.

### Prompt 4 — Accessibilité et responsive

```
Accessibilité : focus visible crimson, ARIA partout (aria-expanded, aria-label, role=alert,
role=radiogroup, aria-checked), HTML sémantique, navigation clavier complète.
Responsive 390px-1440px. Menu mobile drawer Framer Motion.
```

**Résultat** : Composants avec rôles ARIA, keyboard handlers, focus-visible CSS.

### Prompt 5 — Consignes spécifiques Bénin

```
- Centres au Bénin, référencés CNTS (pas EFS)
- Fréquences : 3 mois hommes, 4 mois femmes
- "des Français" → "des Béninois"
- Copyright 2026
- Champs numériques : keydown filter + regex onChange + onPaste sanitize + inputMode
- Validation croisée âge/année de naissance (tolérance ±1 an)
- Pas de backend, données statiques locales
- Output standalone
- Build : 0 erreurs TS, 0 warnings ESLint
```

**Résultat** : eligibility.ts avec algorithme béninois, inputs stricts, centres avec GPS réels.

### Prompt 6 — Données centroïdes (10 centres)

```
Remplacer Tanguiéta par Ouidah et Kandi. Supprimer le centre Cotonou doublon (id 4).
Vérifier qu'il y a exactement 10 centres avec les 10 villes requises :
Cotonou, Porto-Novo, Parakou, Abomey-Calavi, Djougou, Natitingou, Lokossa, Ouidah, Bohicon, Kandi.
```

**Résultat** : centers.ts avec 10 centres uniques, 10 villes, coordonnées GPS réelles.

### Prompt 7 — Audit scoring et corrections

```
Vérifier la conformité au brief pour chaque catégorie de scoring :
- Brief fidelity (20pts) : 8 sections, 10 centres, 5 nav links max
- UX/UI (15pts) : mb-16 consistency, alternance backgrounds, active states
- Technical (20pts) : TypeScript strict, ESLint 0 warnings, performance
- A11y (15pts) : aria-live, arrow keys, lang="fr", aria-hidden icons
- Creativity (10pts) : timeline RTL, dead code cleanup
- Process (10pts) : CI v4, PR templates, .editorconfig, CONTRIBUTING.md
```

**Résultat** : 12 corrections techniques appliquées.

---

## Ajustements manuels effectués (quoi et pourquoi)

### 1. Suppression de SectionTabs (architecture)

**Quoi** : Supprimé le composant SectionTabs qui wrapped les sections dans des onglets.
**Pourquoi** : Le brief spécifie un layout "scrollable single-page", pas des onglets. Les onglets cachent le contenu et empêchent le scroll naturel.

### 2. Fix du timeline RTL (CSS)

**Quoi** : Remplacé `lg:direction-rtl` (classe invalide) par `lg:order-1`/`lg:order-2`.
**Pourquoi** : La classe `direction-rtl` n'existe pas dans Tailwind. Les étapes paires/impaques devaient alterner gauche/droite — les classes `order` corrigent le layout grid.

### 3. Nettoyage des variables CSS (globals.css)

**Quoi** : Supprimé ~35 variables CSS du scaffold shadcn (`sidebar-*`, `chart-*`, `popover-*`, `card-*`, etc.).
**Pourquoi** : Aucune n'était utilisée par HemoLink. Elles brouillaient la lisibilité du fichier et suggéraient une incomplétude du nettoyage.

### 4. Social links Footer (UX)

**Quoi** : Converti les liens `href="#"` en `<span>` désactivés avec `opacity-50`.
**Pourquoi** : Les liens `#` font défiler vers le haut sans feedback. Un élément visuel désactivé est plus honnête qu'un lien cliquable qui ne mène nulle part.

### 5. GeoProvider pattern (architecture)

**Quoi** : Exposé la géolocalisation via React Context (`GeoProvider`) au lieu d'un global `window.__hemolink_locate`.
**Pourquoi** : Le pattern global fonctionne mais casse l'encapsulation React. Le Context est plus propre, testable, et suit les conventions React.

### 6. Leaflet z-index fix (CSS)

**Quoi** : Ajouté un fix CSS ciblé sur `.leaflet-tile-pane` avec `z-index: 1 !important`.
**Pourquoi** : Framer Motion modifie les z-index du DOM, ce qui cachait les tuiles de la carte. Le diagnostic a nécessité des itérations visuelles que l'IA ne pouvait pas reproduire.

### 7. Sections order correction (brief)

**Quoi** : Réordonné CenterDirectory (C6) avant BloodReserves (C7) et FAQ (C8).
**Pourquoi** : Le brief liste les sections C1→C8 séquentiellement. L'ordre initial avait C7→C8→C6, ce qui violait la séquence attendue.

### 8. Input stricts (sécurité)

**Quoi** : Implémenté 4 couches de validation sur les champs numériques : keydown filter, regex onChange, onPaste sanitize, inputMode.
**Pourquoi** : Un seul filtre ne suffit pas — les utilisateurs peuvent coller du texte, utiliser des caractères spéciaux, ou bypasser le keydown. La défense en profondeur est nécessaire.

---

## Limites rencontrées avec l'outil IA

### 1. Incapacité de vérification visuelle

L'IA ne peut pas voir le résultat rendu. Le conflit z-index Leaflet/Framer Motion, l'alignement du timeline, et l'alternance des backgrounds ont tous nécessité des allers-retours visuels manuels que l'IA ne pouvait pas anticiper.

### 2. Génération de classes CSS invalides

L'IA a proposé `lg:direction-rtl` — une classe qui n'existe ni dans Tailwind v3 ni v4. Ce type d'erreur survient quand l'IA "invente" des classes qui semblent logiques mais ne sont pas implémentées. Correction manuelle requise.

### 3. Accessibilité incomplète par défaut

L'IA génère naturellement des `<div>` pour tout et omet les rôles ARIA. Un audit manuel systématique a révélé l'absence de `role="progressbar"`, `role="radiogroup"`, `aria-checked`, `aria-live`, `aria-hidden` sur les icônes décoratives. L'IA couvre ~70% de l'a11y ; les 30% restants nécessitent un audit humain.

### 4. Conflits de state management

Le bouton de géolocalisation (dans CenterDirectory) et la carte (dynamiquement importée dans CenterMap) communiquent via un state partagé. L'IA a proposé d'abord un global `window.__hemolink_locate` avant de converger vers un React Context — mais le refactoring a nécessité de restructurer l'arbre de composants.

### 5. Données fictives vs production

L'IA ne peut pas fournir de données temps réel (réserves sanguines, statuts d'ouverture). Toutes les données sont structurées correctement (types TypeScript, interfaces) mais les valeurs sont fictives. En production, il faudrait une API backend.

### 6. Performance mobile des animations

Framer Motion `whileInView` sur mobile peut causer des saccades. L'ajout de `prefers-reduced-motion` et l'optimisation iOS (`-webkit-overflow-scrolling: touch`) ont été des ajustements manuels post-itération que l'IA n'avait pas anticipés.
