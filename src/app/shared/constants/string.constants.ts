export class StringConstants {

  // Avoids instantiation of this class.
  private constructor() {
  }

  static readonly formControlNames = {
    email: 'inputEmail',
    firstName: 'inputFirstName',
    familyName: 'inputFamilyName',
    superAdminRole: 'inputSuperAdminRole',
    adminRole: 'inputAdminRole',
    sellerRole: 'inputSellerRole',
    buyerRole: 'inputBuyerRole'
  };
}
