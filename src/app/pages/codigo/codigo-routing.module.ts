import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigoPage } from './codigo.page';
import { CodigoQrComponent } from 'src/app/components/codigo-qr/codigo-qr.component';
import { CodigoTextoComponent } from 'src/app/components/codigo-texto/codigo-texto.component';

const routes: Routes = [
  {
    path: '',
    component: CodigoPage,

    children:[
      {
        path:'codigoQr',
        component: CodigoQrComponent
      },
      {
        path:'codigoTexto',
        component: CodigoTextoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoPageRoutingModule {}
