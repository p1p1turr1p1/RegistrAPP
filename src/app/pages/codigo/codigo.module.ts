import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoPageRoutingModule } from './codigo-routing.module';

import { CodigoPage } from './codigo.page';
import { CodigoTextoComponent } from 'src/app/components/codigo-texto/codigo-texto.component';
import { CodigoQrComponent } from 'src/app/components/codigo-qr/codigo-qr.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoPageRoutingModule
  ],
  declarations: [CodigoPage,CodigoQrComponent,CodigoTextoComponent,]
})
export class CodigoPageModule {}
