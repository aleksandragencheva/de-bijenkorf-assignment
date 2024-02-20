import { Locator, Page } from "@playwright/test";

export class CheckoutStepTwoPage {
  readonly page: Page;
  // personal details
  readonly emailTextbox: Locator;
  readonly firstNameTextbox: Locator;
  readonly lastNameTextbox: Locator;
  readonly countryCombobox: Locator;
  readonly postcodeTextbox: Locator;
  readonly housenrTextbox: Locator;

  // salutation
  readonly mrButton: Locator;
  readonly mrsButton: Locator;

  // delivery country
  readonly deliveryCountryButtonNL: Locator;
  readonly deliveryCountryButtonBE: Locator;

  // delivery method
  readonly pickupPointButton: Locator;
  readonly homeDeliveryButton: Locator;

  // pick up point
  readonly pickupPostcodeTextbox: Locator;
  readonly findPickupButton: Locator;
  readonly selectPickupButton: Locator;

  // pay button
  readonly proceedToPaymentButton: Locator;
  readonly successStepsAlert: Locator

  constructor(page: Page) {
    this.page = page;
    
    this.emailTextbox = page.getByLabel('E-mailadres*');
    this.firstNameTextbox = page.getByLabel('Voornaam*');
    this.lastNameTextbox = page.getByLabel('Achternaam*');
    this.countryCombobox = page.getByLabel('Land*');
    this.postcodeTextbox = page.getByLabel('Postcode*');
    this.housenrTextbox = page.getByLabel('Huisnummer.');

    this.mrButton = page.getByLabel('Dhr.');
    this.mrsButton = page.getByLabel('Mevr.');

    this.deliveryCountryButtonNL = page.locator('#select-country-NL');
    this.deliveryCountryButtonBE = page.locator('#select-country-BE');

    this.pickupPointButton = page.getByTestId('pickup-point-button');
    this.homeDeliveryButton = page.getByTestId('POSTAL-button');

    this.pickupPostcodeTextbox = page.locator('#postalCode');
    this.findPickupButton = page.locator('find-postalCode');
    this.selectPickupButton = page.getByTestId('pickup-point-change-or-select').first();

    this.proceedToPaymentButton = page.getByTestId('reservation-submit').last();
    this.successStepsAlert = page.getByTestId('success-steps');
  }

  async fillInCustomerDetails(
    email: string, 
    firstName: string, 
    lastName: string, 
    postcode: string, 
    housenr: string
  ) {
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

  async selectDeliveryMethod(pickUpPoint: boolean) {
    if (pickUpPoint) {
      await this.pickupPointButton.click();
      await this.pickupPostcodeTextbox.click();
      await this.pickupPostcodeTextbox.fill('1101BX');
      // too many re-renders/requests seem to be happening after filling in the postal code, 
      // pressing enter instead of the button makes it less flakey
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
