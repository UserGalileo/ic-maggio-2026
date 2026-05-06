import { Component, computed, effect, signal, untracked } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <span [class.danger]="count() < 0">{{ count() }}</span>
    <button (click)="inc()">+</button>
    <button (click)="dec()">-</button>
  `,
  styles: `
    .danger {
      color: red;
    }
  `
})
export class Counter {

  // Stati
  count = signal(0);

  // Stato derivato
  // doubleCount = computed(() => this.count() * 2);

  constructor() {

    // ATTENZIONE - Non usarlo per chiamate HTTP
    effect(() => {
      console.log(this.count());
    });
  }

  inc() {
    this.count.update(n => n + 1);
  }

  dec() {
    this.count.update(n => n - 1);
  }
}
