import { TestBed } from '@angular/core/testing';
import { LoggedInUserRestApiService } from 'shared/api/logged-in-user-rest-api.service';
import { getApiBaseUrl } from 'shared/helper/api-helper.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('LoggedInUserRestApiService', () => {

  let testObj: LoggedInUserRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler
      ]
    });
    testObj = TestBed.get(LoggedInUserRestApiService);
  });

  it('should be created', () => {
    expect(testObj).toBeTruthy();
  });

  it('should request logged in via rest api', () => {
    const spy = spyOn (testObj.http, 'get');

    testObj.getLoggedInUser();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(`${getApiBaseUrl()}/user/logged-in-user`);
  });
});
