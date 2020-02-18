import { Injectable, OnDestroy } from '@angular/core';
import { RoleType, UserDto } from 'shared/api/dtos/dto-models';
import { LoggedInUserRestApiService } from 'shared/api/logged-in-user-rest-api.service';
import { isNil } from 'lodash';
import { Subscription } from 'rxjs';
import {RoleHelperService} from 'shared/helper/role-helper.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserHelperService implements OnDestroy {

  readonly subscriptions = new Subscription();

  private loggedInUser: UserDto;

  constructor(
      public loggedInUserRestApi: LoggedInUserRestApiService,
      public roleHelper: RoleHelperService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getLoggedInUser(): UserDto {
    if (!this.hasLoggedInUser()) {
      this.loadLoggedInUser().then();
    }
    return this.loggedInUser;
  }

  getLoggedInUserRoleTypes(): Set<RoleType> {
    return !this.hasLoggedInUser()
        ? new Set<RoleType>()
        : this.roleHelper.getRoleTypes(this.loggedInUser);
  }

  logout(): void {
    this.loggedInUser = null;
  }

  hasLoggedInUser(): boolean {
    return !isNil(this.loggedInUser);
  }

  /**
   * This function is only executed when the application is initialized, to ensure that the user service has loaded the
   * logged in user data before the first page is rendered. Note, that the APP_INITIALIZER does not support Observable,
   * so Promise has to used as return type here. See app.module.ts.
   */
  loadLoggedInUser(): Promise<any> {
    return new Promise<UserDto>((resolve: any, reject: any): void => {
      this.subscriptions.add(
          this.loggedInUserRestApi.getLoggedInUser().subscribe(
            (loggedInUser: UserDto) => {
              this.loggedInUser = loggedInUser;
              return resolve();
            },
            (error: any) => {
              return reject(error);
            })
       );
    });
  }

  isAdmin(): boolean {
    return !this.hasLoggedInUser()
        ? false
        : this.roleHelper.isAdmin(this.loggedInUser);
  }

  isSeller(): boolean {
    return !this.hasLoggedInUser()
        ? false
        : this.roleHelper.isSeller(this.loggedInUser);
  }

  isBuyer(): boolean {
    return !this.hasLoggedInUser()
        ? false
        : this.roleHelper.isBuyer(this.loggedInUser);
  }
}
