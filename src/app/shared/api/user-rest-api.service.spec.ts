import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { getApiBaseUrl } from 'shared/functions/api-helper.functions';
import { UserRestApiService } from 'shared/api/user-rest-api.service';
import { KeycloakService } from 'keycloak-angular';
import { userJpaAdminJpaSeller } from 'testing/data/user-data.testing';

describe('UserRestApiService', () => {

  let testObj: UserRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          HttpClient,
          HttpHandler,
          KeycloakService
      ]
    });
    testObj = TestBed.get(UserRestApiService);
  });

  it('should be created', () => {
    expect(testObj).toBeTruthy();
  });

  it('should request all users via rest api', async () => {
    const spy1 = spyOn(testObj.adminAuthGuard, 'canActivate').and.returnValue(true);
    const spy2 = spyOn (testObj.http, 'get').and.stub();

    testObj.getAllUsers();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledWith(`${getApiBaseUrl()}/user`);
  });

  it('should throw error when user is not authenticated and all users are requested', async () => {
    const spy1 = spyOn(testObj.adminAuthGuard, 'canActivate').and.returnValue(false);
    const spy2 = spyOn(testObj.http, 'get').and.stub();

    try {
      testObj.getAllUsers();
    } catch (error) {
      expect(error.message).toEqual('Authorization failed. Illegal RestAPI request.');
    }

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(0);
  });

  it('should save users via rest api', async () => {
    const spy1 = spyOn(testObj.superAdminAuthGuard, 'canActivate').and.returnValue(true);
    const spy2 = spyOn (testObj.http, 'post').and.stub();

    testObj.saveUser(userJpaAdminJpaSeller);

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledWith(`${getApiBaseUrl()}/user`, userJpaAdminJpaSeller);
  });

  it('should throw error when user is not authenticated and a user is saved', async () => {
    const spy1 = spyOn(testObj.superAdminAuthGuard, 'canActivate').and.returnValue(false);
    const spy2 = spyOn (testObj.http, 'post').and.stub();

    try {
      testObj.saveUser(userJpaAdminJpaSeller);
    } catch (error) {
      expect(error.message).toEqual('Authorization failed. Illegal RestAPI request.');
    }

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).not.toHaveBeenCalled();
  });
});
