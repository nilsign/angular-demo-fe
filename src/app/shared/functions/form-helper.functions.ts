import { isNil } from 'lodash';
import { FormControl } from '@angular/forms';

export function hasErrorInfo(formControl: FormControl): boolean {
  return formControl.invalid
      && formControl.touched
      && !isNil(getErrorInfo(formControl));
}

export function getErrorInfo(formControl: FormControl): string {
  let errorInfo: string = null;
  if (formControl.errors) {
    Object.keys(formControl.errors).forEach((errorKey: string) => {
      errorInfo = formControl.errors[errorKey];
    });
  }
  return errorInfo;
}
