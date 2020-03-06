import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminAuthorizationGuard implements CanActivate {

  constructor(
      public loggedInUserService: LoggedInUserHelperService,
      public keycloakService: KeycloakService) {
  }

  canActivate(): boolean {
    if (this.loggedInUserService.isSuperAdmin()) {
      return true;
    }
    this.keycloakService.login().then();
    return false;
  }
}
