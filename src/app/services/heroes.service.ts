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


  deleteHero(id: string) {
    return this.http.delete(`${this.url}/heroes/${ id }.json`);
  }

  
  updateHero(hero: HeroModel) {
    const heroTemp = {
      ...hero
    };

    delete heroTemp.id;

    return this.http.put(`${this.url}/heroes/${hero.id}.json`, heroTemp)
  }

  getHero(id: string) {
    return this.http.get(`${this.url}/heroes/${ id }.json`)
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
            .pipe(
              map(resp => this.createArray(resp))
            );
  }
    private createArray(heroesObj: object) {
      const heroes: HeroModel[] = [];
      console.log(heroesObj);
      if (heroesObj === null) { return []; }
      
      Object.keys (heroesObj ).forEach ( key => {
        const hero: HeroModel = heroesObj[key]
        hero.id = key;
        console.log(hero.id, hero.name);
        heroes.push(hero);
      });
      
      return heroes;
    }  
}
