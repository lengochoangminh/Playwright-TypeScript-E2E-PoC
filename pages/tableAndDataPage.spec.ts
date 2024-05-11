import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class TableAndData extends BasePage {

    constructor(page: Page) { super(page); }

    async navigateToTabesAndData() {
        await this.page.getByText("Tables & Data").click();
        await this.page.getByText("Smart Table").click();
    }

    async updateUserAgeByEmail(email: string) {
        // Find the user who has the entered email 
        const targetRow = this.page.getByRole("row", { name: email });
        await targetRow.locator(".nb-edit").click();

        // Update the age
        await this.page.locator("input-editor").getByPlaceholder("Age").clear();
        await this.page.locator("input-editor").getByPlaceholder("Age").fill("35");
        await this.page.locator(".nb-checkmark").click();
    }

    async filterByAge(age: string) {
        await this.page.locator("input-filter").getByPlaceholder("Age").click();
        await this.page.locator("input-filter").getByPlaceholder("Age").clear();
        await this.page.locator("input-filter").getByPlaceholder("Age").fill(age);
        await this.page.waitForTimeout(500);
    }

    async assertFilterByAge(age: string) {
        const ageRows = this.page.locator("tbody tr");
        for (let row of await ageRows.all()) {
            const cellValue = await row.locator("td").last().textContent();

            if (cellValue.includes(age))
                expect(cellValue).toEqual(age);
            else
                expect(await this.page.getByRole("table").textContent()).toContain("No data found");
        }
    }
}