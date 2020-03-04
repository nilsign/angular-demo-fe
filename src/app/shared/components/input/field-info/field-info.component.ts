import { Component, Input } from '@angular/core';
import { isNil } from 'lodash';

@Component({
  selector: 'app-field-info',
  templateUrl: './field-info.component.html',
  styleUrls: ['./field-info.component.scss']
})
export class FieldInfoComponent {

  @Input() fieldId: string;
  @Input() fieldInfo: string;

  hasFieldInfo(): boolean {
    return !isNil(this.fieldInfo);
  }
}
