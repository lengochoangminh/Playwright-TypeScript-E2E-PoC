import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class DatePickerPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToDatePickerPage() {
    await this.page.goto("/");
    await this.page.getByText("Forms").click();
    await this.page.getByText("Datepicker").click();
  }

  async inputCommonDatePicker(date) {
    // Select the form picker text box to display the calendar selector
    const calendarInputField = this.page.getByPlaceholder("Form Picker");
    await calendarInputField.click();

    // Nagative the calendar to select the expected Month & Year
    const expectedDate = date.getDate().toString();
    const expectedMonthShot = date.toLocaleString("En-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`;
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`;

    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();
    while (
      calendarMonthAndYear != null &&
      !calendarMonthAndYear.includes(expectedMonthAndYear)
    ) {
      // Click on the chevron right to select the next Month
      await this.page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();

      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    // Click to select the expected day
    await this.page
      .locator('[class="day-cell ng-star-inserted"]')
      .getByText(expectedDate, { exact: true })
      .click();

    await expect(calendarInputField).toHaveValue(dateToAssert);
  }
}
