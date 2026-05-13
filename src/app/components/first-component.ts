import { Component, computed, inject, signal } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  exhaustMap,
  fromEvent,
  interval,
  map,
  mergeMap,
  Observable,
  ObservableInput,
  of,
  OperatorFunction,
  pipe,
  ReplaySubject,
  Subject,
  Subscription,
  switchMap,
  take,
} from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CityService } from '../services/city.service';

const liveSearch = <T>(time: number, fn: (term: string) => Observable<T>): OperatorFunction<string | null, T> =>
  pipe(
    debounceTime(time),
    distinctUntilChanged(),
    switchMap(term => fn(term ?? '')),
  );

@Component({
  selector: 'app-first',
  template: `
    <input type="text" [formControl]="control" />

    <ul>
      @for (result of results(); track result) {
        <li>{{ result }}</li>
      }
    </ul>

    <button (click)="startStop$.next(true)">start</button>
    <button (click)="startStop$.next(false)">stop</button>
  `,
  imports: [ReactiveFormsModule],
})
export class First {
  cityService = inject(CityService);

  control = new FormControl('');

  results = signal<string[]>([]);

  startStop$ = new Subject<boolean>();

  socket$ = interval(1000);

  constructor() {
    this.control.valueChanges
      .pipe(liveSearch(500, (term) => this.cityService.getSuggestions(term)))
      .subscribe((results) => this.results.set(results));

    this.startStop$
      .pipe(
        distinctUntilChanged(),
        switchMap((start) => (start ? this.socket$ : [])),
      )
      .subscribe(console.log);
  }
}


// FLATTENING OPERATORS

// mergeMap -> tutto in parallelo
// concatMap -> quando arriva un nuovo valore, lo mette in coda
// switchMap -> quando arriva un nuovo valore, fermo il vecchio observable
// exhaustMap -> quando arriva un nuovo valore, lo butta via
