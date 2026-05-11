import { Component, computed, inject, input } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { User as IUser } from '../../models/user';

@Component({
  selector: 'app-user',
  template: `
    User {{ userId() }}

    <br />
    @if (previousId()) {
      <a [routerLink]="'/users/' + previousId()">Prev</a>
    }
    <br />
    @if (nextId()) {
      <a [routerLink]="'/users/' + nextId()">Next</a>
    }

    <hr />

    {{ userResource.value() | json }}
  `,
  imports: [RouterLink, JsonPipe],
})
export class User {
  userId = input.required<string>();

  usersResource = httpResource<IUser[]>(() => `${env.apiUrl}/users`);
  userResource = httpResource<IUser>(() => `${env.apiUrl}/users/${this.userId()}`);

  usersLength = computed(() => this.usersResource.value()?.length);

  previousId = computed(() => {
    const userId = this.userResource.value()?.id || 0;

    if (userId < 2) {
      return undefined;
    }

    return '' + (userId - 1);
  });

  nextId = computed(() => {
    const userId = this.userResource.value()?.id;
    const usersLength = this.usersLength();

    if (!userId || !usersLength || userId > usersLength - 1) {
      return undefined;
    }

    return '' + (userId + 1);
  });
}
