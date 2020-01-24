import { TestBed } from '@angular/core/testing';

import { AppInitializationService } from 'app/app-initialization.service';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'environments/environment';

describe('AppInitializationService', () => {

  let testObj: AppInitializationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeycloakService]
    });
    testObj = TestBed.get(AppInitializationService);
  });

  it('should be created', () => {
    expect(testObj).toBeTruthy();
  });

  it('should call keycloak service init', () => {
    const spy = spyOn(testObj.keycloakService, 'init');

    testObj.initApplication();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      config: environment.keycloak,
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      },
      enableBearerInterceptor: true,
      bearerExcludedUrls: ['/assets']
    });
  });
});
