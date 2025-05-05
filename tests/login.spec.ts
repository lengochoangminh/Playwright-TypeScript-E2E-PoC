import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { allure } from "allure-playwright";

test.describe('Login Page', () => {

    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        
        await allure.step("Navigate to Login form", async () => {
            await loginPage.navigateToLoginPage();
        });

    });

    test('Verify to show the error message if Email or Password is blank', async ({ page }) => {

        await allure.step("Leave the email or password is blank", async () => {
            await loginPage.txtEmail.click();
            await loginPage.txtPassword.click();
            await loginPage.cbRememberMe.click();
        });
        
        await allure.step("Validate the error messages displayed", async () => {
            await expect(loginPage.txtErrorMessage).toContainText('Email is required!');
            await expect(loginPage.txtErrorMessage).toContainText('Password is required!');
            await expect(loginPage.btnLogin).toBeDisabled();
        });
    })

    test('Verify to show the error message if Email is in invalid format', async ({ page }) => {

        await allure.step("Fill the invalid email", async () => {
            await loginPage.txtEmail.fill('abc.com');
            await loginPage.txtPassword.click();
        });        

        await allure.step("Show an error message and disable the Login button", async () => {
            await expect(loginPage.txtErrorMessage).toContainText('Email should be the real one!');
            await expect(loginPage.btnLogin).toBeDisabled();
        });        
    })

    test('Login with valid Email and Password', async ({ page }) => {

        await allure.step("Fill the valid email and Password", async () => {
            loginPage.login('abc@abc.com', '12345678');
        });

        await allure.step("Validate whether the login is successful or not", async () => {
            await expect(loginPage.btnLogin).toBeDisabled();
            await expect(page).toHaveURL(/.*iot-dashboard/);
        });               

    })

})