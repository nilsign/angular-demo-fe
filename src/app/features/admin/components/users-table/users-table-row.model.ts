import { UserDto } from 'shared/api/dtos/dto-models';

export interface UsersTableRowModel {
  userDto: UserDto;
  name: string;
  email: string;
  roleNames: string;
}
