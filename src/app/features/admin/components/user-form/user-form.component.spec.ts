import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { SharedModule } from 'shared/shared.module';
import { userJpaAdminJpaSeller } from 'testing/data/user-data.testing';
import { getFormControlValue } from 'shared/functions/form-helper.functions';

describe('UserFormComponent', () => {

  let fixture: ComponentFixture<UserFormComponent>;
  let testObj: UserFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          SharedModule
      ],
      declarations: [
          UserFormComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    testObj = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });


  it('should populate form control with user dto values ', async () => {
    testObj.populateFormGroup(userJpaAdminJpaSeller);

    expect(getFormControlValue(testObj.formGroup, testObj.firstNameControlName))
        .toEqual(userJpaAdminJpaSeller.firstName);
    expect(getFormControlValue(testObj.formGroup, testObj.familyNameControlName))
        .toEqual(userJpaAdminJpaSeller.lastName);
    expect(getFormControlValue(testObj.formGroup, testObj.emailControlName)).toEqual(userJpaAdminJpaSeller.email);
    expect(getFormControlValue(testObj.formGroup, testObj.superAdminControlName)).toEqual(false);
    expect(getFormControlValue(testObj.formGroup, testObj.adminControlName)).toEqual(true);
    expect(getFormControlValue(testObj.formGroup, testObj.sellerControlName)).toEqual(true);
    expect(getFormControlValue(testObj.formGroup, testObj.buyerControlName)).toEqual(false);
  });
});
