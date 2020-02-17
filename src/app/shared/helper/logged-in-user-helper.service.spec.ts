import { TestBed } from '@angular/core/testing';

import { LoggedInUserHelperService } from './logged-in-user-helper.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {RoleType} from 'shared/api/dtos/dto-models';
import {userJpaAdminJpaSeller} from 'testing/data/user-data.testing';
import {of, throwError} from 'rxjs';

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
    const spy2 = spyOn(testObj, 'loadLoggedInUser').and.returnValue(Promise.resolve());

    testObj.getLoggedInUser();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it ('should request roles from rest api when there is a logged in user',  () => {
    spyOn(testObj, 'hasLoggedInUser').and.returnValue(true);
    const spy = spyOn(testObj, 'getLoggedInUser').and.returnValue(userJpaAdminJpaSeller);

    const roleTypes = testObj.getLoggedInUserRoleTypes();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(roleTypes.has(RoleType.ROLE_JPA_ADMIN)).toBeTruthy();
    expect(roleTypes.has(RoleType.ROLE_JPA_SELLER)).toBeTruthy();
    expect(roleTypes.size).toEqual(2);
  });

  it ('should return empty role set when there is no logged in user',  () => {
    spyOn(testObj, 'hasLoggedInUser').and.returnValue(false);

    const roleTypes = testObj.getLoggedInUserRoleTypes();

    expect(roleTypes.size).toEqual(0);
  });

  it ('should set logged in user to null on logout',  () => {
    spyOn(testObj, 'getLoggedInUser').and.returnValue(userJpaAdminJpaSeller);
    testObj.getLoggedInUser();

    testObj.logout();

    expect(testObj.hasLoggedInUser).toBeTruthy();
  });

  it ('should set successfully requested logged in user', async  () => {
    const spy = spyOn(testObj.loggedInUserRestApi, 'getLoggedInUser')
        .and.returnValue(of(userJpaAdminJpaSeller));
    expect(testObj.hasLoggedInUser()).toBeFalsy();

    await testObj.loadLoggedInUser();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(testObj.hasLoggedInUser).toBeTruthy();
  });

  it ('should return a rejected promise when logged in user can not be loaded ', async () => {
    const errorMsg = 'error-msg';
    const spy = spyOn(testObj.loggedInUserRestApi, 'getLoggedInUser')
        .and.returnValue(throwError(errorMsg));

    await testObj.loadLoggedInUser()
      .then()
      .catch((error: any) => expect(error).toEqual(errorMsg));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it ('should unsubscribe on destroy', () => {
    const spy = spyOn<any>(testObj.subscriptions, 'unsubscribe');

    testObj.ngOnDestroy();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it ('should return true if user has admin role ', () => {
    const roles = new Set<RoleType>()
        .add(RoleType.ROLE_REALM_CLIENT_SELLER)
        .add(RoleType.ROLE_JPA_SELLER)
        .add(RoleType.ROLE_JPA_ADMIN);
    const spy = spyOn(testObj, 'getLoggedInUserRoleTypes').and.returnValue(roles);

    const result = testObj.isAdmin();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toBeTruthy();
  });

  it ('should return false if user has not admin role ', () => {
    const roles = new Set<RoleType>()
      .add(RoleType.ROLE_REALM_CLIENT_SELLER)
      .add(RoleType.ROLE_JPA_SELLER);
    const spy = spyOn(testObj, 'getLoggedInUserRoleTypes').and.returnValue(roles);

    const result = testObj.isAdmin();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toBeFalsy();
  });

  it ('should return true if user has seller role ', () => {
    const roles = new Set<RoleType>()
      .add(RoleType.ROLE_REALM_CLIENT_ADMIN)
      .add(RoleType.ROLE_JPA_ADMIN)
      .add(RoleType.ROLE_JPA_SELLER);
    const spy = spyOn(testObj, 'getLoggedInUserRoleTypes').and.returnValue(roles);

    const result = testObj.isSeller();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toBeTruthy();
  });

  it ('should return false if user has not seller role ', () => {
    const roles = new Set<RoleType>()
    .add(RoleType.ROLE_REALM_CLIENT_ADMIN)
    .add(RoleType.ROLE_JPA_ADMIN);
    const spy = spyOn(testObj, 'getLoggedInUserRoleTypes').and.returnValue(roles);

    const result = testObj.isSeller();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toBeFalsy();
  });

  it ('should return true if user has buyer role ', () => {
    const roles = new Set<RoleType>()
    .add(RoleType.ROLE_REALM_CLIENT_ADMIN)
    .add(RoleType.ROLE_JPA_BUYER);
    const spy = spyOn(testObj, 'getLoggedInUserRoleTypes').and.returnValue(roles);

    const result = testObj.isBuyer();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toBeTruthy();
  });

  it ('should return false if user has not buyer role ', () => {
    const roles = new Set<RoleType>()
    .add(RoleType.ROLE_REALM_CLIENT_ADMIN)
    .add(RoleType.ROLE_JPA_ADMIN);
    const spy = spyOn(testObj, 'getLoggedInUserRoleTypes').and.returnValue(roles);

    const result = testObj.isBuyer();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toBeFalsy();
  });
});
