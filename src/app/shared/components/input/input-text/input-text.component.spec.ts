import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTextComponent } from './input-text.component';
import { FieldLabelComponent } from 'shared/components/input/field-label/field-label.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldInfoComponent } from 'shared/components/input/field-info/field-info.component';

describe('TextInputComponent', () => {

  const formGroup = new FormGroup({ controlName: new FormControl()});
  const controlName = 'controlName';
  const inputFieldId = 'id';

  let testObj: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
          InputTextComponent,
          FieldLabelComponent,
          FieldInfoComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    testObj = fixture.componentInstance;
    testObj.formGroup = formGroup;
    testObj.controlName = controlName;
    testObj.inputFieldId = inputFieldId;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });

  it('should mark input as untouched when value changes to empty string', async () => {
    testObj.formGroup.controls[controlName].setValue('value');
    const spy = spyOn(testObj.getFormControl(), 'markAsUntouched');

    testObj.formGroup.controls[controlName].setValue('');

    testObj.formGroup.controls[controlName].valueChanges.subscribe((value: string) => {
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
