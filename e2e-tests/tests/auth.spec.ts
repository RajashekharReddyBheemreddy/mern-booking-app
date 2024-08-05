import { test, expect } from '@playwright/test';
const UI_URL = 'http://localhost:5173/'
test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole('link', {name: 'Sign In'}).click();

  await expect(page.getByRole('heading', {name: 'Sign In'})).toBeVisible();

  await page.locator("[name=email]").fill("testor@testor.com");
  await page.locator("[name=password]").fill("testor");

  await page.getByRole('button', {name:'Login'}).click();

  await expect(page.getByText("Log in successful!")).toBeVisible();
  await page.reload();
  await expect(page.getByRole('link', {name: 'My Bookings'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Hotels'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Sign Out'})).toBeVisible();
});

test('Should allow user to register', async({page}) =>{
  const randomEmail = `test_register_${Math.floor(Math.random() * 9000) + 1000}@gmail.com`;
  await page.goto(UI_URL);

  await page.getByRole('link', {name: 'Sign In'}).click();
  await page.getByRole('link', {name: 'Create An Account'}).click();

  await expect(page.getByRole('heading', {name: 'Create An Account'})).toBeVisible();
  await page.locator('[name=firstName]').fill('test_firstname');
  await page.locator('[name=lastName]').fill('test_lastname');
  await page.locator('[name=email]').fill(randomEmail);
  await page.locator('[name=password]').fill('test12');
  await page.locator('[name=confirmPassword]').fill('test12');

  await page.getByRole('button',{name: 'Create Account'}).click();
  await expect(page.getByText("Registration sucess")).toBeVisible();
  await page.reload();
  await expect(page.getByRole('link', {name: 'My Bookings'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'My Hotels'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Sign Out'})).toBeVisible();
});