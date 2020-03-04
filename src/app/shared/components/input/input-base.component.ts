import { Input } from '@angular/core';
import { generate } from 'shortid';
import { FormGroup } from '@angular/forms';

export abstract class InputBaseComponent {

  @Input() parentFormGroup: FormGroup;
  @Input() inputControlName: string;

  @Input() label: string;
  @Input() fieldInfo: string;

  @Input() disabled = false;

  inputFieldId = generate();
  inputFieldInfoId = generate();
}
