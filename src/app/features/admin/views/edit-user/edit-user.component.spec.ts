import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditUserComponent } from './edit-user.component';
import { SharedModule } from 'shared/shared.module';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UsersTableComponent } from 'features/admin/components/users-table/users-table.component';
import { setFormControlValue } from 'shared/functions/form-helper.functions';
import {
  userJpaAdmin,
  userSuperAdmin
} from 'testing/data/user-data.testing';
import { of } from 'rxjs';

describe('EditUserComponent', () => {

  let testObj: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          SharedModule
      ],
      declarations: [
          EditUserComponent,
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
    fixture = TestBed.createComponent(EditUserComponent);
    testObj = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });

  it('should return false for has no user found message when search button is disabled', async () => {
    spyOn(testObj, 'isSearchButtonDisabled').and.stub().and.returnValue(true);
    expect(testObj.hasNoUsersFoundMessage).toBeFalsy();
  });

  it('should return false for has no user found message when user dtos are missing', async () => {
    spyOn(testObj, 'isSearchButtonDisabled').and.stub().and.returnValue(true);

    testObj.userDtos = null;
    expect(testObj.hasNoUsersFoundMessage).toBeFalsy();

    testObj.userDtos = [];
    expect(testObj.hasNoUsersFoundMessage).toBeFalsy();
  });

  it('should return false for has no user found message when search text is null', async () => {
    setFormControlValue(testObj.formGroup, testObj.searchUserControlName, null);
    spyOn(testObj, 'isSearchButtonDisabled' as any).and.stub().and.returnValue(false);

    expect(testObj.hasNoUsersFoundMessage).toBeFalsy();
  });

  it('should return false no users found message', async () => {
    setFormControlValue(testObj.formGroup, testObj.searchUserControlName, 'text');
    spyOn(testObj, 'isSearchButtonDisabled' as any).and.stub().and.returnValue(false);

    expect(testObj.hasNoUsersFoundMessage).toBeFalsy();
  });

  it('should return no user found message if search result is empty', async () => {
    const searchText = 'text';
    setFormControlValue(testObj.formGroup, testObj.searchUserControlName, searchText);
    spyOnProperty(testObj, 'hasNoUsersFoundMessage', 'get').and.returnValue(true);

    expect(testObj.noUserFoundMessage).toEqual(`No users found for \'${testObj.searchText}\'.`);
  });

  it('should return null as no user found message if search result is not empty', async () => {
    const searchText = 'text';
    setFormControlValue(testObj.formGroup, testObj.searchUserControlName, searchText);
    spyOnProperty(testObj, 'hasNoUsersFoundMessage', 'get').and.stub().and.returnValue(false);

    expect(testObj.noUserFoundMessage).toBeNull();
  });

  it('should not search users when the search button is disabled', async () => {
    spyOn(testObj, 'isSearchButtonDisabled' as any).and.stub().and.returnValue(true);
    const spy = spyOn(testObj.userRestApiService, 'searchUser');

    testObj.onSearchButtonClicked();

    expect(spy).not.toHaveBeenCalled();
  });

  it('should search users when the search button is enabled', async () => {
    spyOn(testObj, 'isSearchButtonDisabled' as any).and.stub().and.returnValue(false);
    const spy = spyOn(testObj.userRestApiService, 'searchUser').and.stub().and.returnValue(of());

    testObj.onSearchButtonClicked();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should set user dtos when the search users api response is not empty', async () => {
    const userDtos = [
      userSuperAdmin,
      userJpaAdmin
    ];
    const userDtosObservable = of(userDtos);
    spyOn(testObj, 'isSearchButtonDisabled' as any).and.stub().and.returnValue(false);
    const spy = spyOn(testObj.userRestApiService, 'searchUser').and.stub().and.returnValue(userDtosObservable);

    testObj.onSearchButtonClicked();

    expect(spy).toHaveBeenCalledTimes(1);
    userDtosObservable.subscribe(
        () => {},
        () => {},
        () => { expect(testObj.userDtos).toEqual(userDtos); });
  });
});
