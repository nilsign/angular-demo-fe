import { Injectable } from '@angular/core';
import { RoleDto, RoleType, UserDto } from 'shared/api/dtos/dto-models';
import { LoggedInUserRestApi } from 'shared/api/logged-in-user-rest-api.service';
import { isNil } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserHelperService {

  private loggedInUser: UserDto;

  constructor(public loggedInUserRestApi: LoggedInUserRestApi) {
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
  public loadLoggedInUser(): Promise<any> {
    return new Promise<UserDto>((resolve: any, reject: any): void => {
      this.loggedInUserRestApi.requestLoggedInUser().subscribe((loggedInUser: UserDto) => {
        try {
          this.loggedInUser = loggedInUser;
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}
