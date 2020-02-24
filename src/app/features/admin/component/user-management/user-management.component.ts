import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserRestApiService } from 'shared/api/user-rest-api.service';
import { UserDto } from 'shared/api/dtos/dto-models';
import { Observable, Subscription, of } from 'rxjs';
import { UserTableRowModel } from 'features/admin/component/user-management/user-table-row.model';
import { RoleHelperService } from 'shared/helper/role-helper.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {

  allUsers: Observable<UserTableRowModel[]>;

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
