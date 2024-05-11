import test from "@playwright/test";
import { TableAndData } from '../pages/tableAndDataPage.spec';
import { allure } from "allure-playwright";

test.describe("Tables and Data - Smart Table", () => {
    test.beforeEach(async ({ page }) => {
        const tableAndData = new TableAndData(page);
        await allure.step("Navigate to Tables and Data > Smart Table form", async () => {
            await page.goto('/');
            await tableAndData.navigateToTabesAndData();
        });
    });

    test("@Medium - Verify to update the user's age based on their email", async ({ page }) => {
        const tableAndData = new TableAndData(page);
        await allure.step("Verify to update the user's age based on their email", async () => {
            await tableAndData.updateUserAgeByEmail("twitter@outlook.com");
        });
    });

    test("@Low - Verify the filter the users by years old", async ({ page }) => {
        const tableAndData = new TableAndData(page);
        const ages = ["20", "40", "200"];
        for (let age of ages) {
            await allure.step(`Verify the filter the users have ${age} years old`, async () => {
                await allure.step(`Filter the users have ${age} years old`, async () => {
                    await tableAndData.filterByAge(age);
                });

                await allure.step("verify the filter work properly", async () => {
                    await tableAndData.assertFilterByAge(age);
                });
            });
        }
    });
});