const { test, expect } = require('@playwright/test');
const { BasketPage } = require('../pages/basket');
const { CheckoutStepOnePage } = require('../pages/checkoutStepOne');
const { CheckoutStepTwoPage } = require('../pages/checkoutStepTwo');
const { PaymenentPage } = require('../pages/payment');

test.describe('Checkout Domain', () => {
  let basketPage;
  let stepOnePage;
  let stepTwoPage;
  let paymentPage;

  test.beforeEach(async ({ page }) => {
    basketPage = new BasketPage(page);
    stepOnePage = new CheckoutStepOnePage(page);
    stepTwoPage = new CheckoutStepTwoPage(page);
    paymentPage = new PaymenentPage(page);

    await page.goto('');
    await page.getByRole('button', { name: 'Akkoord', exact: true }).click();  

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
