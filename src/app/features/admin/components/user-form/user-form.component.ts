import { Component } from '@angular/core';
import { StringConstants } from 'shared/constants/string.constants';
import { FormControl, FormGroup } from '@angular/forms';
import { getEmailValidator, getRequiredValidation } from 'shared/functions/form-validator-helper.functions';
import { RoleDto, RoleType, UserDto } from 'shared/api/dtos/dto-models';
import { getFormControlValue, setFormControlValue } from 'shared/functions/form-helper.functions';
import { RoleHelperService } from 'shared/helper/role-helper.service';

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

  get firstNameInput(): string {
    return getFormControlValue(this.formGroup, this.firstNameControlName);
  }

  set firstNameInput(firstName: string) {
    setFormControlValue(this.formGroup, this.firstNameControlName, firstName);
  }

  get familyNameInput(): string {
    return getFormControlValue(this.formGroup, this.familyNameControlName);
  }

  set familyNameInput(familyName: string) {
    setFormControlValue(this.formGroup, this.familyNameControlName, familyName);
  }

  get emailInput(): string {
    return getFormControlValue(this.formGroup, this.emailControlName);
  }

  set emailInput(email: string) {
    setFormControlValue(this.formGroup, this.emailControlName, email);
  }

  get hasSuperAdminRoleInput(): boolean {
    return getFormControlValue(this.formGroup, this.superAdminControlName);
  }

  set hasSuperAdminRoleInput(hasSuperAdminRole: boolean) {
    setFormControlValue(this.formGroup, this.superAdminControlName, hasSuperAdminRole);
  }

  get hasAdminRoleInput(): boolean {
    return getFormControlValue(this.formGroup, this.adminControlName);
  }

  set hasAdminRoleInput(hasAdminRole: boolean) {
    setFormControlValue(this.formGroup, this.adminControlName, hasAdminRole);
  }

  get hasSellerRoleInput(): boolean {
    return getFormControlValue(this.formGroup, this.sellerControlName);
  }

  set hasSellerRoleInput(hasSellerRole: boolean) {
    setFormControlValue(this.formGroup, this.sellerControlName, hasSellerRole);
  }

  get hasBuyerRoleInput(): boolean {
    return getFormControlValue(this.formGroup, this.buyerControlName);
  }

  set hasBuyerRoleInput(hasBuyerRole: boolean) {
    setFormControlValue(this.formGroup, this.buyerControlName, hasBuyerRole);
  }

  get roleSelectionContainerInfo(): string {
    return this.markRoleSelectionContainerAsInvalid()
        ? 'The created user needs at least one assigned role.'
        : 'Assign a role to the user.';
  }

  constructor(public roleHelperService: RoleHelperService) {
  }

  buildUserDto(): UserDto {
    return {
      id: null,
      email: this.emailInput,
      firstName: this.firstNameInput,
      lastName: this.familyNameInput,
      roles: this.buildRoleDtos(),
      customerId: null
    };
  }

  populateFormGroup(userDto: UserDto) {
    this.firstNameInput = userDto.firstName;
    this.familyNameInput = userDto.lastName;
    this.emailInput = userDto.email;
    this.hasSuperAdminRoleInput = this.roleHelperService.isSuperAdmin(userDto);
    this.hasAdminRoleInput = this.roleHelperService.isAdmin(userDto);
    this.hasSellerRoleInput = this.roleHelperService.isSeller(userDto);
    this.hasBuyerRoleInput = this.roleHelperService.isBuyer(userDto);
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
    if (this.hasSuperAdminRoleInput) {
      roleDtos.push(this.roleHelperService.buildRoleDto(RoleType.ROLE_JPA_GLOBALADMIN));
    }
    if (this.hasAdminRoleInput) {
      roleDtos.push(this.roleHelperService.buildRoleDto(RoleType.ROLE_JPA_ADMIN));
    }
    if (this.hasSellerRoleInput) {
      roleDtos.push(this.roleHelperService.buildRoleDto(RoleType.ROLE_JPA_SELLER));
    }
    if (this.hasBuyerRoleInput) {
      roleDtos.push(this.roleHelperService.buildRoleDto(RoleType.ROLE_JPA_BUYER));
    }
    return roleDtos;
  }
}
