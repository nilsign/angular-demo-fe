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

  clickedCreateUserButton = false;

  onCreateUserClicked(): void {
    this.clickedCreateUserButton = true;
    this.formGroup.markAllAsTouched();
    if (this.canCreateUser()) {
      // TODO(nilsheumer): Create user, show success notification and empty form, or handle failure gracefully.
      this.clickedCreateUserButton = false;
    }
    console.log(this.formGroup);
  }

  canCreateUser(): boolean {
    return !this.formGroup.invalid && !this.markRoleSelectionContainerAsInvalid();
  }

  markRoleSelectionContainerAsInvalid(): boolean {
    const superAdminControl = this.formGroup.controls[this.superAdminControlName];
    const adminControl = this.formGroup.controls[this.adminControlName];
    const sellerControl = this.formGroup.controls[this.sellerControlName];
    const buyerControl = this.formGroup.controls[this.buyerControlName];
    return !superAdminControl.value && !adminControl.value && !sellerControl.value && !buyerControl.value
      && (superAdminControl.touched || adminControl.touched || sellerControl.touched || buyerControl.touched);
  }

  getRoleSelectionContainerInfo() {
    return this.markRoleSelectionContainerAsInvalid()
        ? 'The created user needs at least one assigned role.'
        : 'Assign a role to the user.';
  }
}
