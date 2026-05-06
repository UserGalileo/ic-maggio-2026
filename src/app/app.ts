import { Component } from '@angular/core';
import { Users } from './components/users';

@Component({
  selector: 'app-root',
  imports: [Users],
  template: `

    <app-users />
  `,
})
export class App {}
