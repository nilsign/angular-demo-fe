import { TestBed } from '@angular/core/testing';
import { AppInitializationService } from 'app/app-initialization.service';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'environments/environment';
import { HttpClient, HttpHandler } from '@angular/common/http';
import {LoggedInUserHelperService} from 'shared/helper/logged-in-user-helper.service';
import {voidResolvedPromise} from 'testing/data/promise.testing';

describe('AppInitializationService', () => {

  let testObj: AppInitializationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KeycloakService,
        LoggedInUserHelperService,
        HttpClient,
        HttpHandler
      ]
    });
    testObj = TestBed.get(AppInitializationService);
  });

  it('should be created', () => {
    expect(testObj).toBeTruthy();
  });

  it('should call keycloak service init', async () => {
    const spy = spyOn(testObj.keycloakService, 'init').and.returnValue(voidResolvedPromise);
    spyOn(testObj.loggedInUserHelper, 'loadLoggedInUser').and.returnValue(voidResolvedPromise);

    await testObj.initApplication();

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

  it('should request logged in user', async () => {
    spyOn(testObj.keycloakService, 'init').and.returnValue(voidResolvedPromise);
    const spy = spyOn(testObj.loggedInUserHelper, 'loadLoggedInUser').and.returnValue(voidResolvedPromise);

    await testObj.initApplication();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
