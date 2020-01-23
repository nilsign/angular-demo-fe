import { Injectable } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppInitializationService {

  constructor(
      private keycloakService: KeycloakService
  ) {
  }

  initApplication(): Promise<any> {
    return new Promise(
        async (resolve: any, reject: any): Promise<any> => {
          try {
            await this.keycloakService.init({
              config: environment.keycloak,
              initOptions: {
                onLoad: 'login-required',
                checkLoginIframe: false
              },
              enableBearerInterceptor: true,
              bearerExcludedUrls: ['/assets', '/app-root']
            });
            resolve();
          } catch (error) {
            reject(error);
          }
        }
    );
  }
}
