import { Injectable, OnDestroy } from '@angular/core';
import { RoleType, UserDto } from 'shared/api/dtos/dto-models';
import { LoggedInUserRestApiService } from 'shared/api/logged-in-user-rest-api.service';
import { isNil } from 'lodash';
import { Subscription } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { RoleHelperService } from 'shared/helper/role-helper.service';

export enum ActiveViewType {
  ADMIN_VIEW,
  SELLER_VIEW,
  BUYER_VIEW
}

@Injectable({
  providedIn: 'root'
})
export class LoggedInUserHelperService implements OnDestroy {

  readonly subscriptions = new Subscription();

  private loggedInUser: UserDto;

  // In case the logged in user owns more than one role, this variable defines which role related view is displayed.
  private activeViewType: ActiveViewType;

  constructor(
      public keycloakService: KeycloakService,
      public loggedInUserRestApi: LoggedInUserRestApiService,
      public roleHelper: RoleHelperService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
                if (this.isBuyer()) {
                  this.activeViewType = ActiveViewType.BUYER_VIEW;
                } else if (this.isSeller()) {
                  this.activeViewType = ActiveViewType.SELLER_VIEW;
                } else if (this.isAdmin()) {
                  this.activeViewType = ActiveViewType.ADMIN_VIEW;
                }
                return resolve();
              },
              (error: any) => {
                return reject(error);
              })
      );
    });
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
    this.keycloakService.logout().then();
    this.loggedInUser = null;
  }

  hasLoggedInUser(): boolean {
    return !isNil(this.loggedInUser);
  }

  isSuperAdmin(): boolean {
    return this.hasLoggedInUser() && this.roleHelper.isSuperAdmin(this.loggedInUser);
  }

  isAdmin(): boolean {
    return this.hasLoggedInUser() && this.roleHelper.isAdmin(this.loggedInUser);
  }

  isSeller(): boolean {
    return this.hasLoggedInUser() && this.roleHelper.isSeller(this.loggedInUser);
  }

  isBuyer(): boolean {
    return this.hasLoggedInUser() && this.roleHelper.isBuyer(this.loggedInUser);
  }

  isAdminViewActive(): boolean {
    return this.activeViewType === ActiveViewType.ADMIN_VIEW;
  }

  isSellerViewActive(): boolean {
    return this.activeViewType === ActiveViewType.SELLER_VIEW;
  }

  isBuyerViewActive(): boolean {
    return this.activeViewType === ActiveViewType.BUYER_VIEW;
  }

  setActiveViewType(activeViewType: ActiveViewType): void {
    this.activeViewType = activeViewType;
  }

  isMultiRole(): boolean {
    return this.roleHelper.isMultiRole(this.loggedInUser);
  }

  getActiveRoleDisplayName(): ActiveViewType {
    return this.activeViewType;
  }
}
