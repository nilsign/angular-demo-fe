import { Component } from '@angular/core';
import { NavigationHelperService } from 'shared/helper/navigation-helper.service';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';

@Component({
  selector: 'app-admin-menu-bar-items',
  templateUrl: './admin-menu-bar-items.component.html',
  styleUrls: ['./admin-menu-bar-items.component.scss']
})
export class AdminMenuBarItemsComponent {

  activeMenuItemIndex = 0;

  constructor(
      public navigationService: NavigationHelperService,
      public loggedInUserHelperService: LoggedInUserHelperService) {
  }

  onDashboardMenuItemClicked(): void {
    this.navigationService.navigateToAdminDashboard();
    this.activeMenuItemIndex = 0;
  }

  onSettingsMenuItemClicked(): void {
    this.navigationService.navigateToSettings();
    this.activeMenuItemIndex = 1;
  }

  onShowAllUsersMenuItemClicked(): void {
    this.navigationService.navigateToUsers();
    this.activeMenuItemIndex = 2;
  }

  onCreateUserMenuItemClicked(): void {
    this.navigationService.navigateToCreateUser();
    this.activeMenuItemIndex = 2;
  }

  onEditUserMenuItemClicked(): void {
    this.navigationService.navigateToEditUser();
    this.activeMenuItemIndex = 2;
  }
}
