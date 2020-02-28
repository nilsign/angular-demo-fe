import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuBarComponent } from './menu-bar.component';
import { ActiveRoleSelectorComponent } from 'shared/components/menu-bar/active-role-selector/active-role-selector.component';
import { AdminMenuBarItemsComponent } from 'shared/components/menu-bar/admin-menu-bar-items/admin-menu-bar-items.component';
import { SellerMenuBarItemsComponent } from 'shared/components/menu-bar/seller-menu-bar-items/seller-menu-bar-items.component';
import { BuyerMenuBarItemsComponent } from 'shared/components/menu-bar/buyer-menu-bar-items/buyer-menu-bar-items.component';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('MenuBarComponent', () => {

  let testObj: MenuBarComponent;
  let fixture: ComponentFixture<MenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          RouterTestingModule
      ],
      declarations: [
          MenuBarComponent,
          ActiveRoleSelectorComponent,
          AdminMenuBarItemsComponent,
          SellerMenuBarItemsComponent,
          BuyerMenuBarItemsComponent
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
    fixture = TestBed.createComponent(MenuBarComponent);
    testObj = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });

  it('should navigate to active views landing page on app icon click', async () => {
    const spy = spyOn(testObj.navigationService, 'navigateToActiveViewLandingPage').and.stub();

    testObj.onAppIconClicked();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should logout on logout menu item click', async () => {
    const spy = spyOn(testObj. loggedInUserHelperService, 'logout').and.stub();

    testObj.onLogoutMenuItemClicked();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
