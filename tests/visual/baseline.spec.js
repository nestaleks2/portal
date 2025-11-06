import { test, expect } from '@playwright/test';

// Baseline visual tests for all pages
test.describe('Visual Baseline Tests', () => {
  
  test('Homepage - Desktop', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage-desktop.png');
  });

  test('Models Page - Desktop', async ({ page }) => {
    await page.goto('/models');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('models-desktop.png');
  });

  test('Model Profile Page - Desktop', async ({ page }) => {
    await page.goto('/model/1');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('model-profile-desktop.png');
  });

  test('Dashboard Creator - Desktop', async ({ page }) => {
    await page.goto('/dashboard/creator');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-creator-desktop.png');
  });

  test('Dashboard Viewer - Desktop', async ({ page }) => {
    await page.goto('/dashboard/viewer');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-viewer-desktop.png');
  });

  test('Messages Page - Desktop', async ({ page }) => {
    await page.goto('/messages');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('messages-desktop.png');
  });

  test('Premium Page - Desktop', async ({ page }) => {
    await page.goto('/premium');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('premium-desktop.png');
  });

  test('Become Creator Page - Desktop', async ({ page }) => {
    await page.goto('/become-creator');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('become-creator-desktop.png');
  });

  test('Login Page - Desktop', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('login-desktop.png');
  });

  test('Register Page - Desktop', async ({ page }) => {
    await page.goto('/register');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('register-desktop.png');
  });

});

test.describe('Visual Baseline Tests - Mobile', () => {
  
  test.use({ 
    viewport: { width: 375, height: 667 } 
  });

  test('Homepage - Mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage-mobile.png');
  });

  test('Models Page - Mobile', async ({ page }) => {
    await page.goto('/models');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('models-mobile.png');
  });

  test('Model Profile Page - Mobile', async ({ page }) => {
    await page.goto('/model/1');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('model-profile-mobile.png');
  });

  test('Dashboard Creator - Mobile', async ({ page }) => {
    await page.goto('/dashboard/creator');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('dashboard-creator-mobile.png');
  });

  test('Messages Page - Mobile', async ({ page }) => {
    await page.goto('/messages');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('messages-mobile.png');
  });

});

test.describe('Component Visual Tests', () => {
  
  test('Header Component', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test header on desktop
    await expect(page.locator('header')).toHaveScreenshot('header-desktop.png');
    
    // Test mobile header by resizing
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('header')).toHaveScreenshot('header-mobile.png');
  });

  test('Footer Component', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('footer')).toHaveScreenshot('footer-desktop.png');
  });

  test('Models Grid Component', async ({ page }) => {
    await page.goto('/models');
    await page.waitForLoadState('networkidle');
    
    const modelsGrid = page.locator('.models-grid__container');
    await expect(modelsGrid).toHaveScreenshot('models-grid-desktop.png');
  });

});