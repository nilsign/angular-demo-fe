import { Component, Input } from '@angular/core';
import { isNil } from 'lodash';
import { FormControl } from '@angular/forms';
import { getErrorInfo, hasErrorInfo } from 'shared/functions/form-helper.functions';

@Component({
  selector: 'app-field-info',
  templateUrl: './field-info.component.html',
  styleUrls: ['./field-info.component.scss']
})
export class FieldInfoComponent {

  @Input() control: FormControl;
  @Input() fieldId: string;
  @Input() fieldInfo: string;

  hasFieldInfo(): boolean {
    return !isNil(this.fieldInfo);
  }

  hasErrorInfo(): boolean {
    return hasErrorInfo(this.control)
        && this.control.touched
        && !isNil(this.control.value);
  }

  getErrorInfo(): string {
    return getErrorInfo(this.control);
  }

  getFieldInfo(): string {
    const errorInfo = this.getErrorInfo();
    return !isNil(errorInfo) && this.control.touched
        ? errorInfo
        : this.fieldInfo;
  }
}
