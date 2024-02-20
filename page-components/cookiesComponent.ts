import { Locator, Page } from "@playwright/test";

export class CookiesComponent {
  constructor(private page: Page) {}

  public acceptAllCookiesButton: Locator = this.page.getByRole('button', { name: 'Akkoord', exact: true });  

  async acceptAllCookies() {
    await this.acceptAllCookiesButton.click();
  }
}
