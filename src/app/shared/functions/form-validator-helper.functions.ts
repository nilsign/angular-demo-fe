import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isNil } from 'lodash';

// tslint:disable-next-line:max-line-length
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript?page=1&tab=votes#tab-top
// tslint:disable-next-line:max-line-length
const regExEmailValidation = new RegExp(/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/, 'i');

export function getEmailValidator(customErrorText?: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value !== '' && !regExEmailValidation.test(control.value)
      ? { illegalEmailFormat: chooseErrorText('Illegal Email format.', customErrorText) }
      : null;
  };
}

export function getRequiredValidation(customErrorText?: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return isNil(control.value) || control.value.toString().trim() === ''
        ? { missingRequiredInput: chooseErrorText('Required field.', customErrorText) }
        : null;
  };
}

export function getMinLengthValidation(minLength: number, customErrorText?: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return isNil(control.value) || control.value.toString().trim().length < minLength
        ? { minimalInputLengthViolation: chooseErrorText(
            `String must contain at least ${minLength} characters.`, customErrorText) }
        : null;
  };
}

function chooseErrorText(errorText: string, customErrorText: string) {
  return isNil(customErrorText)
      ? errorText
      : customErrorText;
}
