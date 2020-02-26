import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { getApiBaseUrl } from 'shared/functions/api-helper.functions';
import { UserRestApiService } from 'shared/api/user-rest-api.service';

describe('UserRestApiService', () => {

  let testObj: UserRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          HttpClient,
          HttpHandler
      ]
    });
    testObj = TestBed.get(UserRestApiService);
  });

  it('should be created', () => {
    expect(testObj).toBeTruthy();
  });

  it('should request logged in via rest api', () => {
    const spy = spyOn (testObj.http, 'get');

    testObj.getAllUsers();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(`${getApiBaseUrl()}/user`);
  });
});
