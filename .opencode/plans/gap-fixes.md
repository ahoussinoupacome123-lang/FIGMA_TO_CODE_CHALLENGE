# Gap Fixes Plan — All Items

## 1. FAQ.tsx — Radio group arrow keys + empty state
- Import `useCallback` from React
- Wrap category buttons in IIFE to compute `categoryIds` array
- Add `handleCategoryKeys(e, index)` function: ArrowRight/Down → next, ArrowLeft/Up → prev, Home → 0, End → last
- Add `tabIndex={activeCategory === id ? 0 : -1}` on each radio button
- Add `onKeyDown` handler to each button
- Add empty state: `{filtered.length === 0 && <div>Aucune question dans cette catégorie</div>}` before AnimatePresence

## 2. EligibilityTest.tsx — Radio arrow keys + aria-invalid + gender aria-describedby
- Add `onKeyDown` handler for gender radiogroup: ArrowLeft/Right toggles between homme/femme
- Add `tabIndex` roving on gender buttons
- Add `id="gender-error"` to gender error `<p>` tag
- Add `aria-describedby={errors.gender ? 'gender-error' : undefined}` to the gender radiogroup div
- Add `aria-invalid={!!errors.age}` to age input
- Add `aria-invalid={!!errors.birthYear}` to birthYear input
- Add `aria-invalid={!!errors.weight}` to weight input

## 3. Navigation.tsx — Mobile menu focus trap
- Add refs for menu container and hamburger button
- On menu open: focus first nav link after a tick
- Add `onKeyDown` to the dialog div: trap Tab/Shift+Tab within focusable elements
- On close: focus the hamburger button ref

## 4. New file: src/components/ErrorBoundary.tsx
- React class component extending `React.Component<{children}, {error: Error | null}>`
- `componentDidCatch(error, info)` sets state
- `static getDerivedStateFromError(error)` returns `{error}`
- Render: if error, show card with icon, "Une erreur est survenue", error message, "Réessayer" button calling `this.setState({error: null})`
- Else: render `this.props.children`

## 5. layout.tsx — Wrap with ErrorBoundary
- Import ErrorBoundary
- Wrap `{children}` (inside ToastProvider/GeoProvider) with `<ErrorBoundary>{children}</ErrorBoundary>`

## 6. CenterDirectory.tsx — clearFilters bug + dead code + geo toast
- In `clearFilters()`: add `setQuickFilter('all')`
- In `handleLocate()`: remove dead setInterval, keep just `locate()`
- Add a useEffect watching `geoStatus`: when it changes to `denied` from `requesting`, show toast (but only if in list-only view mode, since map view already has GeoReceiver)

## 7. CenterMap.tsx — Empty state
- When `filteredCenters.length === 0`, render an overlay div with MapPin icon + "Aucun centre à afficher sur la carte" text, centered over the map

## Verification
- npm run lint (0 errors)
- npm run build (passes)
- npx vitest run (5/5)
- npx playwright test (15/15: 8 smoke + 7 a11y)
