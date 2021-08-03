import { Component, Input, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
    `
      mat-card {
        margin-top: 20px;
      }
    `
  ]
})
export class HeroeTarjetaComponent {

  // @Input() heroe: Heroe = {
  //   superhero: '',
  //   publisher: Publisher.DCComics,
  //   alter_ego:'',
  //   first_appearance: '',
  //   characters: ''
  // };

  @Input() heroe!: Heroe;

}
