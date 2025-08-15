import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appMatchPassword]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MatchPasswordDirective, multi: true }
  ]
})
export class MatchPasswordDirective implements Validator {
  @Input('appMatchPassword') passwordValue!: string; 

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value || !this.passwordValue) return null;
    return control.value === this.passwordValue ? null : { matchPassword: true };
  }
}
