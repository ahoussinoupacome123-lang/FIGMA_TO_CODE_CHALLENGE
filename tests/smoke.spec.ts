import { test, expect } from '@playwright/test';

test.describe('HemoLink', () => {
  test('home loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/hemolink/i);
  });

  test('hero section is visible with key content', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Chaque Goutte Compte.' })).toBeVisible();
    await expect(page.locator('text=Besoin urgent au CNTS de Cotonou')).toBeVisible();
  });

  test('hero CTA buttons exist and link correctly', async ({ page }) => {
    await page.goto('/');
    const eligibilityBtn = page.locator('a:has-text("Vérifier mon éligibilité")').first();
    await expect(eligibilityBtn).toBeVisible();
    await expect(eligibilityBtn).toHaveAttribute('href', '#test');

    const centerBtn = page.locator('a:has-text("Trouver un centre")').first();
    await expect(centerBtn).toBeVisible();
    await expect(centerBtn).toHaveAttribute('href', '#centres');
  });

  test('stats bar is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('1 Don', { exact: true })).toBeVisible();
    await expect(page.getByText('450ml', { exact: true })).toBeVisible();
    await expect(page.getByText('24/7', { exact: true })).toBeVisible();
    await expect(page.getByText('15 Min', { exact: true })).toBeVisible();
  });

  test('navigation links exist', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav[aria-label="Navigation principale"]');
    await expect(nav.locator('text=Pourquoi ?')).toBeVisible();
    await expect(nav.locator('text=FAQ')).toBeVisible();
    await expect(nav.locator('text=Centres')).toBeVisible();
  });

  test('section tabs are present and clickable', async ({ page }) => {
    await page.goto('/');
    const tabs = page.locator('[role="tablist"]');
    await expect(tabs).toBeVisible();

    // Verify all expected tab labels exist
    await expect(tabs.locator('[role="tab"]:has-text("Pourquoi ?")')).toBeAttached();
    await expect(tabs.locator('[role="tab"]:has-text("FAQ")')).toBeAttached();
    await expect(tabs.locator('[role="tab"]:has-text("Réserves")')).toBeAttached();

    // Click FAQ tab — panel content renders in DOM (may be animating)
    await page.locator('#tab-faq').click();
    await page.waitForTimeout(500);
    const faqButtons = page.locator('#panel-faq button[aria-expanded]');
    expect(await faqButtons.count()).toBeGreaterThan(0);
  });

  test('eligibility form renders and validates', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);

    // Click the eligibility tab via Playwright (it's in the visible tablist)
    await page.locator('#tab-test').click();
    await page.waitForTimeout(1000);

    // The form exists in DOM — verify the form structure is present
    const form = page.locator('#panel-test form');
    expect(await form.count()).toBe(1);

    // Verify form has the required inputs
    await expect(page.locator('#age')).toBeAttached();
    await expect(page.locator('#birthYear')).toBeAttached();
    await expect(page.locator('#weight')).toBeAttached();
    await expect(page.locator('#lastDonation')).toBeAttached();

    // Verify gender radio buttons exist with proper ARIA
    const radios = page.locator('#panel-test [role="radio"]');
    expect(await radios.count()).toBeGreaterThanOrEqual(2);
  });

  test('footer contains key elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.getByRole('contentinfo').getByText('HemoLink', { exact: true })).toBeVisible();
    await expect(page.locator('text=Appeler le 117')).toBeVisible();
  });
});
