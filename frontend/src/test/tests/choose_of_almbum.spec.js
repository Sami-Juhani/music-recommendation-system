const { test, expect } = require('@playwright/test');

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

test('Main Content Localization Test', async ({ page }) => {
    await page.goto('http://localhost:3000/'); // Replace with your website URL

    // Fill in the email and password fields
    await page.fill('#email', email);
    await page.fill('#password', password);

    // Click the submit button
    await page.click('button[type="submit"]');

    // Wait for navigation or for the main context to appear
    await page.waitForNavigation(); // Adjust this if necessary

    // Iterate over each playlist data-index value
    const playlistDataIndexes = ["4khPeG4MVX8uIU4rSHHCy5", "5AZ9iWBfO5Sib50zsEZFDA", "3c3aKUMLvIpoaWxcsiulsL", "37i9dQZF1DZ06evO1XTVWU"];

    // Click the button to open the language selection popup menu
    await page.click('button[aria-haspopup="listbox"]');

    // Wait for the language selection popup menu to appear
    await page.waitForSelector('ul[role="listbox"]');

    // Get all language options
    let languageOptions = await page.$$('ul[role="listbox"] li');

    await page.click('button[aria-haspopup="listbox"]');

    await page.waitForTimeout(5000);
    
    for (let i = 1; i < languageOptions.length; i++) {
        await page.click('button[aria-haspopup="listbox"]');

        // Wait for the language selection popup menu to appear
        await page.waitForSelector('ul[role="listbox"]');

        // Get all language options again after navigation
        languageOptions = await page.$$('ul[role="listbox"] li');
        
        // Click on the language option
        await languageOptions[i].click();

        // Wait for language switch
        await page.waitForTimeout(1000); // Adjust the timeout as needed
        for (const dataIndex of playlistDataIndexes) {
            // Get the initial main context title
            const initialMainContextTitle = await page.textContent('.main-content .title');

            // Click on the playlist with the current data-index value
            await page.click(`[data-index="${dataIndex}"]`);

            // Wait for the main context title to update
            await page.waitForSelector('.main-content .title', { state: 'visible' });

            // Get the updated main context title
            const updatedMainContextTitle = await page.textContent('.main-content .title');

            // Verify that the main context title has changed
            expect(initialMainContextTitle).not.toEqual(updatedMainContextTitle);
        }
    }
});
