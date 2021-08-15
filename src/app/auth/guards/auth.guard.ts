import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private authService: AuthService
  ){}

  //* Previene si puede activar alguna ruta, si ya fue cargado el modulo o ruta, este valida cuando se active,
  //* cuando el usuario entre en ella; si devuelve un false, este no podra mostrar las secciones que tengan esta
  //* propiedad.
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if( this.authService.auth.id ) {
        return true;
      }

      console.log( 'Baneado por el AuthGuard papu... - CanActivate' )

    return true;
  }

  //* Previene si puede cargar la ruta, si la ruta ya a sido cargada, el usuario puede entrar en ella
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      // console.log('canLoad', false);
      // console.log(route);
      // console.log(segments);

      if( this.authService.auth.id ) {
        return true;
      }

      console.log( 'Baneado por el AuthGuard papu... - CanLoad' )

      return false;
  }
}
