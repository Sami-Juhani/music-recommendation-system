import { test, expect } from '@playwright/test';

test.describe('New user registration test', () => {

  // test.beforeAll(async ({ page }) => {
  //   await page.goto('http://localhost:3000/');
  //   // Check if the "Sign up" link is present
  //   const signUpLink = page.locator('a[href="/register"]');
  //   expect(signUpLink).not.toBeNull();

  //   // Click the "Sign up" link if it is present
  //   if (signUpLink) {
  //     await signUpLink.click();
  //   }
  //});

  test('Registration without email', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    //await page.reload();
    
    // Check if the "Sign up" link is present
    const signUpLink = page.locator('a[href="/register"]');
    expect(signUpLink).not.toBeNull();

    // Click the "Sign up" link if it is present
    if (signUpLink) {
      await signUpLink.click();
    }
    //const random = Math.floor(Math.random() * 1000000);

    // Then fill the form
    //await page.fill('input[placeholder="Email"]', `test${random}@gmail.com`);
    await page.fill('input[placeholder="First name"]', 'first_name');
    await page.fill('input[placeholder="Last name"]', 'last_name');
    await page.fill('input[placeholder="Password"]', '123');

    // Get the "Sign up" button and click it
    const signUpButton = page.locator('[data-testid="reg-button"]');
    expect(signUpButton).not.toBeNull();
    if (signUpButton) {
      await signUpButton.click();
    }
    expect(page.locator('[data-testid="error"]')).not.toBeNull();
  });

  test('Registration without first name', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    //await page.reload();
    
    // Check if the "Sign up" link is present
    const signUpLink = page.locator('a[href="/register"]');
    expect(signUpLink).not.toBeNull();

    // Click the "Sign up" link if it is present
    if (signUpLink) {
      await signUpLink.click();
    }
    const random = Math.floor(Math.random() * 1000000);

    // Then fill the form
    await page.fill('input[placeholder="Email"]', `test${random}@gmail.com`);
    //await page.fill('input[placeholder="First name"]', 'first_name');
    await page.fill('input[placeholder="Last name"]', 'last_name');
    await page.fill('input[placeholder="Password"]', '123');

    // Get the "Sign up" button and click it
    const signUpButton = page.locator('[data-testid="reg-button"]');
    expect(signUpButton).not.toBeNull();
    if (signUpButton) {
      await signUpButton.click();
    }
    expect(page.locator('[data-testid="error"]')).not.toBeNull();
  });

  test('Registration without last name', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    //await page.reload();
    
    // Check if the "Sign up" link is present
    const signUpLink = page.locator('a[href="/register"]');
    expect(signUpLink).not.toBeNull();

    // Click the "Sign up" link if it is present
    if (signUpLink) {
      await signUpLink.click();
    }
    const random = Math.floor(Math.random() * 1000000);

    // Then fill the form
    await page.fill('input[placeholder="Email"]', `test${random}@gmail.com`);
    await page.fill('input[placeholder="First name"]', 'first_name');
    //await page.fill('input[placeholder="Last name"]', 'last_name');
    await page.fill('input[placeholder="Password"]', '123');

    // Get the "Sign up" button and click it
    const signUpButton = page.locator('[data-testid="reg-button"]');
    expect(signUpButton).not.toBeNull();
    if (signUpButton) {
      await signUpButton.click();
    }
    expect(page.locator('[data-testid="error"]')).not.toBeNull();
  });

  test('Registration without password', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    //await page.reload();
    
    // Check if the "Sign up" link is present
    const signUpLink = page.locator('a[href="/register"]');
    expect(signUpLink).not.toBeNull();

    // Click the "Sign up" link if it is present
    if (signUpLink) {
      await signUpLink.click();
    }
    const random = Math.floor(Math.random() * 1000000);

    // Then fill the form
    await page.fill('input[placeholder="Email"]', `test${random}@gmail.com`);
    await page.fill('input[placeholder="First name"]', 'first_name');
    //await page.fill('input[placeholder="Last name"]', 'last_name');
    await page.fill('input[placeholder="Password"]', '123');

    // Get the "Sign up" button and click it
    const signUpButton = page.locator('[data-testid="reg-button"]');
    expect(signUpButton).not.toBeNull();
    if (signUpButton) {
      await signUpButton.click();
    }
    expect(page.locator('[data-testid="error"]')).not.toBeNull();
  });

  test('Registration with full filed form', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    //await page.reload();
    
    // Check if the "Sign up" link is present
    const signUpLink = page.locator('a[href="/register"]');
    expect(signUpLink).not.toBeNull();

    // Click the "Sign up" link if it is present
    if (signUpLink) {
      await signUpLink.click();
    }
    const random = Math.floor(Math.random() * 1000000);

    // Then fill the form
    await page.fill('input[placeholder="Email"]', `test${random}@gmail.com`);
    await page.fill('input[placeholder="First name"]', 'first_name');
    await page.fill('input[placeholder="Last name"]', 'last_name');
    await page.fill('input[placeholder="Password"]', '123');

    // Get the "Sign up" button and click it
    const signUpButton = page.locator('[data-testid="reg-button"]');
    expect(signUpButton).not.toBeNull();
    if (signUpButton) {
      await signUpButton.click();
    }

    // Check if the user is redirected to the login page
    const loginTitleElement = page.locator('[data-testid="login-title"]');
    expect(loginTitleElement).not.toBeNull();
  })
});