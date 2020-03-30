import { Component } from '@angular/core';
import { StringConstants } from 'shared/constants/string.constants';
import { FormControl, FormGroup } from '@angular/forms';
import { getEmailValidator, getRequiredValidation } from 'shared/functions/form-validator-helper.functions';
import { RoleDto, RoleType, UserDto } from 'shared/api/dtos/dto-models';
import { getFormControlValue } from 'shared/functions/form-helper.functions';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

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

  get roleSelectionContainerInfo(): string {
    return this.markRoleSelectionContainerAsInvalid()
        ? 'The created user needs at least one assigned role.'
        : 'Assign a role to the user.';
  }

  buildUserDto(): UserDto {
    return {
      id: null,
      email: getFormControlValue(this.formGroup, this.emailControlName),
      firstName: getFormControlValue(this.formGroup, this.firstNameControlName),
      lastName: getFormControlValue(this.formGroup, this.familyNameControlName),
      roles: this.buildRoleDtos(),
      customerId: null
    };
  }

  markRoleSelectionContainerAsInvalid(): boolean {
    const superAdminControl = this.formGroup.controls[this.superAdminControlName];
    const adminControl = this.formGroup.controls[this.adminControlName];
    const sellerControl = this.formGroup.controls[this.sellerControlName];
    const buyerControl = this.formGroup.controls[this.buyerControlName];
    return !superAdminControl.value && !adminControl.value && !sellerControl.value && !buyerControl.value
        && (superAdminControl.touched || adminControl.touched || sellerControl.touched || buyerControl.touched);
  }


  private buildRoleDtos(): RoleDto[] {
    const roleDtos: RoleDto[] = [];
    if (getFormControlValue(this.formGroup, this.superAdminControlName)) {
      roleDtos.push(buildRoleDto(RoleType.ROLE_JPA_GLOBALADMIN));
    }
    if (getFormControlValue(this.formGroup, this.adminControlName)) {
      roleDtos.push(buildRoleDto(RoleType.ROLE_JPA_ADMIN));
    }
    if (getFormControlValue(this.formGroup, this.sellerControlName)) {
      roleDtos.push(buildRoleDto(RoleType.ROLE_JPA_SELLER));
    }
    if (getFormControlValue(this.formGroup, this.buyerControlName)) {
      roleDtos.push(buildRoleDto(RoleType.ROLE_JPA_BUYER));
    }
    return roleDtos;
  }
}

function buildRoleDto(roleType: RoleType): RoleDto {
  return {
    id: null,
    roleType,
    roleName: ''
  };
}
