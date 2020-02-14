import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard extends KeycloakAuthGuard {

  constructor(protected router: Router, protected keycloakService: KeycloakService) {
    super(router, keycloakService);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>(
      async (resolve: any): Promise<boolean> => {
        if (this.authenticated) {
          return resolve(true);
        }
        this.keycloakService.login().then();
        return resolve(false);
      });
  }
}
