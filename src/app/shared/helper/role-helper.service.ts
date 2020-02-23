import { Injectable } from '@angular/core';
import {RoleDto, RoleType, UserDto} from 'shared/api/dtos/dto-models';

@Injectable({
  providedIn: 'root'
})
export class RoleHelperService {

  getRoleTypes(user: UserDto): Set<RoleType> {
    return new Set<RoleType>(
        user.roles.map<RoleType>((roleDto: RoleDto) => roleDto.roleType));
  }

  isSuperAdmin(user: UserDto): boolean {
    const roles = this.getRoleTypes(user);
    return roles.has(RoleType.ROLE_REALM_SUPERADMIN);
  }

  isAdmin(user: UserDto): boolean {
    const roles = this.getRoleTypes(user);
    return roles.has(RoleType.ROLE_REALM_SUPERADMIN)
        || roles.has(RoleType.ROLE_REALM_CLIENT_ADMIN)
        || roles.has(RoleType.ROLE_JPA_GLOBALADMIN)
        || roles.has(RoleType.ROLE_JPA_ADMIN);
  }

  isSeller(user: UserDto): boolean {
    const roles = this.getRoleTypes(user);
    return roles.has(RoleType.ROLE_REALM_CLIENT_SELLER)
        || roles.has(RoleType.ROLE_JPA_SELLER);
  }

  isBuyer(user: UserDto): boolean {
    const roles = this.getRoleTypes(user);
    return roles.has(RoleType.ROLE_REALM_CLIENT_BUYER)
        || roles.has(RoleType.ROLE_JPA_BUYER);
  }
}
