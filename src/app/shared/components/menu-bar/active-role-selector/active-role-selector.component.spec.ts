import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveRoleSelectorComponent } from './active-role-selector.component';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ActiveRoleSelectorComponent', () => {

  let component: ActiveRoleSelectorComponent;
  let fixture: ComponentFixture<ActiveRoleSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
