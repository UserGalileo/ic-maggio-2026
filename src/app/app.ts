import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { interval, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav>
      <ul>
        <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a></li>
        <li><a routerLink="/first" routerLinkActive="active">First</a></li>
        <li><a routerLink="/second" routerLinkActive="active">Second</a></li>
        <li><a routerLink="/users" routerLinkActive="active">Users</a></li>
      </ul>
    </nav>

    <hr>

    <router-outlet />
  `,
  styles: `
    .active {
      background: blue;
      color: white;
    }
  `,
})
export class App {

}



