const { test, expect } = require('@playwright/test');

test('Localization Test', async ({ page }) => {
  let errorOccurred = false;
  // Navigate to the page or interact with your application to load the HTML content
  await page.goto('http://localhost:3000/'); // Replace with your website URL

  // Extract the initial text content of each specific part of the main section
  const initialHeader = await extractTextContent(page, 'h1.text-3xl');
  const initialEmailLabel = await extractTextContent(page, 'label[for="email"]');
  const initialEmailPlaceholder = await extractPlaceholderContent(page, 'input[name="email"]');
  const initialPasswordLabel = await extractTextContent(page, 'label[for="password"]');
  const initialPasswordPlaceholder = await extractPlaceholderContent(page, 'input[name="password"]');
  const initialLoginButton = await extractTextContent(page, 'button[type="submit"]');
  const initialForgetPassword = await extractTextContent(page, 'a[href="/"]');
  const initialRegisterLink = await extractTextContent(page, 'a[href="/register"]');

  // Click the button to open the language selection popup menu
  await page.click('button[aria-haspopup="listbox"]');

  // Wait for the language selection popup menu to appear
  await page.waitForSelector('ul[role="listbox"]');

  // Get all language options
  const languageOptions = await page.$$('ul[role="listbox"] li');


  // Iterate through each language option
  for (let i = 1; i < languageOptions.length; i++) {
    try {
      // Click the button to open the language selection popup menu
      await page.click('button[aria-haspopup="listbox"]');

      // Wait for the language selection popup menu to appear
      await page.waitForSelector('ul[role="listbox"]');

      // Get all language options
      const languageOptions = await page.$$('ul[role="listbox"] li');
      // Click on the language option
      await languageOptions[i].click();

      // Wait for language switch
      await page.waitForTimeout(1000); // Adjust the timeout as needed

      // Extract the text content after language switch for each specific part of the main section
      const newHeader = await extractTextContent(page, 'h1.text-3xl');
      const newEmailLabel = await extractTextContent(page, 'label[for="email"]');
      const newEmailPlaceholder = await extractPlaceholderContent(page, 'input[name="email"]');
      const newPasswordLabel = await extractTextContent(page, 'label[for="password"]');
      const newPasswordPlaceholder = await extractPlaceholderContent(page, 'input[name="password"]');
      const newLoginButton = await extractTextContent(page, 'button[type="submit"]');
      const newForgetPassword = await extractTextContent(page, 'a[href="/"]');
      const newRegisterLink = await extractTextContent(page, 'a[href="/register"]');

      // Assert that the text content of each specific part has changed after language switch
      expect(newHeader).not.toEqual(initialHeader);
      expect(newEmailLabel).not.toEqual(initialEmailLabel);
      expect(newEmailPlaceholder).not.toEqual(initialEmailPlaceholder);
      expect(newPasswordLabel).not.toEqual(initialPasswordLabel);
      expect(newPasswordPlaceholder).not.toEqual(initialPasswordPlaceholder);
      expect(newLoginButton).not.toEqual(initialLoginButton);
      expect(newForgetPassword).not.toEqual(initialForgetPassword);
      expect(newRegisterLink).not.toEqual(initialRegisterLink);
    } catch (error) {
      console.error('An error occurred:', error.message);
      errorOccurred = true;
    }
  }
  if (errorOccurred) {
    throw new Error('Test failed due to errors during language switch.');
  }
});

async function extractTextContent(page, selector) {
  // Extract text content from the specified selector
  const textContent = await page.textContent(selector);
  console.log('Text Content:', textContent);
  return textContent;
}

async function extractPlaceholderContent(page, selector) {
  // Extract placeholder content from the specified input selector
  const placeholder = await page.getAttribute(selector, 'placeholder');
  console.log('Placeholder Content:', placeholder);
  return placeholder;
}

