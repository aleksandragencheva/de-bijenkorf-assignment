import { test, expect } from '@playwright/test';
import { BasketPage } from '../page-objects/basketPage';
import { CheckoutStepOnePage } from '../page-objects/checkoutStepOnePage';
import { CheckoutStepTwoPage } from '../page-objects/checkoutStepTwoPage';
import { PaymentPage } from '../page-objects/paymentPage';
import { CookiesComponent } from '../page-components/cookiesComponent';

test.describe('Checkout Domain', () => {
  let cookiesComponent: CookiesComponent;
  let basketPage: BasketPage;
  let stepOnePage: CheckoutStepOnePage;
  let stepTwoPage: CheckoutStepTwoPage;
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    cookiesComponent = new CookiesComponent(page)
    basketPage = new BasketPage(page);
    stepOnePage = new CheckoutStepOnePage(page);
    stepTwoPage = new CheckoutStepTwoPage(page);
    paymentPage = new PaymentPage(page);

    await page.goto('');
    await cookiesComponent.acceptAllCookies();

    /* Review basket and proceed */
    await expect(basketPage.basketHeader).toBeVisible();
    await expect(basketPage.basketItems.filter({ hasText: 'The OrdinaryGlycolic Acid 7%' })).toBeVisible();
    await basketPage.proceedToOrder();

    await stepOnePage.proceedAsGuest();

    await stepTwoPage.fillInCustomerDetails('test@yahoo.com', 'Test', 'Test', '1101BX', '34');
    await expect(stepTwoPage.successStepsAlert).toBeVisible();

    /* Assumes (delivery) country NL is checked by default because of the base url */
    await expect(stepTwoPage.countryCombobox).toHaveValue('NL');
    await expect(stepTwoPage.deliveryCountryButtonNL).toBeChecked();
  });

  test('verifies shipping costs are 3.95 on payment page', async () => {
    await stepTwoPage.proceedToPayment();

    await expect(paymentPage.paymentHeader).toBeVisible();
    await expect(paymentPage.shippingCostsLabel).toHaveText('3,95');
  });

  test('verifies it`s possible to choose a “pick up point” as delivery method and proceed to payment page', async () => {
    await stepTwoPage.selectDeliveryMethod(true);
    await stepTwoPage.proceedToPayment();

    await expect(paymentPage.paymentHeader).toBeVisible();
    await expect(paymentPage.shippingCostsLabel).toHaveText('3,50');
  });
});
