import { test, expect } from '@playwright/test';

test('a11y: homepage has no violations', async ({ page }) => {
  await page.goto('/');
  const axePath = require.resolve('axe-core/axe.min.js');
  await page.addScriptTag({ path: axePath });
  const result = await page.evaluate(async () => (await (window as any).axe.run()).violations);
  if ((result as any[]).length > 0) {
    console.log('Axe violations:', JSON.stringify(result, null, 2));
  }
  expect((result as any[]).length).toBe(0);
});
