import { Input } from '@angular/core';
import { generate } from 'shortid';

export abstract class InputBaseComponent {

  @Input() value: any;
  @Input() label: string;
  @Input() fieldInfo: string;

  inputFieldId = generate();
  inputFieldInfoId = generate();

  protected constructor() {
    console.log('InputBaseComponent: ');
    console.log('Label: ', this.label);
    console.log('inputFieldId: ', this.inputFieldId);
    console.log('inputFieldInfoId: ', this.inputFieldInfoId);
    console.log('---');
  }
}
