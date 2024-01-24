import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { AnimationController, IonCard, IonTitle } from '@ionic/angular';
import { Animation } from '@ionic/angular';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loggedUsuario: string = ''; //almacena usuario

  code: any;
  constructor(private router: Router, private barcodeScanner: BarcodeScanner) {}

  ngOnInit() {
    this.loggedUsuario = localStorage.getItem('username') || '';
  }

  logOut() {
    this.router.navigate(['/login']);
  }
  irCodigo() {
    this.router.navigate(['/codigo/codigoQr']);
  }

  irAsistencia() {
    this.router.navigate(['/asistencia']);
  }

  scannerQr() {
    this.barcodeScanner
      .scan().then((barcodeData) => {
        this.code =barcodeData.text
        console.log('Barcode data', barcodeData);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }
}
