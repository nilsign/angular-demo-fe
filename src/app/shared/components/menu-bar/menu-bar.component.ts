import { Component } from '@angular/core';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';
import { NavigationHelperService } from 'shared/helper/navigation-helper.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {

  activeMenuItemIndex = 0;

  constructor(
      public loggedInUserHelperService: LoggedInUserHelperService,
      public navigationService: NavigationHelperService) {
  }

  onAppIconClicked(): void {
    this.navigationService.navigateToActiveViewLandingPage();
  }

  onRoleNameClicked(): void {
    if (!this.loggedInUserHelperService.isMultiRole()) {
      this.onAppIconClicked();
      return;
    }
  }

  onDashboardMenuItemClicked(): void {
    this.navigationService.navigateToDashboard();
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

  onLogoutMenuItemClicked(): void {
    this.loggedInUserHelperService.logout();
  }
}
