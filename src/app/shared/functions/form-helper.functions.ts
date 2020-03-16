import { isNil } from 'lodash';
import { FormControl, FormGroup } from '@angular/forms';

export function hasErrorInfo(formControl: FormControl): boolean {
  return !isNil(formControl)
      && formControl.invalid
      && formControl.touched
      && !isNil(getErrorInfo(formControl));
}

export function getErrorInfo(formControl: FormControl): string {
  let errorInfo: string = null;
  if (!isNil(formControl) && formControl.errors) {
    Object.keys(formControl.errors).forEach((errorKey: string) => {
      errorInfo = formControl.errors[errorKey];
    });
  }
  return errorInfo;
}

export function getFormControl(formGroup: FormGroup, controlName: string): FormControl {
  return formGroup.controls[controlName] as FormControl;
}

export function getFormControlValue(formGroup: FormGroup, controlName: string): any {
  return formGroup.controls[controlName].value;
}

