import { Directive } from '@angular/core';
import {
  Validator,
  NG_VALIDATORS,
  ValidatorFn,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[appUrlvalidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UrlValidatorDirective,
      multi: true,
    },
  ],
})
export class UrlValidatorDirective implements Validator {
  validator: ValidatorFn;
  constructor() {
    this.validator = this.urlValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  urlValidator(): ValidatorFn {
    console.log('urlValidator called');
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid =
        /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm.test(
          control.value
        );
      return isValid ? null : { forbiddenName: { value: control.value } };
    };
  }
}
