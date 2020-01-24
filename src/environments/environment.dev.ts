/*
 * For easier debugging in development mode, you can import the following file to ignore zone related error stack frames
 * such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';

import { Credentials, KeycloakConfig } from 'keycloak-angular/lib/core/interfaces/keycloak-config';

const keycloakCredentials: Credentials = {
  secret: '6a06b69f-8108-4d40-af64-ed1325385c5d'
};

const keycloakConfig: KeycloakConfig = {
  realm: 'DemoProjectRealm',
  clientId: 'DemoProjectAngularFrontendClient',
  url: 'http://localhost:8100/auth',
  credentials: keycloakCredentials
};

export const environment = {
  prod: false,
  envName: 'dev',
  baseUrl: 'http://localhost:4200',
  keycloak: keycloakConfig,
};
