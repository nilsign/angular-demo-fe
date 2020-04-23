import { Component, ViewChild } from '@angular/core';
import { UserRestApiService } from 'shared/api/user-rest-api.service';
import { Subscription } from 'rxjs';
import { UserDto } from 'shared/api/dtos/dto-models';
import { UserFormComponent } from 'features/admin/components/user-form/user-form.component';
import { FormGroup } from '@angular/forms';
import { isNil } from 'lodash';

@Component({
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent {

  @ViewChild(UserFormComponent, {static: false})
  userFormComponent: UserFormComponent;

  clickedCreateUserButton = false;

  get userFormGroup(): FormGroup {
    return this.userFormComponent.formGroup;
  }

  get canCreateUser(): boolean {
    return !isNil(this.userFormComponent)
        && !isNil(this.userFormGroup)
        && !this.userFormGroup.invalid
        && !this.userFormComponent.markRoleSelectionContainerAsInvalid();
  }

  private subscriptions: Subscription = new Subscription();

  constructor(public userRestApi: UserRestApiService) {
  }

  onCreateUserClicked(): void {
    this.clickedCreateUserButton = true;
    this.userFormGroup.markAllAsTouched();
    if (this.canCreateUser) {
      this.saveUser();
      this.clickedCreateUserButton = false;
    }
  }

  private saveUser(): void {
    // TODO(nilsheumer): Show a dialog with the stored user data.
    // TODO(nilsheumer): Handle error responses.
    this.subscriptions.add(
        this.userRestApi.saveUser(this.userFormComponent.buildUserDto()).subscribe(
            (userDto: UserDto) => {
              console.log('User saved successfully. ', userDto);
            },
            (error: string) => {
              console.error('Save user failed. ', error);
            }
        )
    );
  }
}
