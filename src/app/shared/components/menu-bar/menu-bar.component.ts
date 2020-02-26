import { Component } from '@angular/core';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';
import { NavigationHelperService } from 'shared/helper/navigation-helper.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {

  constructor(
      public loggedInUserHelperService: LoggedInUserHelperService,
      public navigationService: NavigationHelperService) {
  }

  onAppIconClicked(): void {
    this.navigationService.navigateToActiveViewLandingPage();
  }

  onLogoutMenuItemClicked(): void {
    this.loggedInUserHelperService.logout();
  }
}
