import { TestBed } from '@angular/core/testing';

import { LoggedInUserHelperService } from './logged-in-user-helper.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {LoggedInUserRestApi} from 'shared/api/logged-in-user-rest-api.service';
import {BrowserModule} from '@angular/platform-browser';
import {AdminRoutingModule} from 'app/features/admin/admin-routing.module';
import {AppRoutingModule} from 'app/app-routing.module';
import {RoleType} from 'shared/api/dtos/dto-models';
import {userJpaAdminJpaSeller} from 'testing/data/user-data.testing';
import {of} from 'rxjs';
import {voidResolvedPromise} from 'testing/data/promise.testing';

describe('LoggedInUserHelperService', () => {

  let testObj: LoggedInUserHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler
      ]
    });
    testObj = TestBed.get(LoggedInUserHelperService);
  });

  it('should be created', () => {
    expect(testObj).toBeTruthy();
    expect(testObj.hasLoggedInUser()).toBeFalsy();
  });

  it('should request logged in user when logged out', () => {
    const spy1 = spyOn(testObj, 'hasLoggedInUser').and.returnValue(false);
    const spy2 = spyOn(testObj, 'loadLoggedInUser').and.returnValue(voidResolvedPromise);

    testObj.getLoggedInUser();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it ('should request roles from rest api',  () => {
    const spy = spyOn(testObj, 'getLoggedInUser').and.returnValue(userJpaAdminJpaSeller);

    const roleTypes = testObj.getLoggedInUserRoleTypes();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(roleTypes.has(RoleType.ROLE_JPA_ADMIN)).toBeTruthy();
    expect(roleTypes.has(RoleType.ROLE_JPA_SELLER)).toBeTruthy();
    expect(roleTypes.size).toEqual(2);
  });

  it ('should set logged in user to null on logout',  () => {
    spyOn(testObj, 'getLoggedInUser').and.returnValue(userJpaAdminJpaSeller);
    testObj.getLoggedInUser();

    testObj.logout();

    expect(testObj.hasLoggedInUser).toBeTruthy();
  });

  it ('should set successfully requested logged in user', async  () => {
    const spy = spyOn(testObj.loggedInUserRestApi, 'requestLoggedInUser')
        .and.returnValue(of(userJpaAdminJpaSeller));
    expect(testObj.hasLoggedInUser()).toBeFalsy();

    await testObj.loadLoggedInUser();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(testObj.hasLoggedInUser).toBeTruthy();
  });
});