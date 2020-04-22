import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UsersTableRowModel } from 'features/admin/components/users-table/users-table-row.model';
import { UserDto } from 'shared/api/dtos/dto-models';
import { RoleHelperService } from 'shared/helper/role-helper.service';
import { isNil } from 'lodash';
import { UsersTableColumnType } from 'features/admin/components/users-table/users-table-column-type.enum';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnChanges {

  readonly nameColumnName = UsersTableColumnType.NAME_COLUMN_NAME;
  readonly emailColumnName = UsersTableColumnType.EMAIL_COLUMN_NAME;
  readonly rolesColumnName = UsersTableColumnType.ROLES_COLUMN_NAME;
  readonly editIconColumnName = UsersTableColumnType.EDIT_ICON_COLUMN_NAME;

  @Input() userDtos: UserDto[];

  @Input() columns: Set<UsersTableColumnType> = new Set([
    UsersTableColumnType.NAME_COLUMN_NAME,
    UsersTableColumnType.EMAIL_COLUMN_NAME,
    UsersTableColumnType.ROLES_COLUMN_NAME,
    UsersTableColumnType.EDIT_ICON_COLUMN_NAME
  ]);

  @Input() noDataMessage: string;

  @Output() tableRowClickedEvent = new EventEmitter<UserDto>();

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
            userDto,
            name: `${userDto.firstName} ${userDto.lastName}`,
            email: userDto.email,
            roleNames: this.getUserRoleCategories(userDto)
        });
      });
    }
  }

  onTableRowClicked(rowModel: UsersTableRowModel) {
    this.tableRowClickedEvent.emit(rowModel.userDto);
  }

  showColumn(columnName: string): boolean {
    switch (columnName) {
      case UsersTableColumnType.NAME_COLUMN_NAME.toString():
        return this.columns.has(UsersTableColumnType.NAME_COLUMN_NAME);
      case UsersTableColumnType.EMAIL_COLUMN_NAME.toString():
        return this.columns.has(UsersTableColumnType.EMAIL_COLUMN_NAME);
      case UsersTableColumnType.ROLES_COLUMN_NAME.toString():
        return this.columns.has(UsersTableColumnType.ROLES_COLUMN_NAME);
      case UsersTableColumnType.EDIT_ICON_COLUMN_NAME.toString():
        return this.columns.has(UsersTableColumnType.EDIT_ICON_COLUMN_NAME);
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
