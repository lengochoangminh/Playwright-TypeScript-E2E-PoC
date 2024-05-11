import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage"

export class HomePage extends BasePage {

    readonly tempBox: Locator;
    readonly txtLight: Locator;
    readonly txtLightON: Locator;
    readonly txtLightOFF: Locator;
    readonly ddlThemeSelection: Locator;
    readonly headerTheme: Locator;

    constructor(page: Page) {
        super(page);
        this.tempBox = this.page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
        this.txtLight = this.page.locator("ngx-status-card").getByText("Light");
        this.txtLightON = this.page.locator("ngx-status-card").filter({ hasText: "Light" }).getByText("ON");
        this.txtLightOFF = this.page.locator("ngx-status-card").filter({ hasText: "Light" }).getByText("OFF-1");
        this.ddlThemeSelection = this.page.locator("ngx-header nb-select");
        this.headerTheme = this.page.locator("nb-layout-header");
    }

    async clickOnLight() {
        await this.txtLight.click();
    };

    async drapTemperatureSlider() {
        await this.tempBox.scrollIntoViewIfNeeded();
        const box = await this.tempBox.boundingBox();
        if (box != null) {
            const x = box.x + box.width / 2;
            const y = box.y + box.height / 2;
            await this.page.mouse.move(x, y);
            await this.page.mouse.down();
            await this.page.mouse.move(x + 100, y);
            await this.page.mouse.move(x + 100, y + 100);
            await this.page.mouse.up();
            await expect(this.tempBox).toContainText("30");
        }
    }

    async changeTheme() {
        await this.ddlThemeSelection.click();
        const optionList = this.page.locator("nb-option-list nb-option");
        await expect(optionList).toHaveText([
            "Light",
            "Dark",
            "Cosmic",
            "Corporate",
        ]);
        await optionList.filter({ hasText: "Cosmic" }).click();
    }
};