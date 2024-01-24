import { Component, OnInit } from '@angular/core';
import { RegistroAsistencia } from 'src/app/clases/registro-asistencia';
import { ServicerestService } from 'src/app/services/servicerest.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.component.html',
  styleUrls: ['./codigo-qr.component.scss'],
})
export class CodigoQrComponent implements OnInit {


  serviceID = 'default_service';
  templateID = 'template_9z2bw0r';

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

        var templateParams = {
          email_usuario: data.email_usuario,
          message: `Asignatura: ${data.asignatura}\n
                    Profesor(a):  ${data.profesor}\n
                    Fecha: ${data.fecha}\n
                    Estado: ${data.estado}`
      };
        console.log(templateParams);
        console.log(data);
        

        emailjs.send(this.serviceID, this.templateID, templateParams, '6nmhBUsLCjaV0tcvR')
          .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
          }, function (error) {
            console.log('FAILED...', error);
          });
          this.serviceRest.addRegistro(data);
      },
    }
  ];
  public alertInputs = [
    {
      id: 'email_usuario',
      name: 'email_usuario',
      placeholder: 'email',
      value: 'valenzuela.alou01@gmail.com',

    },
    {
      id: 'asignatura',
      name: 'asignatura',
      placeholder: 'Asignatura',
      value: 'INI1313',

    },
    {
      id: 'profesor',
      name: 'profesor',
      placeholder: 'Profesor',
      value: 'Daniel Lopez',

    },
    {
      id: 'fecha',
      name: 'fecha',
      placeholder: 'Fecha',
      value: '14:30',

    },
    {
      id: 'estado',
      name: 'estado',
      placeholder: 'Estado',
      value: 'Presente',

    },
  ];
  ngOnInit() { 
    this.serviceRest.fetchRegistros();
  }

  setResult(ev: { detail: { role: any; }; }) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }


}
