import {RoleType, UserDto} from 'shared/api/dtos/dto-models';

export const userJpaAdminJpaSeller: UserDto = {
  id: 0,
  roles: [
    {
      id: 1,
      roleType: RoleType.ROLE_JPA_ADMIN,
      roleName: 'name'
    },
    {
      id: 2,
      roleType: RoleType.ROLE_JPA_SELLER,
      roleName: 'name'
    }
  ],
  email: 'email',
  firstName: 'name',
  lastName: 'name',
  customerId: null
};
