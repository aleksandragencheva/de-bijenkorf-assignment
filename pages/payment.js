exports.PaymenentPage = class PaymentPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  
  constructor(page) {
    this.page = page;
    
    this.paymentHeader = page.locator('h2', { hasText: 'Betaling' });
    this.shippingCostsLabel = page.getByTestId('TotalsShippingCost');
  }
};
