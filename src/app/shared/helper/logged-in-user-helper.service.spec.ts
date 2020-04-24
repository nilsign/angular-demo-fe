import { TestBed } from '@angular/core/testing';
import { ActiveViewType, LoggedInUserHelperService } from './logged-in-user-helper.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RoleType } from 'shared/api/dtos/dto-models';
import {
  userJpaAdmin,
  userJpaAdminJpaSeller,
  userJpaBuyer,
  userJpaSeller,
  userSuperAdmin
} from 'testing/data/user-data.testing';
import { of, throwError } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakServiceStub } from 'testing/stubs';

describe('LoggedInUserHelperService', async () => {

  let testObj: LoggedInUserHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          HttpClient,
          HttpHandler,
          {
            provide: KeycloakService,
            useClass: KeycloakServiceStub
          }
      ]
    });
    testObj = TestBed.get(LoggedInUserHelperService);
  });

  it('should be created', () => {
    expect(testObj).toBeTruthy();
    expect(testObj.hasLoggedInUser()).toBeFalsy();
  });

  it('should request logged in user when logged out', async () => {
    const spy1 = spyOn(testObj, 'hasLoggedInUser').and.returnValue(false);
    const spy2 = spyOn(testObj, 'loadLoggedInUser').and.returnValue(Promise.resolve());

    testObj.getLoggedInUser();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it ('should return logged in user roles when there is a logged in user', async () => {
    spyOn(testObj, 'hasLoggedInUser').and.returnValue(true);
    const spy = spyOn(testObj.roleHelper, 'getRoleTypes');

    testObj.getLoggedInUserRoleTypes();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it ('should return an empty role set when there is no logged in user', async () => {
    spyOn(testObj, 'hasLoggedInUser').and.returnValue(false);
    const spy = spyOn(testObj.roleHelper, 'getRoleTypes');

    const result = testObj.getLoggedInUserRoleTypes();

    expect(spy).toHaveBeenCalledTimes(0);
    expect(result).toEqual(new Set<RoleType>());
  });


  it ('should return empty role set when there is no logged in user', async () => {
    spyOn(testObj, 'hasLoggedInUser').and.returnValue(false);

    const roleTypes = testObj.getLoggedInUserRoleTypes();

    expect(roleTypes.size).toEqual(0);
  });

  it ('should set logged in user to null on logout', async () => {
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

  it ('should set active admin view after logged in user has been loaded,', async () => {
    spyOn(testObj.loggedInUserRestApi, 'getLoggedInUser').and.returnValue(of(userJpaAdmin));

    await testObj.loadLoggedInUser();

    expect(testObj.getActiveViewType()).toEqual(ActiveViewType.ADMIN_VIEW);
  });

  it ('should set active seller view after logged in user has been loaded,', async () => {
    spyOn(testObj.loggedInUserRestApi, 'getLoggedInUser').and.returnValue(of(userJpaAdminJpaSeller));

    await testObj.loadLoggedInUser();

    expect(testObj.getActiveViewType()).toEqual(ActiveViewType.SELLER_VIEW);
  });

  it ('should set active buyer view after logged in user has been loaded,', async () => {
    spyOn(testObj.loggedInUserRestApi, 'getLoggedInUser').and.returnValue(of(userJpaBuyer));

    await testObj.loadLoggedInUser();

    expect(testObj.getActiveViewType()).toEqual(ActiveViewType.BUYER_VIEW);
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

  it ('should unsubscribe on destroy', async () => {
    const spy = spyOn<any>(testObj.subscriptions, 'unsubscribe');

    testObj.ngOnDestroy();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it ('should return true when user is super admin', async () => {
    spyOn(testObj.loggedInUserRestApi, 'getLoggedInUser').and.returnValue(of(userSuperAdmin));

    await testObj.loadLoggedInUser();

    expect(testObj.isSuperAdmin()).toBeTruthy();
    expect(testObj.isAdmin()).toBeTruthy();
    expect(testObj.isSeller()).toBeFalsy();
    expect(testObj.isBuyer()).toBeFalsy();
  });

  it ('should return true when user is admin', async () => {
    spyOn(testObj.loggedInUserRestApi, 'getLoggedInUser').and.returnValue(of(userJpaAdmin));

    await testObj.loadLoggedInUser();

    expect(testObj.isSuperAdmin()).toBeFalsy();
    expect(testObj.isAdmin()).toBeTruthy();
    expect(testObj.isSeller()).toBeFalsy();
    expect(testObj.isBuyer()).toBeFalsy();
  });

  it ('should return true when user is seller', async () => {
    spyOn(testObj.loggedInUserRestApi, 'getLoggedInUser').and.returnValue(of(userJpaSeller));

    await testObj.loadLoggedInUser();

    expect(testObj.isSuperAdmin()).toBeFalsy();
    expect(testObj.isAdmin()).toBeFalsy();
    expect(testObj.isSeller()).toBeTruthy();
    expect(testObj.isBuyer()).toBeFalsy();
  });

  it ('should return true when user is buyer', async () => {
    spyOn(testObj.loggedInUserRestApi, 'getLoggedInUser').and.returnValue(of(userJpaBuyer));

    await testObj.loadLoggedInUser();

    expect(testObj.isSuperAdmin()).toBeFalsy();
    expect(testObj.isAdmin()).toBeFalsy();
    expect(testObj.isSeller()).toBeFalsy();
    expect(testObj.isBuyer()).toBeTruthy();
  });

  it ('should return whether admin view is active', async () => {
    testObj.setActiveViewType(ActiveViewType.ADMIN_VIEW);

    expect(testObj.isBuyerViewActive()).toBeFalsy();
    expect(testObj.isSellerViewActive()).toBeFalsy();
    expect(testObj.isAdminViewActive()).toBeTruthy();
  });

  it ('should return whether seller view is active', async () => {
    testObj.setActiveViewType(ActiveViewType.SELLER_VIEW);

    expect(testObj.isBuyerViewActive()).toBeFalsy();
    expect(testObj.isSellerViewActive()).toBeTruthy();
    expect(testObj.isAdminViewActive()).toBeFalsy();
  });

  it ('should return whether buyer view is active', async () => {
    testObj.setActiveViewType(ActiveViewType.BUYER_VIEW);

    expect(testObj.isBuyerViewActive()).toBeTruthy();
    expect(testObj.isSellerViewActive()).toBeFalsy();
    expect(testObj.isAdminViewActive()).toBeFalsy();
  });

  it ('should return active view type', async () => {
      testObj.setActiveViewType(ActiveViewType.BUYER_VIEW);

      const result = testObj.getActiveViewType();

      expect(result).toEqual(ActiveViewType.BUYER_VIEW);
  });
});
