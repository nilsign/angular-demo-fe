import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'environments/environment';
import { LoggedInUserRepositoryService } from 'shared/api/logged-in-user-repository.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializationService {

  constructor(
      public keycloakService: KeycloakService,
      public loggedInUserRepository: LoggedInUserRepositoryService) {
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
            await this.loggedInUserRepository.loadLoggedInUser();
            resolve();
          } catch (error) {
            reject(error);
          }
        }
    );
  }
}
