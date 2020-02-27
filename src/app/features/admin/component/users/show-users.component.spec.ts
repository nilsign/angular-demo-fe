import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowUsersComponent } from './show-users.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

describe('ShowUsersComponent', () => {

  let component: ShowUsersComponent;
  let fixture: ComponentFixture<ShowUsersComponent>;

  let loadAllUsersSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          ShowUsersComponent
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
    fixture = TestBed.createComponent(ShowUsersComponent);
    component = fixture.componentInstance;

    loadAllUsersSpy = spyOn(component, 'loadAllUsers').and.stub();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(loadAllUsersSpy).toHaveBeenCalledTimes(1);
  });
});
