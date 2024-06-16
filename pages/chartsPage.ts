import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class ChartsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToChartsPage() {
    await this.page.goto("/");
    await this.page.getByRole("link", { name: "Charts", exact: true }).click();
    await this.page.getByRole("link", { name: "Echarts" }).click();
    await this.waitForNumberOfSeconds(2);
  }

  async assertPieChart() {
    expect(
      await this.page.locator("ngx-echarts-pie canvas").screenshot()
    ).toMatchSnapshot();
  }

  async assertBarChart() {
    expect(
      await this.page.locator("ngx-echarts-bar canvas").screenshot()
    ).toMatchSnapshot({ threshold: 0.5 });
  }
}
