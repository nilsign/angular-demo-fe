import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { StringConstants } from 'shared/constants/string.constants';
import { FormControl, FormGroup } from '@angular/forms';
import { getFormControlValue } from 'shared/functions/form-helper.functions';
import { isNil } from 'lodash';
import { UserRestApiService } from 'shared/api/user-rest-api.service';
import { UserDto } from 'shared/api/dtos/dto-models';
import { Subscription } from 'rxjs';
import { UsersTableColumnType } from 'features/admin/components/users-table/users-table-column-type.enum';
import { UserFormComponent } from 'features/admin/components/user-form/user-form.component';

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

  @ViewChild(UserFormComponent, {static: false})
  userFormComponent: UserFormComponent;

  userDtos: UserDto[];
  columns = new Set<UsersTableColumnType> ([
    UsersTableColumnType.NAME_COLUMN_NAME,
    UsersTableColumnType.EMAIL_COLUMN_NAME,
    UsersTableColumnType.EDIT_ICON_COLUMN_NAME
  ]);
  selectedUserToEdit: UserDto;

  private subscriptions: Subscription = new Subscription();
  private lastSearchText: string;

  get searchText(): string {
    return getFormControlValue(this.formGroup, this.searchUserControlName);
  }

  get isSearchButtonDisabled(): boolean {
    return isNil(this.searchText) || this.searchText.trim().length < EditUserComponent.MINIMAL_USER_SEARCH_TEXT_LENGTH;
  }

  get hasSearchResult(): boolean {
    return !isNil(this.userDtos) && this.searchText === this.lastSearchText;
  }

  get hasNoUsersFoundMessage(): boolean {
    return !this.isSearchButtonDisabled
        && !isNil(this.lastSearchText)
        && this.lastSearchText === this.searchText
        && this.userDtos
        && this.userDtos.length === 0;
  }

  get noUserFoundMessage(): string {
    return this.hasNoUsersFoundMessage
        ? `No users found for '${this.searchText}'.`
        : null;
  }

  constructor(
      public userRestApiService: UserRestApiService,
      public changeDetector: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSearchButtonClicked(): void {
    if (this.isSearchButtonDisabled) {
      return;
    }
    this.lastSearchText = this.searchText.trim();
    this.subscriptions.add(this.userRestApiService.searchUser(this.searchText)
        .subscribe((userDtos: UserDto[]) => {
          this.userDtos = userDtos;
        })
    );
  }

  onUserRowClicked(clickedUserDto: UserDto): void {
    this.subscriptions.add(
        this.userRestApiService.getUserByEmail(clickedUserDto.email).subscribe((userDto: UserDto) => {
            this.selectedUserToEdit = userDto;
            this.changeDetector.detectChanges();
            this.userFormComponent.populateFormGroup(this.selectedUserToEdit);
        })
    );
  }

  onSaveButtonClicked(): void {
    this.selectedUserToEdit = null;
    const userDto = this.userFormComponent.buildUserDto();
    this.subscriptions.add(
      this.userRestApiService.saveUser(userDto).subscribe(
          () => {},
          ( error: any ) => {
            console.error('Save user failed. ', error);
          },
          () => {
            console.log('User saved successfully. ', userDto);
          })
    );
  }

  onCancelButtonClicked(): void {
    this.selectedUserToEdit = null;
  }
}
