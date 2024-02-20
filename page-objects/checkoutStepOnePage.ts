import { Locator, Page } from "@playwright/test";

export class CheckoutStepOnePage {  
  readonly page: Page;
  readonly guestOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.guestOrderButton = page.getByTestId('CheckoutWithoutRegistration');
  }

  async proceedAsGuest() {
    await this.guestOrderButton.click();
  }
};
