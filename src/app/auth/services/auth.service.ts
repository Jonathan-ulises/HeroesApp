import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Auth } from '../interfaces/auth.interface';
import { tap } from 'rxjs/operators';

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

  login() : Observable<Auth> {
    return this.http.get<Auth>(`${ this.baseurl }/usuarios/1`)
      .pipe(
        tap( auth => this._auth = auth ),
        tap( auth => localStorage.setItem('id', auth.id))
      );
  }
}
