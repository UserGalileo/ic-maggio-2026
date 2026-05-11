import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { User } from '../../models/user';
import { environment as env } from '../../../environments/environment';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  template: `
    @if (usersResource.isLoading()) {
      Loading...
    } @else if (usersResource.error()) {
      Aiaiai
    } @else {
      <ul>
        @for (user of usersResource.value(); track user.id) {
          <li>
            <a [routerLink]="'' + user.id">{{ user.username }}</a>
          </li>
        }
      </ul>
    }

    <router-outlet />
  `,
  imports: [RouterLink, RouterOutlet],
})
export class Users {
  usersResource = httpResource<User[]>(() => `${env.apiUrl}/users`);
}
