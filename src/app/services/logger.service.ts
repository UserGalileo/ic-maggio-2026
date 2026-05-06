import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {

  constructor() {
    console.log('logger')
  }

  log(msg: string) {
    console.log(msg);
  }
}
