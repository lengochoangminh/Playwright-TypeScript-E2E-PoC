import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
    readonly txtEmail: Locator;
    readonly txtPassword: Locator;
    readonly cbRememberMe: Locator;
    readonly btnLogin: Locator;
    readonly txtErrorMessage: Locator;

    constructor(page: Page) {

        super(page);

        this.txtEmail = this.page.getByRole('textbox', { name: 'Email address:' });
        this.txtPassword = this.page.getByRole('textbox', { name: 'Password:' });
        this.cbRememberMe = this.page.getByText('Remember me');
        this.btnLogin = this.page.getByRole('button', { name: 'Log In' });
        this.txtErrorMessage = this.page.getByLabel('Login');
    }

    async navigateToLoginPage() {

        await this.page.goto("/");
        await this.page.getByRole('link', { name: 'Auth' }).click();
        await this.page.getByRole('link', { name: 'Login' }).click();
    }

    async login(email: string, password: string) {

        await this.txtEmail.fill(email);
        await this.txtPassword.fill(password);
        await expect(this.btnLogin).toBeEnabled();

        await this.btnLogin.click();
    }
}