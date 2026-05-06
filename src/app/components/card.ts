import { Component, inject } from '@angular/core';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-card',
  template: `
    <div>
      <ng-content />

      <ng-content select="app-slider"></ng-content>
    </div>
  `,
  styles: `
    div {
      padding: 1em;
      border: 1px solid black;
      border-radius: 5px;
    }
  `
})
export class Card {

  logger = inject(LoggerService);

}
