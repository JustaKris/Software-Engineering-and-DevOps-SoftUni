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
    await page.goto(baseURL + "/register");

    // Submit valid credentials
    await page.fill('input[name="email"]', 'k.s.bonev@gmail.com');
    await page.fill('input[name="password"]', 'password');
    await page.fill('input[name="confirm-pass"]', 'password');
    await page.click('input[type="submit"]');

    // Check if we were directed to the catalog page upon successful registration
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(baseURL + "/catalog");
});

test('Register without credentials', async ({ page }) => {
    await page.goto(baseURL + "/register");

    // Submit no credentials
    await page.click('input[type="submit"]');

    // Check if we were directed back to the register page
    await page.$('a[href="/register"]');
    expect(page.url()).toBe(baseURL + "/register");
});

test('Register without email', async ({ page }) => {
    await page.goto(baseURL + "/register");

    // Submit passwords only
    await page.fill('input[name="password"]', 'password');
    await page.fill('input[name="confirm-pass"]', 'password');
    await page.click('input[type="submit"]');

    // Check if we were directed back to the register page
    await page.$('a[href="/register"]');
    expect(page.url()).toBe(baseURL + "/register");
});

test('Register password email credentials', async ({ page }) => {
    await page.goto(baseURL + "/register");
});

test('Register without confirming password credentials', async ({ page }) => {
    await page.goto(baseURL + "/register");

    // Submit valid credentials with no confirm password
    await page.fill('input[name="email"]', 'k.s.bonev@gmail.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('input[type="submit"]');

    // Check if we were directed back to the register page
    await page.$('a[href="/register"]');
    expect(page.url()).toBe(baseURL + "/register");
});

test('Register with different passwords credentials', async ({ page }) => {
    await page.goto(baseURL + "/register");

    // Submit different passwords with valid email
    await page.fill('input[name="email"]', 'k.s.bonev@gmail.com');
    await page.fill('input[name="password"]', 'password');
    await page.fill('input[name="confirm-pass"]', 'drowssap');
    await page.click('input[type="submit"]');

    // Check if we were directed back to the register page
    await page.$('a[href="/register"]');
    expect(page.url()).toBe(baseURL + "/register");
});

// "Add Book" page testing
// test('Login and test no books message', async ({ page }) => {
//     await page.goto(baseURL + "/login");
    
//     // Login to valid account
//     await page.fill('input[name="email"]', username);
//     await page.fill('input[name="password"]', password);
//     await Promise.all([
//         page.click('input[type="submit"]'),
//         page.waitForURL(baseURL + '/catalog')
//     ]);

//     // Select "All Books" page
//     await page.waitForSelector('.dashboard');

//     // Confirm that book list is not empty
//     const noBooksMessage = await page.textContent('.no-books');
//     expect(noBooksMessage).toBe('No books in database!');
// });

test('"Add Book" with correct data', async ({ page }) => {
    await page.goto(baseURL + "/login");
    
    // Login to valid account
    await page.fill('input[name="email"]', username);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(baseURL + '/catalog')
    ]);
    
    // Go to "Add Book" page
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    // Fill book details
    await page.fill('#title', 'The Lord of the Rings');
    await page.fill('#description', 'Best book ever!!!!');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');

    // Submit book
    await page.click('#create-form input[type="submit"]');

    // Check if we get rerouted back to the catalog page
    await page.waitForURL(baseURL + '/catalog');
    expect(page.url()).toBe(baseURL + '/catalog');
});

test('"Add Book" without title', async ({ page }) => {
    await page.goto(baseURL + "/login");
    
    // Login to valid account
    await page.fill('input[name="email"]', username);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(baseURL + '/catalog')
    ]);
    
    // Go to "Add Book" page
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    // Fill book details with no title
    await page.fill('#description', 'Best book ever!!!!');
    await page.fill('#image', 'https://example.com/book-image.jpg');
    await page.selectOption('#type', 'Fiction');
    
    // Submit book
    await page.click('#create-form input[type="submit"]');

    // Check for alert
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    // Check if we get rerouted back to the "Add Book" page
    await page.$('a[href="/create"]');
    expect(page.url()).toBe(baseURL + '/create');
});

test('Login and verify all books are displayed', async ({ page }) => {
    await page.goto(baseURL + "/login");
    
    // Login to valid account
    await page.fill('input[name="email"]', username);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(baseURL + '/catalog')
    ]);

    // Select "All Books" page
    await page.waitForSelector('.dashboard');

    // Confirm that book list is not empty
    const bookElements = await page.$$('.other-books-list li');
    expect(bookElements.length).toBeGreaterThan(0);
});

// "Details" page testing
test('Login and navigate to Details page', async ({ page }) => {
    await page.goto(baseURL + "/login");
    
    // Login to valid account
    await page.fill('input[name="email"]', username);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(baseURL + '/catalog')
    ]);

    // Find first book, click it and wait for the page to load
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    // Confirm that book page has been selected
    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('The Lord of the Rings');
});

test('Verify guest user sees Details Button and that it works correctly', async ({ page }) => {
    await page.goto(baseURL);

    // Find first book, click it and wait for the page to load
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    // Confirm that book page has been selected and information is displayed correctly
    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('The Lord of the Rings');
});

test('Verify that Edit and Delete buttons are visible for creator', async ({ page }) => {
    await page.goto(baseURL + "/login");
    
    // Login to valid account
    await page.fill('input[name="email"]', username);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(baseURL + '/catalog')
    ]);

    // Find first book, click Details it and wait for the page to load
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');

    // Check if Edit Button is visible
    const editButton = await page.$(`a:has-text("Edit")`);
    const isEditButtonVisible = await editButton.isVisible();
    expect(isEditButtonVisible).toBe(true);

    // Check if Delete Button is visible
    const deleteButton = await page.$(`a:has-text("Delete")`);
    const isDeleteButtonVisible = await deleteButton.isVisible();
    expect(isDeleteButtonVisible).toBe(true);
});

test('Verify that Edit and Delete buttons are not visible to non-creators', async ({ page }) => {

});

test('Verify Like Button is not visible to creator', async ({ page }) => {
    
});

test('Verify Like Button is visible to non-creators', async ({ page }) => {
    
});

// "Logout" testing
test('Verify redirection of Logout link after user login', async ({ page }) => {
    await page.goto(baseURL + '/login');

    // Login to valid account
    await page.fill('input[name="email"]', username);
    await page.fill('input[name="password"]', password);
    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL(baseURL + '/catalog')
    ]);

    const logoutLink = await page.$('a[href="javascript:void(0)"]');
    await logoutLink.click();

    // Confirm we have been redirected to catalog page
    const redirectedURL = page.url();
    expect(redirectedURL).toBe(baseURL + '/catalog');
});