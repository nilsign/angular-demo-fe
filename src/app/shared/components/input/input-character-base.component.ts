import { Input } from '@angular/core';
import { InputBaseComponent } from 'shared/components/input/input-base.component';
import { isNil } from 'lodash';

/*
  A base class where the input can be either alpha-numeric or just numeric, and is entered usually by keyboard.
 */
export abstract class InputCharacterBaseComponent extends InputBaseComponent {

  @Input() placeholder: string;
  @Input() maxLength: number = undefined;

  getMaxLength(): string {
    return isNil(this.maxLength)
      ? undefined
      : String(this.maxLength);
  }
}
