import { TestBed } from '@angular/core/testing';
import { NavigationHelperService } from './navigation-helper.service';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakService } from 'keycloak-angular';

describe('NavigationHelperService', () => {

  let testObj: NavigationHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          RouterTestingModule
      ],
      providers: [
          HttpClient,
          HttpHandler,
          KeycloakService,
          LoggedInUserHelperService
      ]
    });
    testObj = TestBed.get(NavigationHelperService);
  });

  it('should be created', () => {
    expect(testObj).toBeTruthy();
  });

  it('should navigate to admin landing page depending on role', () => {
    const spy1 = spyOn(testObj.loggedInUserHelper, 'isBuyer').and.returnValue(false);
    const spy2 = spyOn(testObj.loggedInUserHelper, 'isSeller').and.returnValue(false);
    const spy3 = spyOn(testObj.loggedInUserHelper, 'isAdmin').and.returnValue(true);
    const spy4 = spyOn(testObj, 'navigateToAdminsLandingPage');

    testObj.navigateToRoleDependentLandingPage();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledTimes(1);
    expect(spy4).toHaveBeenCalledTimes(1);
  });

  it('should navigate to seller landing page depending on role', () => {
    const spy1 = spyOn(testObj.loggedInUserHelper, 'isBuyer').and.returnValue(false);
    const spy2 = spyOn(testObj.loggedInUserHelper, 'isSeller').and.returnValue(true);
    const spy3 = spyOn(testObj, 'navigateToSellersLandingPage');

    testObj.navigateToRoleDependentLandingPage();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledTimes(1);
  });

  it('should navigate to buyers landing page depending on role', () => {
    const spy1 = spyOn(testObj.loggedInUserHelper, 'isBuyer').and.returnValue(true);
    const spy2 = spyOn(testObj, 'navigateToBuyersLandingPage');

    testObj.navigateToRoleDependentLandingPage();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('should log error when not landing page is available for the users roles', async () => {
    const spy1 = spyOn(testObj.loggedInUserHelper, 'isBuyer').and.returnValue(false);
    const spy2 = spyOn(testObj.loggedInUserHelper, 'isSeller').and.returnValue(false);
    const spy3 = spyOn(testObj.loggedInUserHelper, 'isAdmin').and.returnValue(false);
    const spy4 = spyOn(console, 'error');

    await testObj.navigateToRoleDependentLandingPage();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledTimes(1);
    expect(spy4).toHaveBeenCalledTimes(1);
    expect(spy4).toHaveBeenCalledWith('Logged in user has not a valid authorization role.');
  });

  it('should navigate to admin landing page',  async () => {
    const spy = spyOn(testObj, 'navigateToAdminDashboard');

    await testObj.navigateToAdminsLandingPage();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should navigate to seller landing page', async () => {
    const spy = spyOn(testObj, 'navigateToSellerDashboard');

    await testObj.navigateToSellersLandingPage();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should navigate to buyer landing page', async () => {
    const spy = spyOn(testObj, 'navigateToShop');

    await testObj.navigateToBuyersLandingPage();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
