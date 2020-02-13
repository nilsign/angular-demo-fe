import { Injectable, OnDestroy } from '@angular/core';
import { RoleDto, RoleType, UserDto } from 'shared/api/dtos/dto-models';
import { LoggedInUserRestApi } from 'shared/api/logged-in-user-rest-api.service';
import { isNil } from 'lodash';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserHelperService implements OnDestroy {

  readonly subscriptions = new Subscription();

  private loggedInUser: UserDto;


  constructor(public loggedInUserRestApi: LoggedInUserRestApi) {
  }

  ngOnDestroy(): void {
    this.getSubscriptions().unsubscribe();
  }

  getLoggedInUser(): UserDto {
    if (!this.hasLoggedInUser()) {
      this.loadLoggedInUser().then();
    }
    return this.loggedInUser;
  }

  getLoggedInUserRoleTypes(): Set<RoleType> {
    return new Set<RoleType>(
        this.getLoggedInUser()
            .roles.map<RoleType>((roleDto: RoleDto) => roleDto.roleType));
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
          this.loggedInUserRestApi.requestLoggedInUser().subscribe(
            (loggedInUser: UserDto) => {
              this.loggedInUser = loggedInUser;
              resolve();
            },
            (error: any) => {
              reject(error);
            })
       );
    });
  }

  private getSubscriptions(): Subscription {
    return this.subscriptions;
  }
}
