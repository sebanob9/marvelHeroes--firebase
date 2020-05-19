import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { HeroModel } from '../models/hero.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-10cfd.firebaseio.com';

  constructor(private http: HttpClient) { }

  createHero(hero: HeroModel ) {
    return this.http.post(`${this.url}/heroes.json`, hero )
      .pipe(
        map((resp:any) => {
          hero.id = resp.name;
          return hero;
        })
      );
  }

  updateHero(hero: HeroModel) {
    const heroTemp = {
      ...hero
    };

    delete heroTemp.id;

    return this.http.put(`${this.url}/heroes/${hero.id}.json`, heroTemp)
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`);
  }
      
}
