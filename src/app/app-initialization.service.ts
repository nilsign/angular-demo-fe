import { Injectable } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {environment} from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppInitializationService {

  constructor(public keycloakService: KeycloakService) {
  }

  initApplication(): Promise<any> {
    return new Promise<any>(
        async (resolve: any, reject: any): Promise<any> => {
          try {
            await this.keycloakService.init({
              config: environment.keycloak,
              initOptions: {
                onLoad: 'login-required',
                checkLoginIframe: false
              },
              enableBearerInterceptor: true,
              bearerExcludedUrls: ['/assets']
            });
            resolve();
          } catch (error) {
            reject(error);
          }
        }
    );
  }
}
