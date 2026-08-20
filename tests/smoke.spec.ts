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
    await expect(nav.locator('text=Le don')).toBeVisible();
  });

  test('all major sections are rendered', async ({ page }) => {
    await page.goto('/');
    const sections = ['pourquoi', 'eligibilite', 'test', 'deroulement', 'reserves', 'faq', 'centres'];
    for (const id of sections) {
      const el = page.locator(`#${id}`);
      await expect(el).toBeAttached({ timeout: 5000 });
    }
  });

  test('eligibility form renders and validates', async ({ page }) => {
    await page.goto('/');
    await page.locator('#test').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const form = page.locator('#test form');
    expect(await form.count()).toBe(1);

    await expect(page.locator('#age')).toBeAttached();
    await expect(page.locator('#birthYear')).toBeAttached();
    await expect(page.locator('#weight')).toBeAttached();
    await expect(page.locator('#lastDonation')).toBeAttached();

    const radios = page.locator('#test [role="radio"]');
    expect(await radios.count()).toBeGreaterThanOrEqual(2);
  });

  test('footer contains key elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.getByRole('contentinfo').getByText('HemoLink', { exact: true })).toBeVisible();
    await expect(page.locator('text=Appeler le 117')).toBeVisible();
  });
});
