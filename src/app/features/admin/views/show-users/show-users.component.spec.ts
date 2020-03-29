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
import { SharedModule } from 'shared/shared.module';
import { UsersTableComponent } from 'features/admin/components/users-table/users-table.component';

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
      imports: [
          SharedModule
      ],
      declarations: [
          ShowUsersComponent,
          UsersTableComponent
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
    const spy = spyOn(testObj.userRestApi.getAllUsers(), 'subscribe').and.stub();

    testObj.ngOnInit();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(testObj.userDtos).toEqual(userDtos);
  });
});
