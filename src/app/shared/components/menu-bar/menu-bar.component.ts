import { Component } from '@angular/core';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {

  constructor(public loggedInUserHelperService: LoggedInUserHelperService) {
  }

  dashboardMenuItemPressed(): void {
    console.log('"Dashboard" MenuItem pressed.');
  }

  showAllUsersMenuItemPressed(): void {
    console.log('"Show all Users" MenuItem pressed.');
  }

  createUserMenuItemPressed(): void {
    console.log('"Create User" MenuItem pressed.');
  }

  editUserMenuItemPressed(): void {
    console.log('"Edit User" MenuItem pressed.');
  }

  deleteUserMenuItemPressed(): void {
    console.log('"Delete User" MenuItem pressed.');
  }

  logoutMenuItemPressed(): void {
    this.loggedInUserHelperService.logout();
  }
}
