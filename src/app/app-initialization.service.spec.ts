import {TestBed, tick} from '@angular/core/testing';

import { AppInitializationService } from 'app/app-initialization.service';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'environments/environment';
import { LoggedInUserRepositoryService } from 'shared/api/logged-in-user-repository.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('AppInitializationService', () => {

  let testObj: AppInitializationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          KeycloakService,
          LoggedInUserRepositoryService,
          HttpClient,
          HttpHandler
      ]
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
        checkLoginIframe: false,
        promiseType: 'legacy'
      },
      enableBearerInterceptor: true,
      bearerExcludedUrls: ['/assets']
    });
  });

  it('should request logged in user', () => {
    const spy = spyOn(testObj.loggedInUserRepository, 'loadLoggedInUser');

    testObj.initApplication();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
