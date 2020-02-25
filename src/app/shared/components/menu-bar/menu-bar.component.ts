import { Component } from '@angular/core';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';
import {NavigationHelperService} from 'shared/helper/navigation-helper.service';

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

  dashboardMenuItemPressed(): void {
    this.navigationService.navigateToDashboard();
    this.activeMenuItemIndex = 0;
  }

  settingsMenuItemPressed(): void {
    this.navigationService.navigateToSettings();
    this.activeMenuItemIndex = 1;
  }

  showAllUsersMenuItemPressed(): void {
    this.navigationService.navigateToUsers();
    this.activeMenuItemIndex = 2;
  }

  createUserMenuItemPressed(): void {
    this.navigationService.navigateToCreateUser();
    this.activeMenuItemIndex = 2;
  }

  editUserMenuItemPressed(): void {
    this.navigationService.navigateToEditUser();
    this.activeMenuItemIndex = 2;
  }

  logoutMenuItemPressed(): void {
    this.loggedInUserHelperService.logout();
  }
}
