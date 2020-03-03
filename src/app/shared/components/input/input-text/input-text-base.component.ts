import { Input } from '@angular/core';
import { InputBaseComponent } from 'shared/components/input/input-base.component';

export abstract class InputTextBaseComponent extends InputBaseComponent {

  @Input() placeholder: string;

  protected constructor() {
    super();
  }
}
