import { RoleDto, RoleType, UserDto } from 'shared/api/dtos/dto-models';

export const superAdminRoleDto: RoleDto = {
  id: 0,
  roleType: RoleType.ROLE_REALM_SUPERADMIN,
  roleName: 'super admin role name'
};

export const adminRoleDto: RoleDto = {
  id: 1,
  roleType: RoleType.ROLE_JPA_ADMIN,
  roleName: 'admin role name'
};

export const sellerRoleDto: RoleDto = {
  id: 2,
  roleType: RoleType.ROLE_JPA_SELLER,
  roleName: 'seller role name'
};

export const buyerRoleDto: RoleDto = {
  id: 3,
  roleType: RoleType.ROLE_JPA_BUYER,
  roleName: 'buyer role name'
};

export const userJpaBuyer: UserDto = {
  id: 4,
  roles: [ buyerRoleDto ],
  email: 'buyer email',
  firstName: 'buyer first name',
  lastName: 'buyer second name',
  customerId: null
};

export const userJpaSeller: UserDto = {
  id: 5,
  roles: [ sellerRoleDto ],
  email: 'seller email',
  firstName: 'seller first name',
  lastName: 'seller last name',
  customerId: null
};

export const userJpaAdmin: UserDto = {
  id: 6,
  roles: [ adminRoleDto ],
  email: 'admin email',
  firstName: 'admin first name',
  lastName: 'admin last name',
  customerId: null
};

export const userRealmSuperAdmin: UserDto = {
  id: 7,
  roles: [ superAdminRoleDto ],
  email: 'super admin email',
  firstName: 'super admin first name',
  lastName: 'super admin last name',
  customerId: null
};

export const userJpaAdminJpaSeller: UserDto = {
  id: 8,
  roles: [ adminRoleDto, sellerRoleDto ],
  email: 'admin-seller email',
  firstName: 'admin-seller first name',
  lastName: 'admin-seller last name',
  customerId: null
};
