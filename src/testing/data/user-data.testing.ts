import { RoleDto, RoleType, UserDto } from 'shared/api/dtos/dto-models';

export const superAdminRoleDto: RoleDto = {
  id: 0,
  roleType: RoleType.ROLE_REALM_SUPERADMIN,
  roleName: 'name'
};

export const adminRoleDto: RoleDto = {
  id: 1,
  roleType: RoleType.ROLE_JPA_ADMIN,
  roleName: 'name'
};

export const sellerRoleDto: RoleDto = {
  id: 2,
  roleType: RoleType.ROLE_JPA_SELLER,
  roleName: 'name'
};

export const buyerRoleDto: RoleDto = {
  id: 3,
  roleType: RoleType.ROLE_JPA_BUYER,
  roleName: 'name'
};

export const userJpaBuyer: UserDto = {
  id: 4,
  roles: [ buyerRoleDto ],
  email: 'email',
  firstName: 'name',
  lastName: 'name',
  customerId: null
};

export const userJpaSeller: UserDto = {
  id: 5,
  roles: [ sellerRoleDto ],
  email: 'email',
  firstName: 'name',
  lastName: 'name',
  customerId: null
};

export const userJpaAdmin: UserDto = {
  id: 6,
  roles: [ adminRoleDto ],
  email: 'email',
  firstName: 'name',
  lastName: 'name',
  customerId: null
};

export const userRealmSuperAdmin: UserDto = {
  id: 7,
  roles: [ superAdminRoleDto ],
  email: 'email',
  firstName: 'name',
  lastName: 'name',
  customerId: null
};

export const userJpaAdminJpaSeller: UserDto = {
  id: 8,
  roles: [ adminRoleDto, sellerRoleDto ],
  email: 'email',
  firstName: 'name',
  lastName: 'name',
  customerId: null
};
