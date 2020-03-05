import { Input } from '@angular/core';
import { generate } from 'shortid';
import { FormControl, FormGroup} from '@angular/forms';

export abstract class InputBaseComponent {

  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() label: string;
  @Input() fieldInfo: string;
  @Input() disabled = false;

  inputFieldId = generate();
  inputFieldInfoId = generate();

  getFormControl(): FormControl {
    return this.formGroup.controls[this.controlName] as FormControl;
  }

  isInvalidAndTouched(): boolean {
    return this.getFormControl().invalid && this.getFormControl().touched;
  }
}
