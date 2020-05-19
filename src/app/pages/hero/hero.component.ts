import { Component, OnInit } from '@angular/core';
import { HeroModel } from 'src/app/models/hero.models';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2'; 
import { Observable } from 'rxjs';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  hero: HeroModel = new HeroModel();

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
  }

  save(form: NgForm) {
    if (form.invalid) {
      console.log('not valid Form');
      return;
    }
    
    Swal.fire({
      title: 'Wait',
      text: 'Saving data',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let petition: Observable<any>;

    if (this.hero.id) {
      petition = this.heroesService.updateHero(this.hero);
      /* .subscribe(resp => {
        console.log(resp);
      }); */
    } else {
      petition = this.heroesService.createHero(this.hero);
      /* .subscribe(resp => {
        this.hero = resp;
        console.log(resp);
      }); */
    }

    petition.subscribe( resp => {
      Swal.fire({
        title: this.hero.name,
        text: 'Has been updated',
        icon: 'success'
      });
    })

    } 
    // se crea petition y se elimina el subscribe de cada condicional, para centralizarlo y mandar el Swal siempre que finalice la peticion

}
