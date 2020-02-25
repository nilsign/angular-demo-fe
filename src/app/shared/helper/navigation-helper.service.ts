import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
    if (this.loggedInUserHelper.isAdmin()) {
      this.navigateToAdminsLandingPage();
    } else if (this.loggedInUserHelper.isSeller()) {
      this.navigateToSellersLandingPage();
    }  else if (this.loggedInUserHelper.isBuyer()) {
      this.navigateToBuyersLandingPage();
    } else {
      console.error('Logged in user has not a valid authorization role.');
    }
  }

  // Admin role navigations.
  navigateToAdminsLandingPage(): void  {
    this.navigateToDashboard();
  }

  navigateToDashboard(): void  {
    this.router.navigate(['admin/dashboard']).then();
  }

  navigateToSettings(): void {
    this.router.navigate(['admin/settings']).then();
  }

  navigateToUsers(): void  {
    this.router.navigate(['admin/show-users']).then();
  }

  navigateToCreateUser(): void  {
    this.router.navigate(['admin/create-user']).then();
  }

  navigateToEditUser(): void  {
    this.router.navigate(['admin/edit-user']).then();
  }

  // Seller role navigations.
  navigateToSellersLandingPage(): void  {
    this.router.navigate(['seller']).then();
  }

  // Buyer role navigations.
  navigateToBuyersLandingPage(): void  {
    this.router.navigate(['buyer']).then();
  }


}
