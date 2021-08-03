import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'auth',
    //Para el Lazyload y rutas hijas, se especifica que cargue estas rutas. Esto se hace
    //mediante una lamba. Pedira importar un modulo, en este caso auth.module. Cuendo
    //este este cargado, regresara el modulo de Auth.
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    //component: ErrorPageComponent
    redirectTo: '404'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
