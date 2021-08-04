import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete/autocomplete';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Metodo para buscar las sugerencias del autocomplete
   */
  buscando(): void {
    this.heroesService.getSugerencias( this.termino.trim() )
      .subscribe( (resp) => {
        this.heroes = resp;
        console.log(resp);
      })
  }

  /**
   * Optiene el elemento seleccionado y realiza una consulta al backEnd.
   * @param event evento de la opcion seleccionada
   */
  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) : void {
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;
    this.heroesService.getHeroePorId( heroe.id! )
      .subscribe( heroe => this.heroeSeleccionado = heroe);
  }

}
