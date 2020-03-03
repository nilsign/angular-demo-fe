import { Input } from '@angular/core';
import { generate } from 'shortid';

export abstract class InputBaseComponent {

  @Input() value: any;
  @Input() label: string;
  @Input() fieldInfo: string;

  @Input() disabled: boolean;

  inputFieldId = generate();
  inputFieldInfoId = generate();
}
