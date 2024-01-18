import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciaPageRoutingModule } from './asistencia-routing.module';

import { AsistenciaPage } from './asistencia.page';
import { DetalleAsistenciaComponent } from 'src/app/components/detalle-asistencia/detalle-asistencia.component';
import { NgxSearchFilterModule } from 'ngx-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaPageRoutingModule,
    NgxSearchFilterModule,
  ],
  declarations: [AsistenciaPage,DetalleAsistenciaComponent]
})
export class AsistenciaPageModule {}
