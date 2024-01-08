import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})



export class LoginPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  mensaje = '';
  correo: string;

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

  usuario: string = '';
  password: string = '';

  constructor(private router: Router) { }


  
  irHome() {
    localStorage.setItem('usuario', this.usuario);
    this.router.navigate(['/home']);
} 
  ngOnInit() {
  }

}
