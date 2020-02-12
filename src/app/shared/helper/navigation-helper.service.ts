import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoleType } from 'shared/api/dtos/dto-models';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationHelperService {

  constructor(
      public router: Router,
      public loggedInUserHelper: LoggedInUserHelperService) {
  }

  navigateToRoleDependentLandingPage(): void {
    const roleTypes = this.loggedInUserHelper.getLoggedInUserRoleTypes();
    if (roleTypes.has(RoleType.ROLE_REALM_SUPERADMIN)
        || roleTypes.has(RoleType.ROLE_REALM_CLIENT_ADMIN)
        || roleTypes.has(RoleType.ROLE_JPA_GLOBALADMIN)
        || roleTypes.has(RoleType.ROLE_JPA_ADMIN)) {
      this.navigateToAdminsLandingPage();
      return;
    } else if (roleTypes.has(RoleType.ROLE_REALM_CLIENT_SELLER)
        || roleTypes.has(RoleType.ROLE_JPA_SELLER)) {
      this.navigateToSellersLandingPage();
      return;
    }  else if (roleTypes.has(RoleType.ROLE_REALM_CLIENT_BUYER)
        || roleTypes.has(RoleType.ROLE_JPA_BUYER)) {
      this.navigateToBuyersLandingPage();
      return;
    }
    console.error('Logged in user has not a valid authorization role.');
  }

  navigateToAdminsLandingPage(): void  {
    this.router.navigate(['admin']).then();
  }

  navigateToSellersLandingPage(): void  {
    this.router.navigate(['seller']).then();
  }

  navigateToBuyersLandingPage(): void  {
    this.router.navigate(['buyer']).then();
  }
}
