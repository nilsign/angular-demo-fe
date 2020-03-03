import { Input } from '@angular/core';
import { generate } from 'shortid';

export abstract class InputBaseComponent {

  @Input() value: any;
  @Input() label: string;
  @Input() fieldInfo: string;

  inputFieldId = generate();
  inputFieldInfoId = generate();
}
