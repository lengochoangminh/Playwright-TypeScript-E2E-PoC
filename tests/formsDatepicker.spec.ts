import test from "@playwright/test";
import { allure } from "allure-playwright";
import { DatePickerPage } from "../pages/datepickerPage";

test.describe("Forms - Datepicker", () => {

    test("@Medium - Verify to select the date from the Common Datepicker", async ({ page }) => {

        // === Allure Test Report Annotation ===
        await allure.description("Verify to select the date from the Common Datepicker");
        await allure.owner("Minh Le");
        await allure.tags("Smoke Test", "GUI");

        const datePickerPage = new DatePickerPage(page);
        await allure.step("Navigate to Forms > Date Picker", async () => {
            await datePickerPage.navigateToDatePickerPage();
        });

        const date = new Date();
        date.setDate(date.getDate() + 7);

        await allure.step("Select the next 7 days (today + 7)", async () => {
            await datePickerPage.inputCommonDatePicker(date);
        });
    });
});
