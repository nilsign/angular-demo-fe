import { Component , Input, OnChanges, SimpleChanges } from '@angular/core';
import { UsersTableRowModel } from 'features/admin/component/users-table/users-table-row.model';
import { UserDto } from 'shared/api/dtos/dto-models';
import { RoleHelperService } from 'shared/helper/role-helper.service';
import { isNil } from 'lodash';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnChanges {

  @Input() userDtos: UserDto[];

  tableModel: UsersTableRowModel[];

  constructor(public roleHelper: RoleHelperService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNil(changes.userDtos) && !isNil(changes.userDtos.currentValue)) {
      this.tableModel = [];
      (changes.userDtos.currentValue as UserDto[]).forEach((userDto: UserDto) => {
        this.tableModel.push({
            name: `${userDto.firstName} ${userDto.lastName}`,
            email: userDto.email,
            roleNames: this.getUserRoleCategories(userDto)
        });
      });
    }
  }

  private getUserRoleCategories(user: UserDto): string {
    let roleCategories = '';
    if (!isNil(user.roles)) {
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
    }
    return roleCategories;
  }
}
