import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  //Envirament del servicio: desarrollo
  private baseURL: string = environment.baseURL;

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.baseURL }/heroes`);
  }

  getHeroePorId( id: string ): Observable<Heroe> {
    return this.http.get<Heroe>(`${ this.baseURL }/heroes/${ id }`);
  }

  getSugerencias( termino: string ): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.baseURL }/heroes?q=${ termino }&_limit=6`);
  }

  agregarHeroe( heroe: Heroe ): Observable<Heroe> {
    return this.http.post<Heroe>(`${ this.baseURL }/heroes`, heroe)
  }
}
