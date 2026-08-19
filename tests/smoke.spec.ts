import { test, expect } from '@playwright/test';

test.describe('HemoLink', () => {
  test('home loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/hemolink/i);
  });

  test('hero section is visible with key content', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Chaque')).toBeVisible();
    await expect(page.locator('text=Goutte')).toBeVisible();
    await expect(page.locator('text=Compte.')).toBeVisible();
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
    await expect(page.locator('text=1 Don')).toBeVisible();
    await expect(page.locator('text=450ml')).toBeVisible();
    await expect(page.locator('text=24/7')).toBeVisible();
    await expect(page.locator('text=15 Min')).toBeVisible();
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

    // Click on FAQ tab
    const faqTab = page.locator('[role="tab"]:has-text("FAQ")');
    await faqTab.click();
    await expect(faqTab).toHaveAttribute('aria-selected', 'true');
  });

  test('eligibility form renders and validates', async ({ page }) => {
    await page.goto('/');
    // Navigate to test tab
    await page.locator('[role="tab"]:has-text("Test d\'éligibilité")').click();
    await page.waitForTimeout(500);

    // Submit empty form — should show errors
    const submitBtn = page.locator('button:has-text("Vérifier mon éligibilité")');
    await submitBtn.click();

    // Check for validation errors
    await expect(page.locator('text=Veuillez sélectionner votre genre')).toBeVisible();
  });

  test('footer contains key elements', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('text=HemoLink')).toBeVisible();
    await expect(page.locator('text=Appeler le 117')).toBeVisible();
  });
});
