const { expect, test } = require('@playwright/test');

const baseURL = "http://localhost:3000";
const username = 'peter@abv.bg';
const password = '123456';

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
test('Verify elements are visible after user login', async ( {page} ) => {
    await page.goto(baseURL + "/login");
    await page.fill('input[name="email"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('input[type="submit"]');

    // Check if "All Books" link is visible
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBooksLinkVisible = await allBooksLink.isVisible();
    expect(isAllBooksLinkVisible).toBe(true);

    // Check if "Logout" button is visible
    const logoutButton = await page.$('#logoutBtn');
    const isLogoutButtonVisible = await logoutButton.isVisible();
    expect(isLogoutButtonVisible).toBe(true);

    // Check if "My Books" button is visible
    const myBooksButton = await page.$('a[href="/profile"]');
    const isMyBooksButtonVisible = await myBooksButton.isVisible();
    expect(isMyBooksButtonVisible).toBe(true);

    // Check if "Add Book" button is visible
    const addBookButton = await page.$('a[href="/create"]');
    const isAddBookButtonVisible = await addBookButton.isVisible();
    expect(isAddBookButtonVisible).toBe(true);

    // Check if user email is visible
    const userEmail = await page.$(`span:has-text("Welcome, ${username}")`);
    const isUserEmailVisible = await userEmail.isVisible();
    expect(isUserEmailVisible).toBe(true);
});

// Login testing
test('Login with valid credentials', async ({ page }) => {
    await page.goto(baseURL + "/login");

    // Submit credentials
    await page.fill('input[name="email"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('input[type="submit"]');

    // Check if we were directed to the correct page
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(baseURL + "/catalog");
});

test('Login without credentials', async ({ page }) => {
    await page.goto(baseURL + "/login");

    // Submit no credentials
    await page.click('input[type="submit"]');

    // Listen for alert
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })

    // Check if we were directed to the correct page
    await page.$('a[href="/login"]');
    expect(page.url()).toBe(baseURL + "/login");
});

test('Login with valid email only', async ({ page }) => {
    await page.goto(baseURL + "/login");

    // Submit valid email with no password
    await page.fill('input[name="email"]', username);
    await page.click('input[type="submit"]');

    // Listen for alert
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })

    // Check if we were directed to the correct page
    await page.$('a[href="/login"]');
    expect(page.url()).toBe(baseURL + "/login");
});

test('Login with valid password only', async ({ page }) => {
    await page.goto(baseURL + "/login");

    // Submit valid password with no email
    await page.fill('input[name="password"]', password);
    await page.click('input[type="submit"]');

    // Listen for alert
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    })

    // Check if we were directed to the login page after alert
    await page.$('a[href="/login"]');
    expect(page.url()).toBe(baseURL + "/login");
});


// Register page testing
test('Register with valid credentials', async ({ page }) => {
    await page.goto(baseURL + "/login");

    // Submit valid credentials
    await page.fill('input[name="email"]', 'abz@abv.bg');
    await page.fill('input[name="password"]', 'password');
    await page.fill('input[name="confirm-pass"]', 'password');
    await page.click('input[type="submit"]');

    // Check if we were directed to the correct page
    await page.$('a[href="/login"]');
    expect(page.url()).toBe(baseURL + "/login");
});

test('Register without credentials', async ({ page }) => {
    await page.goto(baseURL + "/login");
});

test('Register without email credentials', async ({ page }) => {
    await page.goto(baseURL + "/login");
});

test('Register password email credentials', async ({ page }) => {
    await page.goto(baseURL + "/login");
});

test('Register without confirming password credentials', async ({ page }) => {
    await page.goto(baseURL + "/login");
});

test('Register with different passwords credentials', async ({ page }) => {
    await page.goto(baseURL + "/login");
});


// "Add Book" page testing



// "All Books" page testing


// "Details" page testing


// "Logout" testing
