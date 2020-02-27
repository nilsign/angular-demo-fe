import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { getApiBaseUrl } from 'shared/functions/api-helper.functions';
import { UserRestApiService } from 'shared/api/user-rest-api.service';
import { KeycloakService } from 'keycloak-angular';
import { of } from 'rxjs';

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

  it('should request logged in via rest api', () => {
    const spy1 = spyOn(testObj.adminAuthGuard, 'canActivate').and.returnValue(true);
    const spy2 = spyOn (testObj.http, 'get').and.stub();

    testObj.getAllUsers();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledWith(`${getApiBaseUrl()}/user`);
  });
});
