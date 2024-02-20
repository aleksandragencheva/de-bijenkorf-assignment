const { expect } = require('@playwright/test');

exports.BasketPage = class BasketPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  
  constructor(page) {
    this.page = page;
    
    this.basketHeader = page.locator('h1', { hasText: 'Winkelmand' });
    this.orderButton = page.getByTestId('reservation-submit');
    this.basketItems = page.locator('li'); // this is not ideal but it's missing any name, attr or testid
  }

  /** Assumes one item in basket for simplicity
   * Can be changed to passing an array with the items and iterating through it
   */
  async reviewBasket(itemName) {
    await expect(this.basketHeader).toBeVisible();
    await expect(this.basketItems.filter({ hasText: itemName })).toBeVisible();
  }

  async proceedToOrder() {
    await this.orderButton.click();
  }
};
