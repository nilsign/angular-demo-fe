import {Component, OnDestroy} from '@angular/core';
import { StringConstants } from 'shared/constants/string.constants';
import { FormControl, FormGroup } from '@angular/forms';
import { getFormControlValue } from 'shared/functions/form-helper.functions';
import { isNil } from 'lodash';
import { UserRestApiService } from 'shared/api/user-rest-api.service';
import { UserDto } from 'shared/api/dtos/dto-models';
import { Subscription} from 'rxjs';

@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnDestroy {

  static readonly MINIMAL_USER_SEARCH_TEXT_LENGTH = 3;

  readonly searchUserControlName = StringConstants.formControlNames.searchUser;

  readonly formGroup = new FormGroup({
    [this.searchUserControlName]: new FormControl('')
  });

  userDtos: UserDto[];

  private subscriptions: Subscription = new Subscription();

  get searchText(): string {
    return getFormControlValue(this.formGroup, this.searchUserControlName);
  }

  constructor(public userRestApiService: UserRestApiService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  isSearchButtonDisabled(): boolean {
    const searchText: string  = getFormControlValue(this.formGroup, this.searchUserControlName);
    return isNil(searchText) || searchText.trim().length < EditUserComponent.MINIMAL_USER_SEARCH_TEXT_LENGTH;
  }

  onSearchButtonClicked(): void {
    this.subscriptions.add(this.userRestApiService.searchUser(this.searchText)
        .subscribe((userDtos: UserDto[]) => {
          this.userDtos = userDtos;
        })
    );
  }
}
