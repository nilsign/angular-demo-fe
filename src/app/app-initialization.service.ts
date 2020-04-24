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
    return new Promise<any>(async (resolve: any, reject: any): Promise<any> => {
      let keyCloakInitialized: boolean;
      await this.initKeycloak()
          .then(() => keyCloakInitialized = true)
          .catch((error: Error) => {
            keyCloakInitialized = false;
            console.error(`Couldn\'t initialize Keycloak Service. (Error: ${error})`);
            return reject(error);
          });
      if (keyCloakInitialized) {
        await this.loadLoggedInUser()
            .then()
            .catch((error: Error) => {
              console.error(`Couldn\'t load logged in user. (Error: ${error})`);
              return reject(error);
            });
      }
      return resolve();
    });
  }

  private initKeycloak(): Promise<any> {
    return this.keycloakService.init({
      config: environment.keycloak,
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
        promiseType: 'legacy'
      },
      enableBearerInterceptor: true,
      bearerExcludedUrls: ['/assets']
    });
  }

  private loadLoggedInUser(): Promise<any> {
    return this.loggedInUserHelper.loadLoggedInUser();
  }
}
