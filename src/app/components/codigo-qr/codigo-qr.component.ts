import { Component, OnInit } from '@angular/core';
import { RegistroAsistencia } from 'src/app/clases/registro-asistencia';
import { ServicerestService } from 'src/app/services/servicerest.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.component.html',
  styleUrls: ['./codigo-qr.component.scss'],
})
export class CodigoQrComponent implements OnInit {


  serviceID = 'default_service';
  templateID = 'template_9z2bw0r';

  constructor(private serviceRest: ServicerestService,private barcodeScanner: BarcodeScanner, private alertController: AlertController) { }

  code: any;

  codeEjemplo: String = 'Asignatura: INI2020\nFecha: 14/12/23\nDocente: Patricia Maldonado\nEstado: Justificado\n'

  estadoRegex = /Estado: (.+?)\n/;
  fechaRegex = /Fecha: (.+?)\n/;
  profesorRegex = /Docente: (.+?)\n/;
  asignaturaRegex = /Asignatura: (.+?)\n/;

  qrEstado : string = '';
  qrFecha: string = '';
  qrProfesor: string = '';
  qrAsignatura: string = '';

  async scannerQr() {
    this.barcodeScanner
      .scan().then(async (barcodeData) => {
        this.code = barcodeData.text
        

        console.log('Barcode data', barcodeData);
        this.qrAsignatura = this.code.match(this.asignaturaRegex);
        this.qrEstado = this.code.match(this.estadoRegex);
        this.qrFecha = this.code.match(this.fechaRegex);
        this.qrProfesor = this.code.match(this.profesorRegex);

        await this.presentAlert();
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmar Datos',
      inputs: this.alertInputs,
      buttons: this.alertButtons,
    });
  
    
  }

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
      value: this.qrAsignatura,

    },
    {
      id: 'profesor',
      name: 'profesor',
      placeholder: 'Profesor',
      value: this.qrProfesor,

    },
    {
      id: 'fecha',
      name: 'fecha',
      placeholder: 'Fecha',
      value: this.qrFecha,

    },
    {
      id: 'estado',
      name: 'estado',
      placeholder: 'Estado',
      value: this.qrEstado,

    },
  ];
  ngOnInit() { 
    this.serviceRest.fetchRegistros();
  }

  setResult(ev: { detail: { role: any; }; }) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }


  

}
