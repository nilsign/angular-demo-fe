import { Input } from '@angular/core';
import { InputBaseComponent } from 'shared/components/input/input-base.component';
import { isNil } from 'lodash';

export abstract class InputTextBaseComponent extends InputBaseComponent {

  @Input() placeholder: string;
  @Input() maxLength: number = undefined;

  getMaxLength(): string {
    return isNil(this.maxLength)
      ? undefined
      : String(this.maxLength);
  }
}
