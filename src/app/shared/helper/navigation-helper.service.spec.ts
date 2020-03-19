import { TestBed } from '@angular/core/testing';
import { NavigationHelperService } from './navigation-helper.service';
import { LoggedInUserHelperService } from 'shared/helper/logged-in-user-helper.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakService } from 'keycloak-angular';

describe('NavigationHelperService', async () => {

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

  it('should be created', async () => {
    expect(testObj).toBeTruthy();
  });

  it('should navigate to admin landing page depending on role', async () => {
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

  it('should navigate to seller landing page depending on role', async () => {
    const spy1 = spyOn(testObj.loggedInUserHelper, 'isBuyer').and.returnValue(false);
    const spy2 = spyOn(testObj.loggedInUserHelper, 'isSeller').and.returnValue(true);
    const spy3 = spyOn(testObj, 'navigateToSellersLandingPage');

    testObj.navigateToRoleDependentLandingPage();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledTimes(1);
  });

  it('should navigate to buyers landing page depending on role', async () => {
    const spy1 = spyOn(testObj.loggedInUserHelper, 'isBuyer').and.returnValue(true);
    const spy2 = spyOn(testObj, 'navigateToBuyersLandingPage');

    testObj.navigateToRoleDependentLandingPage();

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('should log error when no landing page is available for the given users roles', async () => {
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

  it ('should navigate to active admin views landing page', async () => {
    spyOn(testObj.loggedInUserHelper, 'isAdminViewActive').and.returnValue(true);
    const spy = spyOn(testObj, 'navigateToAdminsLandingPage').and.stub();

    testObj.navigateToActiveViewLandingPage();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it ('should navigate to active seller views landing page', async () => {
    spyOn(testObj.loggedInUserHelper, 'isAdminViewActive').and.returnValue(false);
    spyOn(testObj.loggedInUserHelper, 'isSellerViewActive').and.returnValue(true);
    const spy = spyOn(testObj, 'navigateToSellersLandingPage').and.stub();

    testObj.navigateToActiveViewLandingPage();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it ('should navigate to active buyer views landing page', async () => {
    spyOn(testObj.loggedInUserHelper, 'isAdminViewActive').and.returnValue(false);
    spyOn(testObj.loggedInUserHelper, 'isSellerViewActive').and.returnValue(false);
    spyOn(testObj.loggedInUserHelper, 'isBuyerViewActive').and.returnValue(true);
    const spy = spyOn(testObj, 'navigateToBuyersLandingPage').and.stub();

    testObj.navigateToActiveViewLandingPage();

    expect(spy).toHaveBeenCalledTimes(1);
  });


  it('should navigate to admins landing page', async () => {
    const spy = spyOn(testObj, 'navigateToAdminDashboard').and.stub();

    testObj.navigateToAdminsLandingPage();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should navigate to admins dashboard', async () => {
    const spy = spyOn(testObj.router, 'navigate').and.returnValue(Promise.resolve(true));

    testObj.navigateToAdminDashboard();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['admin/dashboard']);
  });

  it('should navigate to admins settings', async () => {
    const spy = spyOn(testObj.router, 'navigate').and.returnValue(Promise.resolve(true));

    testObj.navigateToSettings();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['admin/settings']);
  });

  it('should navigate to admins show users', async () => {
    const spy = spyOn(testObj.router, 'navigate').and.returnValue(Promise.resolve(true));

    testObj.navigateToShowUsers();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['admin/show-users']);
  });

  it('should navigate to admins create user', async () => {
    const spy = spyOn(testObj.router, 'navigate').and.returnValue(Promise.resolve(true));

    testObj.navigateToCreateUser();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['admin/create-user']);
  });

  it('should navigate to admins edit user', async () => {
    const spy = spyOn(testObj.router, 'navigate').and.returnValue(Promise.resolve(true));

    testObj.navigateToEditUser();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['admin/edit-user']);
  });

  it('should navigate to sellers landing page', async () => {
    const spy = spyOn(testObj, 'navigateToSellerDashboard').and.stub();

    await testObj.navigateToSellersLandingPage();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should navigate to sellers dashboard', async () => {
    const spy = spyOn(testObj.router, 'navigate').and.returnValue(Promise.resolve(true));

    testObj.navigateToSellerDashboard();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['seller/dashboard']);
  });

  it('should navigate to sellers products', async () => {
    const spy = spyOn(testObj.router, 'navigate').and.returnValue(Promise.resolve(true));

    testObj.navigateToProducts();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['seller/products']);
  });

  it('should navigate to buyers landing page', async () => {
    const spy = spyOn(testObj, 'navigateToShop').and.stub();

    await testObj.navigateToBuyersLandingPage();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should navigate to buyers shop', async () => {
    const spy = spyOn(testObj.router, 'navigate').and.returnValue(Promise.resolve(true));

    testObj.navigateToShop();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['buyer/shop']);
  });

  it('should navigate to buyers orders', async () => {
    const spy = spyOn(testObj.router, 'navigate').and.returnValue(Promise.resolve(true));

    testObj.navigateToMyOrders();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['buyer/my-orders']);
  });
});
