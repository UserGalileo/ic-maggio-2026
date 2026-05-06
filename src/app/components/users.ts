import { Component, computed, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { User } from '../models/user';
import { Post } from '../models/post';
import { environment as env } from '../../environments/environment';

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
          <li (click)="toggleUser(user.id)">{{ user.username }}</li>
        }
      </ul>
    }

    Current user: {{ currentUser()?.username }}
    <hr />

    Posts:

    <ul>
      @for (post of postsResource.value(); track post.id) {
        <li>{{ post.title }}</li>
      }
    </ul>
  `,
})
export class Users {
  usersResource = httpResource<User[]>(() => `${env.apiUrl}/users`);

  currentUserId = signal<User['id'] | null>(null);

  currentUser = computed(() =>
    this.usersResource.value()?.find((u) => u.id === this.currentUserId()),
  );

  postsResource = httpResource<Post[]>(() =>
    this.currentUserId()
      ? `${env.apiUrl}/posts?userId=${this.currentUserId()}`
      : undefined,
  );

  toggleUser(id: User['id']) {
    if (this.currentUserId() === id) {
      this.currentUserId.set(null);
    } else {
      this.currentUserId.set(id);
    }
  }
}
