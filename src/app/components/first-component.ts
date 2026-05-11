import { Component, signal } from '@angular/core';
import {
  catchError,
  filter,
  from,
  fromEvent,
  interval,
  map,
  of,
  retry,
  skip,
  skipUntil,
  skipWhile,
  Subscription,
  take,
  takeUntil,
  takeWhile,
  tap,
  throwError,
} from 'rxjs';

@Component({
  selector: 'app-first',
  template: `First`,
})
export class First {

  click$ = fromEvent(document, 'click');

  source$ = interval(1000).pipe(
    map(n => {
      if (n === 3) throw new Error('Aiaiai');
      return n;
    }),
  );

  constructor() {
    this.source$.subscribe({
      next: console.log,
      error: console.error,
      complete: () => console.log('complete'),
    });
  }
}
