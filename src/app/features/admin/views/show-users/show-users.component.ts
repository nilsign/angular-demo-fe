import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserRestApiService } from 'shared/api/user-rest-api.service';
import { UserDto } from 'shared/api/dtos/dto-models';
import { Subscription } from 'rxjs';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';
import { UserTableColumnType } from 'features/admin/component/users-table/user-table-column-type.enum';

@Component({
  templateUrl: './show-users.component.html'
})
export class ShowUsersComponent implements OnInit, OnDestroy {

  userDtos: UserDto[];
  columns = new Set<UserTableColumnType> ([
    UserTableColumnType.NAME_COLUMN_NAME,
    UserTableColumnType.EMAIL_COLUMN_NAME,
    UserTableColumnType.ROLES_COLUMN_NAME
  ]);

  private subscriptions: Subscription = new Subscription();

  constructor(
      public userRestApi: UserRestApiService,
      public loggedInUserHelperService: LoggedInUserHelperService) {
  }

  ngOnInit(): void {
    if (this.loggedInUserHelperService.isSuperAdmin()) {
      this.columns.add(UserTableColumnType.EDIT_ICON_COLUMN_NAME);
    }
    this.subscriptions.add(
        this.userRestApi.getAllUsers().subscribe((userDtos: UserDto[]) => {
           this.userDtos = userDtos;
        })
     );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
