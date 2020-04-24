import { Component } from '@angular/core';
import {NavigationHelperService} from 'shared/helper/navigation-helper.service';

@Component({
  selector: 'app-buyer-menu-bar-items',
  templateUrl: './buyer-menu-bar-items.component.html'
})
export class BuyerMenuBarItemsComponent {

  activeMenuItemIndex = 0;

  constructor(public navigationService: NavigationHelperService) {
  }

  onShopClicked(): void {
    this.navigationService.navigateToShop();
    this.activeMenuItemIndex = 0;
  }

  onMyOrdersMenuItemClicked() {
    this.navigationService.navigateToMyOrders();
    this.activeMenuItemIndex = 1;
  }
}
