import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserComponent } from './create-user.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { of, throwError } from 'rxjs';
import { setFormControlValue } from 'shared/functions/form-helper.functions';
import { StringConstants } from 'shared/constants/string.constants';
import { RoleType } from 'shared/api/dtos/dto-models';
import { SharedModule } from 'shared/shared.module';

describe('CreateUserComponent', () => {

  let testObj: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          SharedModule
      ],
      declarations: [
          CreateUserComponent
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
    fixture = TestBed.createComponent(CreateUserComponent);
    testObj = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });

  it('should create user on click', async () => {
    const email = 'john.doe@nilsign.com';
    const firstName = 'John';
    const lastName = 'Doe';
    const formGroup = testObj.formGroup;
    setFormControlValue(formGroup, StringConstants.formControlNames.email, email);
    setFormControlValue(formGroup, StringConstants.formControlNames.firstName, firstName);
    setFormControlValue(formGroup, StringConstants.formControlNames.familyName, lastName);
    setFormControlValue(formGroup, StringConstants.formControlNames.superAdminRole, true);
    setFormControlValue(formGroup, StringConstants.formControlNames.adminRole, true);
    setFormControlValue(formGroup, StringConstants.formControlNames.sellerRole, true);
    setFormControlValue(formGroup, StringConstants.formControlNames.buyerRole, true);
    const spy1 = spyOn(testObj, 'canCreateUser').and.returnValue(true);
    const spy2 = spyOn(testObj.userRestApi, 'saveUser')
        .and.stub()
        .and.returnValue(of(null));

    testObj.onCreateUserClicked();

    expect(testObj.clickedCreateUserButton).toBeFalsy();
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledWith( {
      id: null,
      firstName,
      lastName,
      email,
      roles: [
        { id: null, roleType: RoleType.ROLE_JPA_GLOBALADMIN, roleName: '' },
        { id: null, roleType: RoleType.ROLE_JPA_ADMIN, roleName: '' },
        { id: null, roleType: RoleType.ROLE_JPA_SELLER, roleName: '' },
        { id: null, roleType: RoleType.ROLE_JPA_BUYER, roleName: '' },
      ],
      customerId: null
    });
  });

  it('should log error when save user fails', async () => {
    const exceptionMessage = 'exception-message';
    spyOn(testObj, 'canCreateUser').and.returnValue(true);
    spyOn(testObj.userRestApi, 'saveUser')
        .and.stub()
        .and.returnValue(throwError(exceptionMessage));
    const spy = spyOn(console, 'error');

    testObj.onCreateUserClicked();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Save user failed.', exceptionMessage);
  });
});
