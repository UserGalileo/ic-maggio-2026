import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}
