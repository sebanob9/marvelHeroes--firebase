import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroModel } from 'src/app/models/hero.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroModel[] = [];
  loading = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
    this.loading = true;
    this.heroesService.getHeroes()
      .subscribe(resp => {
        console.log(resp);
        this.heroes = resp;
        this.loading = false;
      });
  }

  deteleHero(hero: HeroModel, i: number) {

    Swal.fire({
      title: 'Delete Marvel Hero',
      text: `Do you want to delete ${hero.name}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) { // si la respuesta es true borramos
        this.heroes.splice(i , 1);
        this.heroesService.deleteHero(hero.id).subscribe();
      }
    });
    
  }
}
