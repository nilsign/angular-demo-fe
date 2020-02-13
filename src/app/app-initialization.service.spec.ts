import { TestBed } from '@angular/core/testing';
import { AppInitializationService } from 'app/app-initialization.service';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'environments/environment';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';

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
    const spy = spyOn(testObj.keycloakService, 'init').and.returnValue(Promise.resolve(true));
    spyOn(testObj.loggedInUserHelper, 'loadLoggedInUser').and.returnValue(Promise.resolve(true));

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
    spyOn(testObj.keycloakService, 'init').and.returnValue(Promise.resolve(true));
    const spy = spyOn(testObj.loggedInUserHelper, 'loadLoggedInUser').and.returnValue(Promise.resolve(true));

    await testObj.initApplication();

    expect(spy).toHaveBeenCalledTimes(1);
  });


  it('should log error on failed keycloak initialization', async () => {
    const errorMsg = 'error-msg';
    const spy1 = spyOn(testObj.keycloakService, 'init').and.callFake(
        () => Promise.reject(errorMsg));
    const spy2 = spyOn(testObj.loggedInUserHelper, 'loadLoggedInUser');
    const spy3 = spyOn(console, 'error');

    await testObj.initApplication().catch(() => { return; });

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).not.toHaveBeenCalled();
    expect(spy3).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledWith(`Couldn\'t initialize Keycloak Service. (Error: ${errorMsg})`);
  });

  it('should log error on failed logged in user request', async () => {
    const errorMsg = 'error-msg';
    const spy1 = spyOn(testObj.keycloakService, 'init').and.callFake(
        () => Promise.resolve(true));
    const spy2 = spyOn(testObj.loggedInUserHelper, 'loadLoggedInUser').and.callFake(
        () => Promise.reject(errorMsg));
    const spy3 = spyOn(console, 'error');

    await testObj.initApplication().catch(() => { return; });

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledWith(`Couldn\'t load logged in user. (Error: ${errorMsg})`);
  });

});
