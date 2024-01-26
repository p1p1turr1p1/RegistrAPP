import { Component, OnInit } from '@angular/core';
import { RegistroAsistencia } from 'src/app/clases/registro-asistencia';
import { ServicerestService } from 'src/app/services/servicerest.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.component.html',
  styleUrls: ['./codigo-qr.component.scss'],
})
export class CodigoQrComponent implements OnInit {


  serviceID = 'default_service';
  templateID = 'template_9z2bw0r';

  constructor(private serviceRest: ServicerestService, private barcodeScanner: BarcodeScanner, private alertController: AlertController, private toastController:ToastController) { }

  code: any;

  codeEjemplo: String = 'Asignatura: INI2020\nFecha: 14/12/23\nDocente: Patricia Maldonado\nEstado: Justificado\n'

  estadoRegex = /Estado: (.+?)\n/;
  fechaRegex = /Fecha: (.+?)\n/;
  profesorRegex = /Docente: (.+?)\n/;
  asignaturaRegex = /Asignatura: (.+?)\n/;

  qrEstado: string = '';
  qrFecha: string = '';
  qrProfesor: string = '';
  qrAsignatura: string = '';



  async scannerQr() {
    this.barcodeScanner
      .scan().then(async (barcodeData) => {
        this.code = barcodeData.text
        const listaDatos = this.code.split('-');
        console.log('Barcode data', barcodeData);
        this.qrAsignatura = listaDatos[0];
        this.qrEstado = listaDatos[3];
        this.qrFecha = listaDatos[1];
        this.qrProfesor = listaDatos[2];

        await this.presentAlert();    
      }).then()
      .catch((err) => {
        console.log('Error', err);
      });
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      translucent:true,
      color:'medium',
      position: 'top',
      duration: 2000
    });
    toast.present();
  

    await toast.present();
  }
  async presentAlert() {
    let alert = await this.alertController.create({
      header: 'Confirmar datos',
      inputs: [
        {
          id: 'email_usuario',
          name: 'email_usuario',
          placeholder: 'email',
          value: 'valenzuela.alou01@gmail.com',
          disabled: true
        },
        {
          id: 'asignatura',
          name: 'asignatura',
          placeholder: 'Asignatura',
          value: this.qrAsignatura,
          disabled: true
        },
        {
          id: 'profesor',
          name: 'profesor',
          placeholder: 'Profesor',
          value: this.qrProfesor,
          disabled: true
        },
        {
          id: 'fecha',
          name: 'fecha',
          placeholder: 'Fecha',
          value: this.qrFecha,
          disabled: true
        },
        {
          id: 'estado',
          name: 'estado',
          placeholder: 'Estado',
          value: this.qrEstado,
          disabled: true
        },
      ],
      buttons: [
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
            this.presentToast('Registro exitoso.');

          },
        }
      ],
    });
    
    await alert.present();
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
  cambiarValoresInputs() {

    this.alertInputs.forEach(input => {
      switch (input.id) {
        case 'asignatura':

          input.value = this.qrAsignatura;
          break;
        case 'profesor':

          input.value = this.qrProfesor;
          break;
        case 'fecha':
          input.value = this.qrFecha;
          break;
        case 'estado':

          input.value = this.qrEstado;
          break;

      }
    });
  }
  ngOnInit() {
    this.serviceRest.fetchRegistros();
  }

  setResult(ev: { detail: { role: any; }; }) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }




}
