import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerMenuBarItemsComponent } from './seller-menu-bar-items.component';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SellerMenuBarItemsComponent', () => {

  let component: SellerMenuBarItemsComponent;
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
