import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { UsersTableRowModel } from 'features/admin/component/users-table/users-table-row.model';
import { UserDto } from 'shared/api/dtos/dto-models';
import { RoleHelperService } from 'shared/helper/role-helper.service';
import { isNil } from 'lodash';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnChanges {

  static readonly NAME_COLUMN_NAME = 'Name';
  static readonly EMAIL_COLUMN_NAME = 'Email';
  static readonly ROLES_COLUMN_NAME = 'Roles';
  static readonly EDIT_ICON_COLUMN_NAME = 'Edit';

  readonly nameColumnName = UsersTableComponent.NAME_COLUMN_NAME;
  readonly emailColumnName = UsersTableComponent.EMAIL_COLUMN_NAME;
  readonly rolesColumnName = UsersTableComponent.ROLES_COLUMN_NAME;
  readonly editIconColumnName = UsersTableComponent.EDIT_ICON_COLUMN_NAME;

  @Input() userDtos: UserDto[];

  @Input() columns: Set<string> = new Set([
    UsersTableComponent.NAME_COLUMN_NAME,
    UsersTableComponent.EMAIL_COLUMN_NAME,
    UsersTableComponent.ROLES_COLUMN_NAME,
    UsersTableComponent.EDIT_ICON_COLUMN_NAME
  ]);

  tableRowModel: UsersTableRowModel[];

  constructor(public roleHelper: RoleHelperService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNil(changes.userDtos) && !isNil(changes.userDtos.currentValue)) {
      this.tableRowModel = [];
      (changes.userDtos.currentValue as UserDto[]).forEach((userDto: UserDto) => {
        this.tableRowModel.push({
            name: `${userDto.firstName} ${userDto.lastName}`,
            email: userDto.email,
            roleNames: this.getUserRoleCategories(userDto)
        });
      });
    }
  }

  showColumn(columnName: string): boolean {
    return this.columns.has(columnName);
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
