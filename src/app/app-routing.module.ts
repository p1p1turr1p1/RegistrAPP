import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
      canActivate: [AuthGuard],

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',

  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'recuperar',
    loadChildren: () =>
      import('./pages/recuperar/recuperar.module').then(
        (m) => m.RecuperarPageModule
      ),
  },
  {
    path: 'codigo',
    loadChildren: () =>
      import('./pages/codigo/codigo.module').then((m) => m.CodigoPageModule),
  },
  {
    path: 'asistencia',
    loadChildren: () =>
      import('./pages/asistencia/asistencia.module').then(
        (m) => m.AsistenciaPageModule
      ),
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },









  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
