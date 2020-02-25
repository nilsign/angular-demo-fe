import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserRestApiService } from 'shared/api/user-rest-api.service';
import { UserDto } from 'shared/api/dtos/dto-models';
import { Observable, Subscription, of } from 'rxjs';
import { UsersTableRowModel } from 'features/admin/component/users/users-table-row.model';
import { RoleHelperService } from 'shared/helper/role-helper.service';

@Component({
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit, OnDestroy {

  allUsers: Observable<UsersTableRowModel[]>;

  private subscriptions: Subscription = new Subscription();

  constructor(
      public userRestApi: UserRestApiService,
      public roleHelper: RoleHelperService) {
  }

  ngOnInit(): void {
   this.loadAllUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadAllUsers(): void {
    this.subscriptions.add(
        this.userRestApi.getAllUsers().subscribe((users: UserDto[]) => {
          this.allUsers = of(
              users.map((user: UserDto) => {
                return {
                  name: `${user.firstName} ${user.lastName}`,
                  email: user.email,
                  roleNames: this.getUserRoleCategories(user)
                };
              }));
        })
    );
  }

  private getUserRoleCategories(user: UserDto): string {
    let roleCategories = '';
    if (this.roleHelper.isSuperAdmin(user)) {
      roleCategories = 'GLOBALADMIN';
    } else if (this.roleHelper.isAdmin(user)) {
      roleCategories = 'ADMIN';
    }
    if (this.roleHelper.isSeller(user)) {
      roleCategories += roleCategories.length ? ', SELLER' : 'SELLER';
    }
    if (this.roleHelper.isBuyer(user)) {
      roleCategories += roleCategories.length ? ', BUYER' : 'BUYER';
    }
    if (!roleCategories.length) {
      return 'UNKNOWN';
    }
    return roleCategories;
  }
}
