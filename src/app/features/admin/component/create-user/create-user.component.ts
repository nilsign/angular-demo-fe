import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StringConstants } from 'shared/constants/string.constants';

@Component({
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  readonly emailControlName = StringConstants.formControlNames.inputEmail;
  readonly firstNameControlName = StringConstants.formControlNames.inputFirstName;
  readonly familyNameControlName = StringConstants.formControlNames.inputFamilyName;
  readonly superAdminControlName = StringConstants.formControlNames.inputSuperAdminRole;
  readonly adminControlName = StringConstants.formControlNames.inputAdminRole;
  readonly sellerControlName = StringConstants.formControlNames.inputSellerRole;
  readonly buyerControlName = StringConstants.formControlNames.inputSellerRole;

  readonly formGroup = new FormGroup({
    [this.emailControlName]: new FormControl('', Validators.required),
    [this.firstNameControlName]: new FormControl('', Validators.required),
    [this.familyNameControlName]: new FormControl('', Validators.required),
    [this.superAdminControlName]: new FormControl(false),
    [this.adminControlName]: new FormControl(false),
    [this.sellerControlName]: new FormControl(false),
    [this.buyerControlName]: new FormControl(false)
  });

  onCreateUserClicked(): void {
    console.log(this.formGroup);
  }
}
