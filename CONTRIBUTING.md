# Contribuer à HemoLink

Merci de votre intérêt pour contribuer à HemoLink ! Ce guide vous explique comment démarrer.

## Prérequis

- Node.js 20+
- npm

## Installation

```bash
git clone git@github.com:ahoussinoupacome123-lang/FIGMA_TO_CODE_CHALLENGE.git
cd FIGMA_TO_CODE_CHALLENGE
npm install
```

## Développement

```bash
npm run dev
# → http://localhost:3000
```

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run lint` | Vérification ESLint |
| `npm run test:ci` | Tests unitaires (Vitest) |
| `npm run test:e2e` | Tests end-to-end (Playwright) |
| `npm run test:a11y` | Tests accessibilité (axe-core) |
| `npm run test:lighthouse` | Audit Lighthouse CI |

## Convention de commits

Format : `type(scope): description`

Types : `feat`, `fix`, `perf`, `docs`, `chore`, `ci`, `refactor`, `test`, `style`

Exemples :
- `feat(eligibility): add cross-validation age/birthYear`
- `fix(map): correct marker popup z-index`
- `docs(readme): update architecture diagram`

## Processus de contribution

1. Créer une branche depuis `main` : `git checkout -b feat/mon-feat`
2. Faire des commits atomiques avec le bon format
3. Pousser et ouvrir une Pull Request
4. Remplir le template de PR avec les vérifications cochées

## Qualité

Avant de soumettre une PR, assurez-vous que :

- `npm run build` passe sans erreur
- `npm run lint` passe sans warning
- `npm run test:ci` passe
- `npm run test:e2e` passe
- `npm run test:a11y` passe
- Testé sur mobile (390px) et desktop (1440px)

## Structure du projet

```
src/
├── app/                    # Next.js App Router
├── components/hemolink/    # Composants React
├── data/                   # Données statiques (centres, FAQ, réserves)
└── lib/                    # Utilitaires, hooks, providers
```

## Licence

Ce projet est sous licence MIT. En contribuant, vous acceptez que vos contributions soient sous la même licence.
