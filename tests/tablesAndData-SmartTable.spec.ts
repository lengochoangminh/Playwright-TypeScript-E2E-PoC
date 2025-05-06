import test from "@playwright/test";
import { allure } from "allure-playwright";
import { TableAndData } from "../pages/tableAndDataPage";

test.describe("Tables and Data - Smart Table: Interacting with Tables and Rows", () => {
    let tableAndData;

    test.beforeEach(async ({ page }) => {

        tableAndData = new TableAndData(page);

        await allure.step(
            "Navigate to Tables and Data > Smart Table form",
            async () => {
                await page.goto("/");
                await tableAndData.navigateToTabesAndData();
            }
        );
    });

    test("@Medium - Verify to update the user's age", async ({ page }) => {

        await allure.step("Based on their email", async () => {
            await tableAndData.updateUserAgeByEmail("twitter@outlook.com");
        });

        await allure.step("For the 4th table row", async () => {
            await tableAndData.updateUserAgeFor4thRow();
        });

    });

    test("@Low - Verify the filter the users by years old", async ({ page }) => {

        const ages = ["20", "40", "200"];
        for (const age of ages) {

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

    test("@Medium - Playground with the Table", async () => {

        await allure.step("Verify to the table rows number ", async () => {
            await tableAndData.getTableRows();
        });

        await allure.step("Print the table values to CSV", async () => {
            await tableAndData.printTableValuesToCSV();
        });

    });

});
