import { TestBed } from '@angular/core/testing';

import { LoggedInUserRestApi } from 'shared/api/logged-in-user-rest-api.service';
import {getApiBaseUrl} from 'shared/helper/api-helper.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('LoggedInUserRepositoryService', () => {

  let testObj: LoggedInUserRestApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler
      ]
    });
    testObj = TestBed.get(LoggedInUserRestApi);
  });

  it('should be created', () => {
    expect(testObj).toBeTruthy();
  });

  it('should request logged in via rest api', () => {
    const spy = spyOn (testObj.http, 'get');

    testObj.requestLoggedInUser();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(`${getApiBaseUrl()}/user/logged-in-user`);
  });
});
