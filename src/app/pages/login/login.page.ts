import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { BdlocalService } from 'src/app/service/bdlocal.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})





export class LoginPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;




  mensaje = '';
  mensajeRe= 'Registro completo';
  correo: string;



  constructor(private router: Router, private bdlocalservice: BdlocalService) { }



  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.correo, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.mensaje = `Se ha enviado un link de recupareción a tu correo.`;
    }
  }

  
  irHome() {
    localStorage.setItem('username', this.username);
    this.router.navigate(['/home']);
} 
  ngOnInit() {
  }

  username!: string;
  password!: string;
  email!: string;


  registrar(){
    console.log(this.username);
    console.log(this.email);
    this.bdlocalservice.registrarse(this.username,this.password,this.email);

  }



  login(){
    this.bdlocalservice.login;
  }

}
