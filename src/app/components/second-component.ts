import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators as V,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

export function forbidden(term: string): ValidatorFn {
  return control => {
    const value = '' + control.value;
    if (value === term) {
      return {
        forbidden: `${term} is forbidden.`
      }
    }
    return null;
  }
}

export const noMarioRossi: ValidatorFn = control => {
  const { firstName, lastName } = control.value;
  if (firstName === 'mario' && lastName === 'rossi') {
    return {
      noMarioRossi: true
    }
  }
  return null;
}

@Component({
  selector: 'app-second',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="firstName" />
      @if (form.controls.firstName.errors) {
        {{ form.controls.firstName.errors['forbidden'] }}
      }
      <input type="text" formControlName="lastName" />
      <ng-container formGroupName="address">
        <input type="text" formControlName="street" />
        <input type="text" formControlName="nr" />
      </ng-container>

      <button>Submit</button>
    </form>

    {{ form.errors | json }}

    <hr />

    Dirty: {{ form.dirty }}<br />
    Pristine: {{ form.pristine }}<br />
    Touched: {{ form.touched }}<br />
    Untouched: {{ form.untouched }}<br />
    Status: {{ form.status }}
  `,
  imports: [ReactiveFormsModule, JsonPipe],
})
export default class Second {
  fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    firstName: ['', [forbidden('michele')], []],
    lastName: ['', [V.required, V.minLength(3)]],
    address: this.fb.group({
      street: '',
      nr: '',
    }),
  }, {
    validators: [noMarioRossi]
  });

  constructor() {
    this.form.reset();
  }

  onSubmit() {
    console.log(this.form.getRawValue());
  }
}
