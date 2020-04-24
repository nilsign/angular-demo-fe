import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerMenuBarItemsComponent } from './seller-menu-bar-items.component';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SellerMenuBarItemsComponent', () => {

  let testObj: SellerMenuBarItemsComponent;
  let fixture: ComponentFixture<SellerMenuBarItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          RouterTestingModule
      ],
      declarations: [
          SellerMenuBarItemsComponent
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
    fixture = TestBed.createComponent(SellerMenuBarItemsComponent);
    testObj = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });

  it('should navigate to seller dashboard and set active menu index', async () => {
    const spy = spyOn(testObj.navigationService, 'navigateToSellerDashboard').and.stub();

    testObj.onDashboardMenuItemClicked();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(testObj.activeMenuItemIndex).toBe(0);
  });

  it('should navigate to products and set active menu index', async () => {
    const spy = spyOn(testObj.navigationService, 'navigateToProducts').and.stub();

    testObj.onProductsMenuItemClicked();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(testObj.activeMenuItemIndex).toBe(1);
  });
});
