import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('home page has no axe-core violations', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test('FAQ accordion buttons have correct ARIA attributes', async ({ page }) => {
    await page.goto('/');
    await page.locator('#faq').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const faqButtons = page.locator('#faq button[aria-expanded]');
    const count = await faqButtons.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const btn = faqButtons.nth(i);
      const expanded = await btn.getAttribute('aria-expanded');
      expect(expanded).not.toBeNull();
      const controls = await btn.getAttribute('aria-controls');
      expect(controls).toBeTruthy();
    }
  });

  test('eligibility form has proper ARIA radiogroup', async ({ page }) => {
    await page.goto('/');
    await page.locator('#test').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const radiogroup = page.locator('[role="radiogroup"]');
    const count = await radiogroup.count();
    expect(count).toBeGreaterThanOrEqual(1);

    const radioButtons = page.locator('[role="radio"]');
    const radioCount = await radioButtons.count();
    expect(radioCount).toBeGreaterThanOrEqual(2);

    for (let i = 0; i < radioCount; i++) {
      const hasChecked = await radioButtons.nth(i).getAttribute('aria-checked');
      expect(hasChecked).not.toBeNull();
    }
  });

  test('skip-to-content link exists and works', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toHaveCount(1);
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
  });

  test('blood reserves progressbars have ARIA attributes', async ({ page }) => {
    await page.goto('/');
    await page.locator('#reserves').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const progressbars = page.locator('[role="progressbar"]');
    const count = await progressbars.count();
    expect(count).toBeGreaterThanOrEqual(8);

    for (let i = 0; i < count; i++) {
      const bar = progressbars.nth(i);
      await expect(bar).toHaveAttribute('aria-valuemin', '0');
      await expect(bar).toHaveAttribute('aria-valuemax', '100');
      const valuenow = await bar.getAttribute('aria-valuenow');
      expect(valuenow).not.toBeNull();
    }
  });

  test('all sections have id attributes for navigation', async ({ page }) => {
    await page.goto('/');
    const requiredIds = ['pourquoi', 'eligibilite', 'test', 'deroulement', 'reserves', 'faq', 'centres'];
    for (const id of requiredIds) {
      const el = page.locator(`#${id}`);
      await expect(el).toBeAttached({ timeout: 5000 });
    }
  });

  test('medical disclaimer is present', async ({ page }) => {
    await page.goto('/');
    const disclaimer = page.locator('footer [role="note"]');
    await expect(disclaimer).toBeAttached();
    await expect(disclaimer).toContainText('avis médical professionnel');
  });
});
