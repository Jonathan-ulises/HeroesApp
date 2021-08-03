import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        //switchMap(informacion_pipe => segundo_observer)
        switchMap( ({ id }) => this.heroeService.getHeroePorId( id ))
      ).subscribe( ( heroe ) => {
        this.heroe = heroe;
      });
  }

  /**
   * Metodo para redrieccionar al listado de heroes
   */
  regresar(): void {
    //Con Router poder navagar hacia una ruta con un metodo.
    this.router.navigate(['/heroes/listado']);
  }

}
