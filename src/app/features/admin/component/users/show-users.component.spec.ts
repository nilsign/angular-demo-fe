import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowUsersComponent } from './show-users.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import {
  userJpaAdmin,
  userJpaAdminJpaSeller,
  userJpaBuyer,
  userJpaSeller,
  userSuperAdmin
} from 'testing/data/user-data.testing';
import { of } from 'rxjs';

describe('ShowUsersComponent', () => {

  const userDtos = [
    userSuperAdmin,
    userJpaAdmin,
    userJpaAdminJpaSeller,
    userJpaSeller,
    userJpaBuyer
  ];

  let testObj: ShowUsersComponent;
  let fixture: ComponentFixture<ShowUsersComponent>;

  let userRestApiGetAllUsersSpy: jasmine.Spy;

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
    testObj = fixture.componentInstance;

    userRestApiGetAllUsersSpy = spyOn(testObj.userRestApi, 'getAllUsers').and.returnValue(of(userDtos));

    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });

  it ('should load all users on initialization', async () => {
    const spy = spyOn(testObj, 'loadAllUsers').and.stub();

    testObj.ngOnInit();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
