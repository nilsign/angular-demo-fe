import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditUserComponent } from './edit-user.component';
import { SharedModule } from 'shared/shared.module';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UsersTableComponent } from 'features/admin/components/users-table/users-table.component';
import { setFormControlValue } from 'shared/functions/form-helper.functions';
import {
  userJpaAdmin,
  userJpaAdminJpaSeller,
  userSuperAdmin
} from 'testing/data/user-data.testing';
import { UserFormComponent } from 'features/admin/components/user-form/user-form.component';
import { of, throwError } from 'rxjs';

describe('EditUserComponent', () => {

  let testObj: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let userFormComponent: UserFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          SharedModule
      ],
      declarations: [
          EditUserComponent,
          UsersTableComponent,
          UserFormComponent
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
    userFormComponent = jasmine.createSpyObj(
        'UserFormComponent',
        ['populateFormGroup', 'buildUserDto']);
    testObj.userFormComponent = userFormComponent;
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });

  it('should return false for has no user found message when search button is disabled', async () => {
    spyOnProperty(testObj, 'isSearchButtonDisabled', 'get').and.stub().and.returnValue(true);
    expect(testObj.hasNoUsersFoundMessage).toBeFalsy();
  });

  it('should return false for has no user found message when user dtos are missing', async () => {
    spyOnProperty(testObj, 'isSearchButtonDisabled', 'get').and.stub().and.returnValue(true);

    testObj.userDtos = null;
    expect(testObj.hasNoUsersFoundMessage).toBeFalsy();

    testObj.userDtos = [];
    expect(testObj.hasNoUsersFoundMessage).toBeFalsy();
  });

  it('should return false for has no user found message when search text is null', async () => {
    setFormControlValue(testObj.formGroup, testObj.searchUserControlName, null);
    spyOnProperty(testObj, 'isSearchButtonDisabled', 'get').and.stub().and.returnValue(false);

    expect(testObj.hasNoUsersFoundMessage).toBeFalsy();
  });

  it('should return false no users found message', async () => {
    setFormControlValue(testObj.formGroup, testObj.searchUserControlName, 'text');
    spyOnProperty(testObj, 'isSearchButtonDisabled', 'get').and.stub().and.returnValue(false);

    expect(testObj.hasNoUsersFoundMessage).toBeFalsy();
  });

  it('should return no user found message if search result is empty', async () => {
    const searchText = 'text';
    setFormControlValue(testObj.formGroup, testObj.searchUserControlName, searchText);
    spyOnProperty(testObj, 'hasNoUsersFoundMessage', 'get').and.stub().and.returnValue(true);

    expect(testObj.noUserFoundMessage).toEqual(`No users found for \'${testObj.searchText}\'.`);
  });

  it('should return null as no user found message if search result is not empty', async () => {
    const searchText = 'text';
    setFormControlValue(testObj.formGroup, testObj.searchUserControlName, searchText);
    spyOnProperty(testObj, 'hasNoUsersFoundMessage', 'get').and.stub().and.returnValue(false);

    expect(testObj.noUserFoundMessage).toBeNull();
  });

  it('should not search users when the search button is disabled', async () => {
    spyOnProperty(testObj, 'isSearchButtonDisabled', 'get').and.stub().and.returnValue(true);
    const spy = spyOn(testObj.userRestApiService, 'searchUser');

    testObj.onSearchButtonClicked();

    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should search users when the search button is enabled', async () => {
    spyOnProperty(testObj, 'isSearchButtonDisabled', 'get').and.stub().and.returnValue(false);
    const spy = spyOn(testObj.userRestApiService, 'searchUser').and.stub().and.returnValue(of());

    testObj.onSearchButtonClicked();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should log error search when search users failed', async () => {
    const exceptionMessage = 'exception-message';
    spyOnProperty(testObj, 'isSearchButtonDisabled', 'get').and.stub().and.returnValue(false);
    spyOn(testObj.userRestApiService, 'searchUser').and.stub().and.returnValue(throwError(exceptionMessage));
    const spy = spyOn(console, 'error');

    testObj.onSearchButtonClicked();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Search user request failed. ', exceptionMessage);
  });

  it('should set user dtos when the search users api response is not empty', async () => {
    const userDtos = [
      userSuperAdmin,
      userJpaAdmin
    ];
    const userDtosObservable = of(userDtos);
    spyOnProperty(testObj, 'isSearchButtonDisabled', 'get').and.stub().and.returnValue(false);
    const spy = spyOn(testObj.userRestApiService, 'searchUser').and.stub().and.returnValue(userDtosObservable);

    testObj.onSearchButtonClicked();

    expect(spy).toHaveBeenCalledTimes(1);
    userDtosObservable.subscribe(
        () => {},
        () => {},
        () => { expect(testObj.userDtos).toEqual(userDtos); });
  });

  it('should request user by email on user row clicked', async () => {
    const userDtosObservable = of(userJpaAdminJpaSeller);
    const spy1 = spyOn(testObj.userRestApiService, 'getUserByEmail')
        .and.stub()
        .and.returnValue(userDtosObservable);
    const spy2 = spyOn(testObj.changeDetector, 'detectChanges').and.stub();

    testObj.onUserRowClicked(userJpaAdminJpaSeller);

    expect(spy1).toHaveBeenCalledTimes(1);
    userDtosObservable.subscribe(
        () => {},
        () => {},
        () => {
          expect(testObj.selectedUserToEdit).toEqual(userJpaAdminJpaSeller);
          expect(spy2).toHaveBeenCalledTimes(1);
          expect(userFormComponent.populateFormGroup).toHaveBeenCalledTimes(1);
          expect(userFormComponent.populateFormGroup).toHaveBeenCalledWith(testObj.selectedUserToEdit);
        });
  });

  it('should log error on request user by email failed', async () => {
    const exceptionMessage = 'exception-message';
    spyOn(testObj.userRestApiService, 'getUserByEmail')
        .and.stub()
        .and.returnValue(throwError(exceptionMessage));
    const spy = spyOn(console, 'error').and.stub();

    testObj.onUserRowClicked(userJpaAdminJpaSeller);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Request user by email failed. ', exceptionMessage);
  });

  it('should call rest api save request on save button clicked', async () => {
    const userDtoObservable = of(userJpaAdminJpaSeller);
    const spy1 = spyOn(testObj.userRestApiService, 'saveUser').and.stub().and.returnValue(userDtoObservable);
    const spy2 = spyOn(console, 'log');
    testObj.onSaveButtonClicked();

    expect(testObj.selectedUserToEdit).toBeNull();
    expect(userFormComponent.buildUserDto).toHaveBeenCalledTimes(1);
    userDtoObservable.subscribe(
        () => {},
        () => {},
        () => {
          expect(spy1).toHaveBeenCalledTimes(1);
          expect(spy2).toHaveBeenCalledTimes(1);
        }
     );
  });

  it('should log error on save request failed', async () => {
    const exceptionMessage = 'exception-message';
    spyOn(testObj.userRestApiService, 'saveUser')
        .and.stub()
        .and.returnValue(throwError(exceptionMessage));
    const spy = spyOn(console, 'error').and.stub();

    testObj.onSaveButtonClicked();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Save user failed. ', exceptionMessage);
  });

  it('should set selected user to edit to null on cancel button clicked', async () => {
    testObj.onCancelButtonClicked();

    expect(testObj.selectedUserToEdit).toBeNull();

  });
});
