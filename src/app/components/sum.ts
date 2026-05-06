import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sum',
  template: `
    {{ a() }} + {{ b() }} = {{ a() + b() }}
  `
})
export class Sum {

  a = input(0);
  b = input(0);

}
