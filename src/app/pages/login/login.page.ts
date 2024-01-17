
import { Component, ElementRef, OnInit, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { AnimationController, IonImg, IonTitle } from '@ionic/angular';
import { Animation } from '@ionic/angular';
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




  constructor(private router: Router, private bdlocalservice: BdlocalService, private animationCtrl: AnimationController) { }



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

  username!: string;
  password!: string;
  email!: string;


  registrar(){
    console.log(this.username);
    console.log(this.email);
    this.bdlocalservice.registrarse(this.username,this.password,this.email);
    this.modal.dismiss;

  }

login(){
  
  
  this.bdlocalservice.login(this.username, this.password);
  
}

  
  ngOnInit() {
  }

  // @ViewChildren(IonTitle, {read: ElementRef})
  // titleElements!:QueryList<ElementRef<HTMLIonTitleElement>>;
  // @ViewChildren(IonImg, {read:ElementRef})
  // iconElements!:QueryList<ElementRef<HTMLIonImgElement>>;

  // private animation!:Animation; 

  // ngAfterViewInit(){
  //   const logo = this.animationCtrl
  //   .create()
  //   .addElement(this.iconElements.get(0)!.nativeElement)

  //   .keyframes([
  //     { offset: 0, transform: 'scale(1) rotate(0)' },
  //     { offset: 0.25, transform: 'scale(1) rotate(45deg)' },
  //     { offset: 0.75, transform: 'scale(1) rotate(-45deg)' },
  //     { offset: 1, transform: 'scale(1) rotate(0)' }
  //   ]);

  //   this.animation=this.animationCtrl
  //   .create()
  //   .duration(1500)
  //   .iterations(1)
  //   .addAnimation([logo]);

  //   this.animation.play();
  // }
}
