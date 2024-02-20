import { Locator, Page } from "@playwright/test";

export class PaymentPage {
  readonly page: Page;
  readonly paymentHeader: Locator;
  readonly shippingCostsLabel: Locator
  readonly tocList: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.paymentHeader = page.locator('h2', { hasText: 'Betaling' });
    this.shippingCostsLabel = page.getByTestId('TotalsShippingCost');
  }
};
