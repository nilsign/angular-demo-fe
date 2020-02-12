import {TestBed} from '@angular/core/testing';

import {NavigationHelperService} from './navigation-helper.service';
import {RoleType} from 'shared/api/dtos/dto-models';
import {LoggedInUserHelperService} from 'shared/helper/logged-in-user-helper.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {voidResolvedPromise} from 'testing/data/promise.testing';

describe('NavigationHelperService', () => {

  let testObj: NavigationHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        LoggedInUserHelperService,
        HttpClient,
        HttpHandler,
      ]
    });
    testObj = TestBed.get(NavigationHelperService);
  });

  it('should be created', () => {
    expect(testObj).toBeTruthy();
  });

  it('should navigate to admin landing page depending on role', () => {
    const roles =  new Set<RoleType>()
        .add(RoleType.ROLE_REALM_CLIENT_SELLER)
        .add(RoleType.ROLE_JPA_BUYER)
        .add(RoleType.ROLE_JPA_ADMIN);
    const spy1 = spyOn(testObj.loggedInUserHelper, 'getLoggedInUserRoleTypes').and.returnValue(roles);
    const spy2 = spyOn(testObj, 'navigateToAdminsLandingPage');

    testObj.navigateToRoleDependentLandingPage();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('should navigate to seller landing page depending on role', () => {
    const roles =  new Set<RoleType>()
        .add(RoleType.ROLE_REALM_CLIENT_SELLER)
        .add(RoleType.ROLE_JPA_SELLER)
        .add(RoleType.ROLE_REALM_CLIENT_BUYER)
        .add(RoleType.ROLE_JPA_BUYER);
    const spy1 = spyOn(testObj.loggedInUserHelper, 'getLoggedInUserRoleTypes').and.returnValue(roles);
    const spy2 = spyOn(testObj, 'navigateToSellersLandingPage');

    testObj.navigateToRoleDependentLandingPage();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('should navigate to buyers landing page depending on role', () => {
    const roles =  new Set<RoleType>()
        .add(RoleType.ROLE_REALM_CLIENT_BUYER)
        .add(RoleType.ROLE_JPA_BUYER);
    const spy1 = spyOn(testObj.loggedInUserHelper, 'getLoggedInUserRoleTypes').and.returnValue(roles);
    const spy2 = spyOn(testObj, 'navigateToBuyersLandingPage');

    testObj.navigateToRoleDependentLandingPage();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('should navigate to admin landing page',  async () => {
    const spy = spyOn(testObj.router, 'navigate').and.returnValue(voidResolvedPromise);

    await testObj.navigateToAdminsLandingPage();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['admin']);
  });

  it('should navigate to seller landing page', async () => {
    const spy = spyOn(testObj.router, 'navigate').and.returnValue(voidResolvedPromise);

    await testObj.navigateToSellersLandingPage();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['seller']);
  });

  it('should navigate to buyer landing page', async () => {
    const spy = spyOn(testObj.router, 'navigate').and.returnValue(voidResolvedPromise);

    await testObj.navigateToBuyersLandingPage();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['buyer']);
  });
});
