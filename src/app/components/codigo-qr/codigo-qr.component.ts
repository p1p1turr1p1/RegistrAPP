import { Component, OnInit } from '@angular/core';
import { RegistroAsistencia } from 'src/app/clases/registro-asistencia';
import { ServicerestService } from 'src/app/services/servicerest.service';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.component.html',
  styleUrls: ['./codigo-qr.component.scss'],
})
export class CodigoQrComponent  implements OnInit {

  constructor(private serviceRest: ServicerestService) { }

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      }
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: (data: any) => {
        console.log(data);
        this.serviceRest.addRegistro(data);
      },
    }
  ];
  public alertInputs = [
    {
      name: 'alumno',
      placeholder: 'Nombre',
      value: 'Vicente Valenzuela',
      
    },
    {
      name: 'asignatura',
      placeholder: 'Asignatura',
      value: 'INI1313',
      
    },
    {
      name: 'profesor',
      placeholder: 'Profesor',
      value: 'Daniel Lopez',
     
    },
    {
      name: 'fecha',
      placeholder: 'Hora Fecha',
      value: '14:30 01/01/2024',
      
    },
    {
      name: 'estado',
      placeholder: 'Estado',
      value: 'Presente',
      
    },
  ];
  ngOnInit() {}

  setResult(ev: { detail: { role: any; }; }) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }
}
