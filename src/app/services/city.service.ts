import { Injectable } from '@angular/core';
import { cities } from '../utils/cities';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  getSuggestions(term: string) {
    console.log('sto cercando...');
    const filteredCities = cities
      .filter(c => c.city.toLowerCase().startsWith(term.toLowerCase()))
      .map(c => c.city);

    return of(filteredCities).pipe(
      delay(500)
    );
  }
}
