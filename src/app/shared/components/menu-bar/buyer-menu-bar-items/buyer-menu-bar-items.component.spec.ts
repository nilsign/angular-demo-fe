import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BuyerMenuBarItemsComponent } from './buyer-menu-bar-items.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('BuyerMenuBarItemsComponent', () => {

  let testObj: BuyerMenuBarItemsComponent;
  let fixture: ComponentFixture<BuyerMenuBarItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          RouterTestingModule
      ],
      declarations: [
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
    fixture = TestBed.createComponent(BuyerMenuBarItemsComponent);
    testObj = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });

  it('should navigate to shop and set active menu index', async () => {
    const spy = spyOn(testObj.navigationService, 'navigateToShop').and.stub();

    testObj.onShopClicked();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(testObj.activeMenuItemIndex).toBe(0);
  });

  it('should navigate to my orders and set active menu index', async () => {
    const spy = spyOn(testObj.navigationService, 'navigateToMyOrders').and.stub();

    testObj.onMyOrdersMenuItemClicked();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(testObj.activeMenuItemIndex).toBe(1);
  });
});
