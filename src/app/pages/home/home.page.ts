import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AnimationController, IonCard, IonTitle } from '@ionic/angular';
import { Animation } from '@ionic/angular';
import { Router } from '@angular/router';
import { BdlocalService } from 'src/app/service/bdlocal.service';

@Component({

  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loggedUsuario: string = ''; //almacena usuario


  constructor(private router: Router, private bdlocalservice: BdlocalService) { }

  ngOnInit() {
    this.loggedUsuario = localStorage.getItem('username') || '';
  }

  logOut() {
    this.router.navigate(['/login']);


  }
  irCodigo(){
    this.router.navigate(['/codigo/codigoQr'])
  }

  irAsistencia(){
    this.router.navigate(['/asistencia'])
  }
}