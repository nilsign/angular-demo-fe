import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserRestApiService } from 'shared/api/user-rest-api.service';
import { UserDto } from 'shared/api/dtos/dto-models';
import { Subscription } from 'rxjs';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';
import { UsersTableColumnType } from 'features/admin/components/users-table/users-table-column-type.enum';

@Component({
  templateUrl: './show-users.component.html'
})
export class ShowUsersComponent implements OnInit, OnDestroy {

  userDtos: UserDto[];
  columns = new Set<UsersTableColumnType> ([
    UsersTableColumnType.NAME_COLUMN_NAME,
    UsersTableColumnType.EMAIL_COLUMN_NAME,
    UsersTableColumnType.ROLES_COLUMN_NAME
  ]);

  private subscriptions: Subscription = new Subscription();

  constructor(
      public userRestApi: UserRestApiService,
      public loggedInUserHelperService: LoggedInUserHelperService) {
  }

  ngOnInit(): void {
    if (this.loggedInUserHelperService.isSuperAdmin()) {
      this.columns.add(UsersTableColumnType.EDIT_ICON_COLUMN_NAME);
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
