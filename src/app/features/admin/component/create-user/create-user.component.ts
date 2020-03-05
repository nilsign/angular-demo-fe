import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StringConstants } from 'shared/constants/string.constants';
import { getEmailValidator, getRequiredValidation } from 'shared/functions/form-validator-helper.functions';


@Component({
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  readonly emailControlName = StringConstants.formControlNames.email;
  readonly firstNameControlName = StringConstants.formControlNames.firstName;
  readonly familyNameControlName = StringConstants.formControlNames.familyName;
  readonly superAdminControlName = StringConstants.formControlNames.superAdminRole;
  readonly adminControlName = StringConstants.formControlNames.adminRole;
  readonly sellerControlName = StringConstants.formControlNames.sellerRole;
  readonly buyerControlName = StringConstants.formControlNames.buyerRole;

  readonly formGroup = new FormGroup({
    [this.emailControlName]: new FormControl('', [
        getRequiredValidation(),
        getEmailValidator()]),
    [this.firstNameControlName]: new FormControl('', getRequiredValidation()),
    [this.familyNameControlName]: new FormControl('', getRequiredValidation()),
    [this.superAdminControlName]: new FormControl(false),
    [this.adminControlName]: new FormControl(false),
    [this.sellerControlName]: new FormControl(false),
    [this.buyerControlName]: new FormControl(false)
  });

  onCreateUserClicked(): void {
    console.log(this.formGroup);
  }
}
