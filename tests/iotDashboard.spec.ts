// @ts-check
import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/homePage';
import { allure } from "allure-playwright";

test.beforeEach(async ({ page }) => {
    await allure.step("Navigate to Home page - IoT Dashboard", async () => {
        await page.goto('/');
    });
});

test.describe("Home - IoT Dashboard", () => {

    test("@Medium -Verify to toggle Light is ON/OFF @bug", async ({ page }) => {
        // Simulate the test is failed and add the annotation to describe the defect found
        test.info().annotations.push(({
            type: "bug",
            description: 'Demo to add an annotation to explain the defect found'
        }))

        const homePage = new HomePage(page);
        await allure.step("Verify the Light is ON as default", async () => {
            await expect(homePage.txtLightON).toBeVisible();
        });

        await allure.step("Click on the Light to turn it off", async () => {
            await homePage.clickOnLight();
        });

        await allure.step("Verify the Light is OFF", async () => {
            await expect(homePage.txtLightOFF).toBeVisible();
        });
    });

    test("@Medium - Verify to drag slider to set the temperature", async ({ page }) => {
        const homePage = new HomePage(page);
        await allure.step("Drag slider to set the temperature", async () => {
            await homePage.drapTemperatureSlider();
        });
    });

    test("@Low - Verify to change the website theme to be Cosmic", async ({ page }) => {
        const homePage = new HomePage(page);
        await allure.step("Select to change the theme of website", async () => {
            await homePage.changeTheme();
        });

        await allure.step("Verify the website is changed to the selected theme correctly", async () => {
            await expect(homePage.headerTheme).toHaveCSS("background-color", "rgb(50, 50, 89)");
        });
    });
});