import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMenuBarItemsComponent } from './admin-menu-bar-items.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminMenuBarItemsComponent', () => {

  let testObj: AdminMenuBarItemsComponent;
  let fixture: ComponentFixture<AdminMenuBarItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          RouterTestingModule
      ],
      declarations: [
          AdminMenuBarItemsComponent
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
    fixture = TestBed.createComponent(AdminMenuBarItemsComponent);
    testObj = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });

  it('should navigate to admin dashboard and set active menu index', async () => {
    const spy = spyOn(testObj.navigationService, 'navigateToAdminDashboard').and.stub();

    testObj.onDashboardMenuItemClicked();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(testObj.activeMenuItemIndex).toBe(0);
  });

  it('should navigate to settings and set active menu index', async () => {
    const spy = spyOn(testObj.navigationService, 'navigateToSettings').and.stub();

    testObj.onSettingsMenuItemClicked();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(testObj.activeMenuItemIndex).toBe(1);
  });

  it('should navigate to show users and set active menu index', async () => {
    const spy = spyOn(testObj.navigationService, 'navigateToShowUsers').and.stub();

    testObj.onShowAllUsersMenuItemClicked();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(testObj.activeMenuItemIndex).toBe(2);
  });

  it('should navigate to create user and set active menu index', async () => {
    const spy = spyOn(testObj.navigationService, 'navigateToCreateUser').and.stub();

    testObj.onCreateUserMenuItemClicked();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(testObj.activeMenuItemIndex).toBe(2);
  });

  it('should navigate to edit user and set active menu index', async () => {
    const spy = spyOn(testObj.navigationService, 'navigateToEditUser').and.stub();

    testObj.onEditUserMenuItemClicked();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(testObj.activeMenuItemIndex).toBe(2);
  });
});
