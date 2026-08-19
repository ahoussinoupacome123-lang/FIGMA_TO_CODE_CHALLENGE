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
    // Click FAQ tab to render the panel
    await page.locator('[role="tab"]:has-text("FAQ")').click();
    await page.waitForTimeout(500);

    // FAQ accordion buttons are inside #panel-faq
    const faqPanel = page.locator('#panel-faq');
    const faqButtons = faqPanel.locator('button[aria-expanded]');
    const count = await faqButtons.count();
    expect(count).toBeGreaterThan(0);

    // Each button should have aria-expanded and aria-controls
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
    // Navigate to eligibility test tab
    await page.locator('[role="tab"]:has-text("Test d\'éligibilité")').click();
    await page.waitForTimeout(500);

    // Check the radiogroup exists in the DOM
    const radiogroup = page.locator('[role="radiogroup"]');
    const count = await radiogroup.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Check radio buttons have aria-checked
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
    await page.locator('[role="tab"]:has-text("Réserves")').click();
    await page.waitForTimeout(500);

    const progressbars = page.locator('[role="progressbar"]');
    const count = await progressbars.count();
    expect(count).toBeGreaterThanOrEqual(8); // 8 blood groups

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
    const requiredIds = ['pourquoi', 'eligibilite', 'test', 'deroulement', 'preparation', 'reserves', 'faq', 'centres'];
    for (const id of requiredIds) {
      const el = page.locator(`#${id}`);
      await expect(el).toBeAttached({ timeout: 5000 });
    }
  });

  test('medical disclaimer is present', async ({ page }) => {
    await page.goto('/');
    // Check footer contains medical disclaimer
    const disclaimer = page.locator('footer [role="note"]');
    await expect(disclaimer).toBeAttached();
    await expect(disclaimer).toContainText('avis médical professionnel');
  });
});
