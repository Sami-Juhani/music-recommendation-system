import { test, expect } from '@playwright/test';

test.describe('User login test', () => {

  test('Login without login', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    //await page.reload();
    

    // Then fill the form
    await page.fill('input[data-testId="loginEmailInput"]', '');
    await page.fill('input[data-testId="loginPasswordInput"]', '123');

    // Get the "Sign up" button and click it
    const loginButton = page.locator('[data-testid="loginSubmitBtn"]');
    expect(loginButton).not.toBeNull();
    if (loginButton) {
      await loginButton.click();
    }
    expect(page.locator('[data-testid="error"]')).not.toBeNull();
  });

  test('Login without password', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    //await page.reload();
    

    // Then fill the form
    await page.fill('input[data-testId="loginEmailInput"]', 'user1@gmail.com');
    await page.fill('input[data-testId="loginPasswordInput"]', '');

    // Get the "Sign up" button and click it
    const loginButton = page.locator('[data-testid="loginSubmitBtn"]');
    expect(loginButton).not.toBeNull();
    if (loginButton) {
      await loginButton.click();
    }
    expect(page.locator('[data-testid="error"]')).not.toBeNull();
  });

  test('Login with full filed form', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    //await page.reload();
    

    // Then fill the form
    await page.fill('input[data-testId="loginEmailInput"]', 'user1@gmail.com');
    await page.fill('input[data-testId="loginPasswordInput"]', '123');

    // Get the "Sign up" button and click it
    const loginButton = page.locator('[data-testid="loginSubmitBtn"]');
    expect(loginButton).not.toBeNull();
    if (loginButton) {
      await loginButton.click();
    }

    // Check if the user is redirected to the login page
    const mainTitleElement = page.locator('[data-testid="hometitle"]');
    expect(mainTitleElement).not.toBeNull();
  })
});