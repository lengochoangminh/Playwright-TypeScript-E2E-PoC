import * as fs from 'fs';
import * as path from 'path';
import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class TableAndData extends BasePage {
    
    readonly txtSearchAge: Locator;
    readonly tableRows: Locator;
    readonly txtAgeEditor: Locator;

    constructor(page: Page) {
        super(page);

        this.txtSearchAge = this.page.locator("input-editor").getByPlaceholder("Age");
        this.tableRows = this.page.locator("tbody tr");
        this.txtAgeEditor = this.page.locator("input-filter").getByPlaceholder("Age");
    }

    async navigateToTabesAndData() {
        await this.page.getByText("Tables & Data").click();
        await this.page.getByText("Smart Table").click();

        /** Falky issue with the table is NOT loaded and lead printTableValuesToCSV failed to write to CSV. 
         *      Hard Wait: await this.page.waitForTimeout(2000);             
         **/        
        await this.page.locator("tbody tr").first().waitFor(); // Wait for the first row in the table                
    }

    async updateUserAgeByEmail(email: string) {
        // Find the user who has the entered email
        const targetRow = this.page.getByRole("row", { name: email });
        await targetRow.locator(".nb-edit").click();

        // Update the age
        await this.txtSearchAge.clear();
        await this.txtSearchAge.fill("35");
        await this.page.locator(".nb-checkmark").click();
    }

    async updateUserAgeFor4thRow() {
        // Find the 4th row
        const targetRow = this.page.locator("tbody tr").nth(3);
        await targetRow.locator(".nb-edit").click();

        // Update the age
        await this.txtSearchAge.clear();
        await this.txtSearchAge.fill("35");
        await this.page.locator(".nb-checkmark").click();
    }

    async filterByAge(age: string) {       
        await this.txtAgeEditor.clear();
        await this.txtAgeEditor.fill(age);
        await this.page.waitForTimeout(500);
    }

    async assertFilterByAge(age: string) {        
        
        for (let row of await this.tableRows.all()) {
            const cellValue = await row.locator("td").last().textContent();

            if (cellValue.includes(age)) expect(cellValue).toEqual(age);
            else
                expect(await this.page.getByRole("table").textContent()).toContain(
                    "No data found"
                );
        }
    }

    async getTableRows() {
        const count = await this.tableRows.count();
        console.log(`Total rows in the table: ${count}`);
        expect(count).toBe(10);
    }

    async printTableValuesToCSV() {                      
        
        //const csvFilePath = path.join(__dirname, 'output.csv');        
        const csvFilePath = path.resolve('printTableRows.csv');           

        const csvData = [];        
        
        for (let row of await this.tableRows.all()) {
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
