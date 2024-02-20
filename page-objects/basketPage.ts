import { Locator, Page } from '@playwright/test';

export class BasketPage {
  readonly page: Page;
  readonly basketHeader: Locator;
  readonly orderButton: Locator;
  readonly basketItems: Locator;

  constructor(page: Page) { 
    this.page = page;

    this.basketHeader = page.locator('h1', { hasText: 'Winkelmand' });
    this.orderButton = page.getByTestId('reservation-submit');
    this.basketItems = page.locator('li'); // this is not ideal but it's missing any name, attr or testid
  }

  async proceedToOrder() {
    await this.orderButton.click();
  }
};
