// @ts-check
import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";
import { HomePage } from "../pages/homePage";

test.describe("Home - IoT Dashboard", () => {

    let homePage;

    test.beforeEach(async ({ page }) => {

        homePage = new HomePage(page);

        await allure.step("Navigate to Home page - IoT Dashboard", async () => {
            await page.goto("/");
        });
    });

    test("@Medium -Verify to toggle Light is ON/OFF @bug", async ({ page }) => {

        // === Playwright Test Report Annotation - Simulate the failure and mark the annotation "Bug" for this test ===
        test.info().annotations.push({
            type: "bug",
            description: "Demo to add an annotation to explain the defect found",
        });

        await allure.step("Verify the Light is ON as default", async () => {
            await expect(homePage.txtLightStatus).toHaveText('ON');
        });

        await allure.step("Click on the Light to turn it off", async () => {
            await homePage.clickOnLight();
        });

        await allure.step("Verify the Light is OFF", async () => {
            await expect(homePage.txtLightStatus).toHaveText('OFF-BUG');
        });
    });

    test("@Medium - Verify to drag slider to set the temperature", async ({ page }) => {

        await allure.step("Drag slider to set the temperature", async () => {
            await homePage.drapTemperatureSlider();
        });

    });

    test("@Low - Verify to change the website theme to be Cosmic", async ({ page }) => {

        await allure.step("Select to change the theme of website", async () => {
            await homePage.changeTheme();
        });

        await allure.step(
            "Verify the website is changed to the selected theme correctly",
            async () => {
                await expect(homePage.headerTheme).toHaveCSS(
                    "background-color",
                    "rgb(50, 50, 89)"
                );
            }
        );
    });

});
