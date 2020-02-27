import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveRoleSelectorComponent } from './active-role-selector.component';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ActiveViewType } from 'shared/helper/logged-in-user-helper.service';
import { userJpaAdmin, userJpaBuyer } from 'testing/data/user-data.testing';

describe('ActiveRoleSelectorComponent', () => {

  let testObj: ActiveRoleSelectorComponent;
  let fixture: ComponentFixture<ActiveRoleSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({q
      imports: [
          RouterTestingModule
      ],
      declarations: [
          ActiveRoleSelectorComponent
      ],
      providers: [
          HttpClient,
          HttpHandler,
          KeycloakService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRoleSelectorComponent);
    testObj = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });

  it('should initialize active role selection popup model in case of a multi role user', async () => {
    spyOn(testObj.loggedInUserHelperService, 'isMultiRole').and.returnValue(true);
    spyOn(testObj.loggedInUserHelperService, 'isAdmin').and.returnValue(true);
    spyOn(testObj.loggedInUserHelperService, 'isSeller').and.returnValue(true);
    spyOn(testObj.loggedInUserHelperService, 'isBuyer').and.returnValue(true);

    testObj.ngOnInit();

    expect(testObj.activeRoleSelectionPopupModel.length).toEqual(3);
    expect(testObj.activeRoleSelectionPopupModel[0]).toEqual('Admin');
    expect(testObj.activeRoleSelectionPopupModel[1]).toEqual('Seller');
    expect(testObj.activeRoleSelectionPopupModel[2]).toEqual('Buyer');
  });

  it('should return bye-bye as active role selector label when there is no logged in user', async () => {
    spyOn(testObj.loggedInUserHelperService, 'hasLoggedInUser').and.returnValue(false);

    const result = testObj.getActiveRoleSelectorLabel();

    expect(result).toEqual('Bye-bye.');
  });

  it('should return first name as active role selector label when user has a buyer role', async () => {
    spyOn(testObj.loggedInUserHelperService, 'hasLoggedInUser').and.returnValue(true);
    spyOn(testObj.loggedInUserHelperService, 'isBuyer').and.returnValue(true);
    spyOn(testObj.loggedInUserHelperService, 'getLoggedInUser').and.returnValue(userJpaBuyer);

    const result = testObj.getActiveRoleSelectorLabel();

    expect(result).toEqual(`Hello ${userJpaBuyer.firstName}`);
  });

  it('should return first name as active role selector label when active view type is nil', async () => {
    spyOn(testObj.loggedInUserHelperService, 'hasLoggedInUser').and.returnValue(true);
    spyOn(testObj.loggedInUserHelperService, 'getActiveViewType').and.returnValue(null);
    spyOn(testObj.loggedInUserHelperService, 'isBuyer').and.returnValue(false);
    spyOn(testObj.loggedInUserHelperService, 'getLoggedInUser').and.returnValue(userJpaAdmin);

    const result = testObj.getActiveRoleSelectorLabel();

    expect(result).toEqual(`Hello ${userJpaAdmin.firstName}`);
  });

  it('should return admin active role selector label', async () => {
    spyOn(testObj.loggedInUserHelperService, 'hasLoggedInUser').and.returnValue(true);
    spyOn(testObj.loggedInUserHelperService, 'getActiveViewType').and.returnValue(ActiveViewType.ADMIN_VIEW);
    spyOn(testObj.loggedInUserHelperService, 'isBuyer').and.returnValue(false);

    const result = testObj.getActiveRoleSelectorLabel();

    expect(result).toEqual('Admin');
  });

  it('should return seller active role selector label', async () => {
    spyOn(testObj.loggedInUserHelperService, 'hasLoggedInUser').and.returnValue(true);
    spyOn(testObj.loggedInUserHelperService, 'getActiveViewType').and.returnValue(ActiveViewType.SELLER_VIEW);
    spyOn(testObj.loggedInUserHelperService, 'isBuyer').and.returnValue(false);

    const result = testObj.getActiveRoleSelectorLabel();

    expect(result).toEqual('Seller');
  });

  it('should navigate to landing page when single role user clicks the role selector', async () => {
    spyOn(testObj.loggedInUserHelperService, 'isMultiRole').and.returnValue(false);
    const spy = spyOn(testObj.navigationService, 'navigateToActiveViewLandingPage').and.stub();

    testObj.onActiveRoleSelectorLabelClicked();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should navigate to admin landing page on admin popup menu item click', async () => {
    const spy1 = spyOn(testObj.loggedInUserHelperService, 'setActiveViewType').and.stub();
    const spy2 = spyOn(testObj.navigationService, 'navigateToAdminsLandingPage').and.stub();

    testObj.onActiveRolePopupItemClicked('Admin');

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy1).toHaveBeenCalledWith(ActiveViewType.ADMIN_VIEW);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('should navigate to seller landing page on admin popup menu item click', async () => {
    const spy1 = spyOn(testObj.loggedInUserHelperService, 'setActiveViewType').and.stub();
    const spy2 = spyOn(testObj.navigationService, 'navigateToSellersLandingPage').and.stub();

    testObj.onActiveRolePopupItemClicked('Seller');

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy1).toHaveBeenCalledWith(ActiveViewType.SELLER_VIEW);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('should navigate to buyer landing page on admin popup menu item click', async () => {
    const spy1 = spyOn(testObj.loggedInUserHelperService, 'setActiveViewType').and.stub();
    const spy2 = spyOn(testObj.navigationService, 'navigateToBuyersLandingPage').and.stub();

    testObj.onActiveRolePopupItemClicked('Buyer');

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy1).toHaveBeenCalledWith(ActiveViewType.BUYER_VIEW);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('should return true when active view equals the role popup item label', async () => {
    spyOn(testObj.loggedInUserHelperService, 'isAdminViewActive').and.returnValue(false);
    spyOn(testObj.loggedInUserHelperService, 'isSellerViewActive').and.returnValue(false);
    spyOn(testObj.loggedInUserHelperService, 'isBuyerViewActive').and.returnValue(true);

    const result = testObj.isActiveRolePopupItemRepresentingTheActiveView('Buyer');

    expect(result).toBeTruthy();
  });
});
