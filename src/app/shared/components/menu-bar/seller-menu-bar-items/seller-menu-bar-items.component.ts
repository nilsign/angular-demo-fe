import { Component } from '@angular/core';
import { NavigationHelperService } from 'shared/helper/navigation-helper.service';

@Component({
  selector: 'app-seller-menu-bar-items',
  templateUrl: './seller-menu-bar-items.component.html'
})
export class SellerMenuBarItemsComponent {

  activeMenuItemIndex = 0;

  constructor(public navigationService: NavigationHelperService) {
  }

  onDashboardMenuItemClicked(): void {
    this.navigationService.navigateToSellerDashboard();
    this.activeMenuItemIndex = 0;
  }

  onProductsMenuItemClicked(): void {
    this.navigationService.navigateToProducts();
    this.activeMenuItemIndex = 1;
  }
}
