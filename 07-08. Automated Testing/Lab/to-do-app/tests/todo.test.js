// npm install -D @playwright/test

const { expect, test } =  require('@playwright/test');

test('Test user can add task', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/');
    await page.fill('#task-input', 'Test task');
    await page.click('#add-task');
    const createdTask = await page.content('.task');
    expect(createdTask).toContain('Test task')
});

// npx playwright test
