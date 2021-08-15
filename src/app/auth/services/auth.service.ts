import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable , of } from 'rxjs';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseurl: string = environment.baseURL;
  private _auth: Auth | undefined;

  get auth() {
    return {...this._auth};
  }

  constructor(
    private http: HttpClient
  ) { }


  verificaAutentificacion() : Observable<boolean> {

    if( !localStorage.getItem('token' ) ) {
      return of(false); //Crea observables del argumente que se le pase.
    }

    return this.http.get<Auth>(`${ this.baseurl }/usuarios/1`)
              .pipe(
                //* Operador RXJS que puede transforma una respuesta y emitir nuevas valores
                map( auth => {
                  this._auth = auth;
                  console.log('map', auth);
                  return true;
                } ) 
              );

  }

  login() : Observable<Auth> {
    return this.http.get<Auth>(`${ this.baseurl }/usuarios/1`)
      .pipe(
        tap( auth => this._auth = auth ),
        tap( auth => localStorage.setItem('token', auth.id))
      );
  }
}
