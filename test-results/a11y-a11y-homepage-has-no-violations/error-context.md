# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> a11y: homepage has no violations
- Location: tests/a11y.spec.ts:3:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:3000/
Call log:
  - navigating to "http://127.0.0.1:3000/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('a11y: homepage has no violations', async ({ page }) => {
> 4  |   await page.goto('/');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://127.0.0.1:3000/
  5  |   const axePath = require.resolve('axe-core/axe.min.js');
  6  |   await page.addScriptTag({ path: axePath });
  7  |   const result = await page.evaluate(async () => (await (window as any).axe.run()).violations);
  8  |   if ((result as any[]).length > 0) {
  9  |     console.log('Axe violations:', JSON.stringify(result, null, 2));
  10 |   }
  11 |   expect((result as any[]).length).toBe(0);
  12 | });
  13 | 
```