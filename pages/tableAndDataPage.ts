import * as fs from 'fs';
import * as path from 'path';
import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class TableAndData extends BasePage {
    constructor(page: Page) {
        super(page);
    }

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
        await this.page.locator("input-filter").getByPlaceholder("Age").clear();
        await this.page.locator("input-filter").getByPlaceholder("Age").fill(age);
        await this.page.waitForTimeout(500);
    }

    async assertFilterByAge(age: string) {
        const ageRows = this.page.locator("tbody tr");
        for (let row of await ageRows.all()) {
            const cellValue = await row.locator("td").last().textContent();

            if (cellValue.includes(age)) expect(cellValue).toEqual(age);
            else
                expect(await this.page.getByRole("table").textContent()).toContain(
                    "No data found"
                );
        }
    }

    async printTableValuesToCSV() {

        await this.page.waitForTimeout(2000);

        const rows = this.page.locator("tbody tr");

        //const csvFilePath = path.join(__dirname, 'output.csv');        
        const csvFilePath = path.resolve('printTableRows.csv');           

        const csvData = [];

        for (let row of await rows.all()) {
            const cells = await row.locator("td").all(); // Get all cells in the row
            const cellValues = [];
            for (let cell of cells) {
                const text = await cell.textContent(); // Extract text content of each cell
                cellValues.push(text?.trim()); // Trim and push to the array
            }

            // Option 1 : Log to console
            //console.log(cellValues.join(" | "));

            // Option 2: Write to CSV
            csvData.push(cellValues.join(',')); // Prepare CSV row
        }

        fs.writeFileSync(csvFilePath, csvData.join('\n')); // Write all rows to CSV file
        console.log(`Data written to ${csvFilePath}`);
    }

}
