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
import { UsersTableRowModel } from 'features/admin/views/show-users/users-table-row.model';

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
          KeycloakService,
          HttpClient,
          HttpHandler
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUsersComponent);
    testObj = fixture.componentInstance;

    // This is required, because any single test here recreates the component from scratch, which triggers a call of the
    // on init function, where all users that are going to be displayed are loaded.
    userRestApiGetAllUsersSpy = spyOn(testObj.userRestApi, 'getAllUsers')
        .and.stub()
        .and.returnValue(of(userDtos));

    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });

  it ('should call load all users on component initialization', async () => {
    const spy = spyOn(testObj, 'loadAllUsers').and.stub();

    testObj.ngOnInit();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it ('should initialize all users on component initialization', async () => {
    testObj.allUsers.subscribe(  (userTableRowModels: UsersTableRowModel[]) => {
      expect(testObj.allUsers).not.toBeNull();
      expect(userTableRowModels.length).toBe(5);
      expect(userTableRowModels[0].roleNames).toEqual('GLOBALADMIN');
      expect(userTableRowModels[1].roleNames).toEqual('ADMIN');
      expect(userTableRowModels[2].roleNames).toEqual('ADMIN, SELLER');
      expect(userTableRowModels[3].roleNames).toEqual('SELLER');
      expect(userTableRowModels[4].roleNames).toEqual('BUYER');
    });
  });
});
