import { Component } from '@angular/core';
import { StringConstants } from 'shared/constants/string.constants';
import { FormControl, FormGroup } from '@angular/forms';
import { getFormControlValue } from 'shared/functions/form-helper.functions';
import { isNil } from 'lodash';

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

  isSearchButtonDisabled(): boolean {
    const searchText: string  = getFormControlValue(this.formGroup, this.searchUserControlName);
    return isNil(searchText) || searchText.trim().length < EditUserComponent.MINIMAL_USER_SEARCH_TEXT_LENGTH;
  }
}
