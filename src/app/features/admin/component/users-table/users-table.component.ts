import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UsersTableRowModel } from 'features/admin/component/users-table/users-table-row.model';
import { UserDto } from 'shared/api/dtos/dto-models';
import { RoleHelperService } from 'shared/helper/role-helper.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit, OnDestroy {

  @Input() userDtos: Observable<UserDto[]>;

  tableModel: UsersTableRowModel[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(public roleHelper: RoleHelperService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.userDtos.subscribe((userDtos: UserDto[]) => {
      this.tableModel = userDtos.map((user: UserDto) => {
        return {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          roleNames: this.getUserRoleCategories(user)
        };
      });
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
    return roleCategories;
  }
}
