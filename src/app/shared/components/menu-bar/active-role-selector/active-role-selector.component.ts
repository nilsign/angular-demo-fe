import { Component, OnInit } from '@angular/core';
import {LoggedInUserHelperService} from 'shared/helper/logged-in-user-helper.service';
import {NavigationHelperService} from 'shared/helper/navigation-helper.service';

@Component({
  selector: 'app-active-role-selector',
  templateUrl: './active-role-selector.component.html',
  styleUrls: ['./active-role-selector.component.scss']
})
export class ActiveRoleSelectorComponent implements OnInit {

  label = '';

  constructor(
      public loggedInUserHelperService: LoggedInUserHelperService,
      public navigationService: NavigationHelperService) {
  }

  ngOnInit(): void {
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

  onRoleNameClicked(): void {
    if (!this.loggedInUserHelperService.isMultiRole()) {
      this.navigationService.navigateToActiveViewLandingPage();
    }
  }
}
