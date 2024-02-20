exports.CheckoutStepOnePage = class CheckoutStepOnePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  
  constructor(page) {
    this.page = page;
    
    this.guestOrderButton = page.getByTestId('CheckoutWithoutRegistration');
  }

  async proceedAsGuest() {
    await this.guestOrderButton.click();
  }
};
