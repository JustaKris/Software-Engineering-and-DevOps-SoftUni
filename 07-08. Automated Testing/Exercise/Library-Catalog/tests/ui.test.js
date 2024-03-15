const { expect, test } = require('@playwright/test');

const baseURL = "http://localhost:3000"

// Home page tests
test('Verifi "All Books" link is visible', async ( {page} ) => {
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verifi "Login" button is visible', async ( {page} ) => {
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();
    expect(isLoginButtonVisible).toBe(true);
});

test('Verifi "Register" button is visible', async ( {page} ) => {
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    const loginRegister = await page.$('a[href="/register"]');
    const isLoginRegisterVisible = await loginRegister.isVisible();
    expect(isLoginRegisterVisible).toBe(true);
});

// Home page tests after successful login
test('Verifi "All Books" link is visible after user login', async ( {page} ) => {
    await page.goto(baseURL + "/login");
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    // Check if "All Books" link is visible
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBooksLinkVisible = await allBooksLink.isVisible();
    expect(isAllBooksLinkVisible).toBe(true);

    // Check if "Logout" button is visible
    const logoutButton = await page.$('#logoutBtn');
    const isLogoutButtonVisible = await logoutButton.isVisible();
    expect(isLogoutButtonVisible).toBe(true);
});

