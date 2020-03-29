import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { UsersTableRowModel } from 'features/admin/component/users-table/users-table-row.model';
import { UserDto } from 'shared/api/dtos/dto-models';
import { RoleHelperService } from 'shared/helper/role-helper.service';
import { isNil } from 'lodash';
import { UserTableColumnType } from 'features/admin/component/users-table/user-table-column-type.enum';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnChanges {

  readonly nameColumnName = UserTableColumnType.NAME_COLUMN_NAME;
  readonly emailColumnName = UserTableColumnType.EMAIL_COLUMN_NAME;
  readonly rolesColumnName = UserTableColumnType.ROLES_COLUMN_NAME;
  readonly editIconColumnName = UserTableColumnType.EDIT_ICON_COLUMN_NAME;

  @Input() userDtos: UserDto[];

  @Input() columns: Set<UserTableColumnType> = new Set([
    UserTableColumnType.NAME_COLUMN_NAME,
    UserTableColumnType.EMAIL_COLUMN_NAME,
    UserTableColumnType.ROLES_COLUMN_NAME,
    UserTableColumnType.EDIT_ICON_COLUMN_NAME
  ]);

  @Input() noDataMessage: string;

  tableRowModel: UsersTableRowModel[];

  get hasNoDataMessage(): boolean {
    return !isNil(this.noDataMessage)
        && !isNil(this.tableRowModel)
        && this.tableRowModel.length === 0;
  }

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
    switch (columnName) {
      case UserTableColumnType.NAME_COLUMN_NAME.toString():
        return this.columns.has(UserTableColumnType.NAME_COLUMN_NAME);
      case UserTableColumnType.EMAIL_COLUMN_NAME.toString():
        return this.columns.has(UserTableColumnType.EMAIL_COLUMN_NAME);
      case UserTableColumnType.ROLES_COLUMN_NAME.toString():
        return this.columns.has(UserTableColumnType.ROLES_COLUMN_NAME);
      case UserTableColumnType.EDIT_ICON_COLUMN_NAME.toString():
        return this.columns.has(UserTableColumnType.EDIT_ICON_COLUMN_NAME);
    }
    return false;
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
