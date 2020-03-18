import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputCheckboxComponent } from './input-checkbox.component';
import { FieldLabelComponent } from 'shared/components/input/field-label/field-label.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('InputCheckboxComponent', () => {

  const formGroup = new FormGroup({ controlName: new FormControl()});
  const controlName = 'controlName';
  const inputFieldId = 'id';

  let testObj: InputCheckboxComponent;
  let fixture: ComponentFixture<InputCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          ReactiveFormsModule
      ],
      declarations: [
          InputCheckboxComponent,
          FieldLabelComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCheckboxComponent);
    testObj = fixture.componentInstance;
    testObj.formGroup = formGroup;
    testObj.controlName = controlName;
    testObj.inputFieldId = inputFieldId;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });


});
