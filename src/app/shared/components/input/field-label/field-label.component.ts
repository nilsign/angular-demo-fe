import { Component, Input } from '@angular/core';
import { isNil } from 'lodash';

@Component({
  selector: 'app-field-label',
  templateUrl: './field-label.component.html',
  styleUrls: ['./field-label.component.scss']
})
export class FieldLabelComponent {

  @Input() fieldId: string;
  @Input() fieldLabel: string;

  hasFieldLabel() {
    return !isNil(this.fieldLabel);
  }
}
