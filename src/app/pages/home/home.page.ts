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
import { BdlocalService } from 'src/app/services/bdlocal.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loggedUsuario: string = ''; //almacena usuario
  nombreMostrar: string = '';
  constructor(
    private storage: Storage,
    private router: Router,
    private barcodeScanner: BarcodeScanner,
    public bdlocalservice: BdlocalService,
    private navCtrl: NavController,
    private auth: AuthServiceService,
  ) {
    this.bdlocalservice.Init();

  }

  async ngOnInit() {
    
  this.getWeas();  

  }

  async logOut() {
await this.auth.signOut();
console.log('logout')
  }
  irCodigo() {
    this.router.navigate(['/codigo/codigoQr']);
  }

  irAsistencia() {
    this.router.navigate(['/asistencia']);
  }

  async getWeas() {
    try {
      const usuarioAutenticado = await this.storage.get('usuarioAutenticado');
      this.loggedUsuario = usuarioAutenticado?.username;
      console.log('funka el mostrar nombreuser')
    } catch (error) {
      console.error('Error retrieving username:', error);
    }
  }

  
}
