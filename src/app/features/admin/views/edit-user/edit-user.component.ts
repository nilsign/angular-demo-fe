import { Component } from '@angular/core';
import { StringConstants } from 'shared/constants/string.constants';
import { FormControl, FormGroup } from '@angular/forms';
import { getFormControlValue } from 'shared/functions/form-helper.functions';
import { isNil } from 'lodash';
import { UserRestApiService } from 'shared/api/user-rest-api.service';
import { UserDto } from 'shared/api/dtos/dto-models';

@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  static readonly MINIMAL_USER_SEARCH_TEXT_LENGTH = 3;

  readonly searchUserControlName = StringConstants.formControlNames.searchUser;

  readonly formGroup = new FormGroup({
    [this.searchUserControlName]: new FormControl('')
  });

  get searchText(): string {
    return getFormControlValue(this.formGroup, this.searchUserControlName);
  }

  constructor(public userRestApiService: UserRestApiService) {
  }

  isSearchButtonDisabled(): boolean {
    const searchText: string  = getFormControlValue(this.formGroup, this.searchUserControlName);
    return isNil(searchText) || searchText.trim().length < EditUserComponent.MINIMAL_USER_SEARCH_TEXT_LENGTH;
  }

  onSearchButtonClicked(): void {
    this.userRestApiService.searchUser(this.searchText).subscribe((users: UserDto[]) => {
      users.forEach((user: UserDto) => {
        // TODO(nilsheumer): Display returned users for selection.
        console.log(user.email);
      });
    });
  }
}
