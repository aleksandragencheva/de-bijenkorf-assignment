import { Locator, Page } from "@playwright/test";

export class CookiesComponent {
  readonly page: Page;
  readonly acceptAllCookiesButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.acceptAllCookiesButton = page.getByRole('button', { name: 'Akkoord', exact: true });  
  }

  async acceptAllCookies() {
    await this.acceptAllCookiesButton.click();
  }
}
