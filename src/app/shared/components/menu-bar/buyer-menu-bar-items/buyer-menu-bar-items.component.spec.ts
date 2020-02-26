import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BuyerMenuBarItemsComponent } from './buyer-menu-bar-items.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('BuyerMenuBarItemsComponent', () => {

  let component: BuyerMenuBarItemsComponent;
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
