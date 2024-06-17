import test from "@playwright/test";
import { ChartsPage } from "../pages/chartsPage";
import { allure } from "allure-playwright";

test.describe("Charts - ECharts Page", async () => {
  test("@Medium - Visual test for the charts displayed correctly", async ({
    page,
  }) => {
    const chartsPage = new ChartsPage(page);

    await allure.step("Navigate to Charts > eCharts page", async () => {
      await chartsPage.navigateToChartsPage();
    });

    await allure.step(
      "Visual test - Assert the pie chart displays correctly",
      async () => {
        await chartsPage.assertPieChart();
      }
    );

    await allure.step(
      "Visual test - Assert the bar chart displays correctly",
      async () => {
        await chartsPage.assertBarChart();
      }
    );
  });
});
