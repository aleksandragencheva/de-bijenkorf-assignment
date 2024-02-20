exports.CheckoutStepTwoPage = class CheckoutStepTwoPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  
  constructor(page) {
    this.page = page;

    // personal details
    this.emailTextbox = page.getByLabel('E-mailadres*');
    this.firstNameTextbox = page.getByLabel('Voornaam*');
    this.lastNameTextbox = page.getByLabel('Achternaam*');
    this.countryCombobox = page.getByLabel('Land*');
    this.postcodeTextbox = page.getByLabel('Postcode*');
    this.housenrTextbox = page.getByLabel('Huisnummer.');

    // salutation
    this.mrButton = page.getByLabel('Dhr.');
    this.mrsButton = page.getByLabel('Mevr.');

    // delivery country
    this.deliveryCountryButtonNL = page.locator('#select-country-NL');
    this.deliveryCountryButtonBE = page.locator('#select-country-BE');

    // delivery method
    this.pickupPointButton = page.getByTestId('pickup-point-button');
    this.homeDeliveryButton = page.getByTestId('POSTAL-button');

    // pick up point
    this.pickupPostcodeTextbox = page.locator('#postalCode');
    this.findPickupButton = page.locator('find-postalCode');
    this.selectPickupButton = page.getByTestId('pickup-point-change-or-select').first();

    // pay button
    this.proceedToPaymentButton = page.getByTestId('reservation-submit').last();
    this.successStepsAlert = page.getByTestId('success-steps');
  }

  async fillInCustomerDetails(email, firstName, lastName, postcode, housenr) {
    await this.emailTextbox.click();
    await this.emailTextbox.fill(email);

    await this.mrsButton.check();

    await this.firstNameTextbox.click();
    await this.firstNameTextbox.fill(firstName);

    await this.lastNameTextbox.click();
    await this.lastNameTextbox.fill(lastName);

    await this.postcodeTextbox.click();
    await this.postcodeTextbox.fill(postcode);

    await this.housenrTextbox.click();
    await this.housenrTextbox.fill(housenr);
  }

  async selectDeliveryMethod(pickUpPoint) {
    if (pickUpPoint) {
      await this.pickupPointButton.click();
      await this.pickupPostcodeTextbox.click();
      await this.pickupPostcodeTextbox.fill('1101BX');
      // too many re-renders/requests seem to be happening after filling in the postal code, 
      // this makes it less flakey
      await this.page.keyboard.press('Enter');
      await this.selectPickupButton.click();
      
      return;
    } 

    await this.homeDeliveryButton.click();
  }

  async proceedToPayment() {
    await this.proceedToPaymentButton.click();
  }
};
