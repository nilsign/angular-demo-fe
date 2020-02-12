import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'environments/environment';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializationService {

  constructor(
      public keycloakService: KeycloakService,
      public loggedInUserHelper: LoggedInUserHelperService) {
  }

  initApplication(): Promise<any> {
    return new Promise<any>(
        async (resolve: any, reject: any): Promise<any> => {
          try {
            await this.keycloakService.init({
              config: environment.keycloak,
              initOptions: {
                onLoad: 'login-required',
                checkLoginIframe: false,
                promiseType: 'legacy'
              },
              enableBearerInterceptor: true,
              bearerExcludedUrls: ['/assets']
            });
          } catch (error) {
            console.error('Couldn\'t initialize Keycloak Service.');
            reject(error);
            return;
          }
          try {
            await this.loggedInUserHelper.loadLoggedInUser();
            resolve();
          } catch (error) {
            console.error('Couldn\'t load logged in user.');
            reject(error);
          }
        }
    );
  }
}
