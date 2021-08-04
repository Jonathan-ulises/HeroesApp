import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };

  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    //Se verifica que se este en la pagina de editar, esto preguntando si la
    //url contiene la aparte 'editar'; devuelve true o false
    if ( this.router.url.includes('editar') ) {
     [ this.activateRoute.params
         .pipe(
           switchMap( ({ id }) => this.heroesService.getHeroePorId( id ))
         ).subscribe( heroe => this.heroe = heroe)]
    }

    
  }

  guardar() : void {
    if( this.heroe.superhero.trim().length === 0 ) {
      return;
    }

    if ( this.heroe.id ) {
      //Actualizar
      this.heroesService.actualizarHeroe( this.heroe )
        .subscribe( resp => console.log('Actualizando', this.heroe));

    } else {
      //Crear
      this.heroesService.agregarHeroe( this.heroe )
      .subscribe( heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]);
      });

    }
  }

  borrarHeroe() : void {
    this.heroesService.borrarHeroe( this.heroe.id! )
      .subscribe( resp => {
        this.router.navigate(['/heroes'])
      });
  }
}
