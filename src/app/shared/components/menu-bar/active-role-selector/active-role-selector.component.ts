import { Component, OnInit } from '@angular/core';
import { ActiveViewType, LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';
import { NavigationHelperService } from 'shared/helper/navigation-helper.service';

@Component({
  selector: 'app-active-role-selector',
  templateUrl: './active-role-selector.component.html',
  styleUrls: ['./active-role-selector.component.scss']
})
export class ActiveRoleSelectorComponent implements OnInit {

  private readonly adminPopupItemLabel = 'Admin';
  private readonly sellerPopupItemLabel = 'Seller';
  private readonly buyerPopupItemLabel = 'Buyer';

  roleSelectionPopupModel: string[] = [];

  constructor(
      public loggedInUserHelperService: LoggedInUserHelperService,
      public navigationService: NavigationHelperService) {
  }

  ngOnInit(): void {
    if (this.loggedInUserHelperService.isMultiRole()) {
      if (this.loggedInUserHelperService.isAdmin()) {
        this.roleSelectionPopupModel.push(this.adminPopupItemLabel);
      }
      if (this.loggedInUserHelperService.isSeller()) {
        this.roleSelectionPopupModel.push(this.sellerPopupItemLabel);
      }
      if (this.loggedInUserHelperService.isBuyer()) {
        this.roleSelectionPopupModel.push(this.buyerPopupItemLabel);
      }
    }
  }

  getActiveRoleSelectorLabel(): string {
    if (!this.loggedInUserHelperService.hasLoggedInUser()) {
      return 'Bye-bye.';
    }
    if (this.loggedInUserHelperService.isBuyer()) {
      return `Hello ${this.loggedInUserHelperService.getLoggedInUser().firstName}`;
    }
    return this.loggedInUserHelperService.getActiveRoleDisplayName();
  }

  onActiveRoleSelectorLabelClicked(): void {
    if (!this.loggedInUserHelperService.isMultiRole()) {
      this.navigationService.navigateToActiveViewLandingPage();
    }
  }

  onRolePopupItemClicked(rolePopupItemLabel: string): void {
    if (this.adminPopupItemLabel === rolePopupItemLabel) {
      this.navigationService.navigateToAdminsLandingPage();
      this.loggedInUserHelperService.setActiveViewType(ActiveViewType.ADMIN_VIEW);
    } else if (this.sellerPopupItemLabel === rolePopupItemLabel) {
      this.navigationService.navigateToSellersLandingPage();
      this.loggedInUserHelperService.setActiveViewType(ActiveViewType.SELLER_VIEW);
    } else if (this.buyerPopupItemLabel === rolePopupItemLabel) {
      this.navigationService.navigateToBuyersLandingPage();
      this.loggedInUserHelperService.setActiveViewType(ActiveViewType.BUYER_VIEW);
    }
  }

  isRolePopupItemRepresentingTheActiveView(rolePopupItemLabel: string): boolean {
    return this.loggedInUserHelperService.isAdminViewActive() && this.adminPopupItemLabel === rolePopupItemLabel
        || this.loggedInUserHelperService.isSellerViewActive() && this.sellerPopupItemLabel === rolePopupItemLabel
        || this.loggedInUserHelperService.isBuyerViewActive() && this.buyerPopupItemLabel === rolePopupItemLabel;
  }
}
