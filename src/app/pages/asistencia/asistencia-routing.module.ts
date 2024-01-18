import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaPage } from './asistencia.page';
import { DetalleAsistenciaComponent } from 'src/app/components/detalle-asistencia/detalle-asistencia.component';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaPage,

    children:[
      {
        path:'detalleAsistencia',
        component: DetalleAsistenciaComponent,
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciaPageRoutingModule {}
