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

  navigateToActiveViewLandingPage(): void {
    if (this.loggedInUserHelper.isAdminViewActive()) {
      this.navigateToAdminsLandingPage();
    } else if (this.loggedInUserHelper.isSellerViewActive()) {
      this.navigateToSellersLandingPage();
    } else if (this.loggedInUserHelper.isBuyerViewActive()) {
      this.navigateToBuyersLandingPage();
    }
  }

  // Admin role navigations.
  navigateToAdminsLandingPage(): void  {
    this.navigateToAdminDashboard();
  }

  navigateToAdminDashboard(): void  {
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

  navigateToSellerDashboard(): void {
    this.router.navigate(['seller/dashboard']).then();
  }

  navigateToProducts(): void {
    this.router.navigate(['seller/products']).then();
  }

  // Buyer role navigations.
  navigateToBuyersLandingPage(): void  {
    this.router.navigate(['buyer']).then();
  }

  navigateToShop(): void {
    this.router.navigate(['buyer/shop']).then();
  }

  navigateToMyOrders(): void {
    this.router.navigate(['buyer/my-orders']).then();
  }
}
