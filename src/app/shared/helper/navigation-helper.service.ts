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
