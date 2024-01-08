
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AnimationController, IonImg, IonTitle } from '@ionic/angular';
import { Animation } from '@ionic/angular';
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

user={
  usuario:"",
  clave:""
}


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
  @ViewChildren(IonTitle, {read: ElementRef})
  titleElements!:QueryList<ElementRef<HTMLIonTitleElement>>;
  @ViewChildren(IonImg, {read:ElementRef})
  iconElements!:QueryList<ElementRef<HTMLIonImgElement>>;

  private animation!:Animation; 
  constructor(private animationCtrl: AnimationController) { }

  ngAfterViewInit(){
    console.log(this.titleElements);
    const testUser = this.animationCtrl
    .create()
    .addElement(this.titleElements.get(0)!.nativeElement)
    .fromTo('opacity', '0', '1');

    const logo = this.animationCtrl
    .create()
    .addElement(this.iconElements.get(0)!.nativeElement)

    .keyframes([
      { offset: 0, transform: 'scale(1) rotate(0)' },
      { offset: 0.25, transform: 'scale(1) rotate(45deg)' },
      { offset: 0.75, transform: 'scale(1) rotate(-45deg)' },
      { offset: 1, transform: 'scale(1) rotate(0)' }
    ]);

    this.animation=this.animationCtrl
    .create()
    .duration(1000)
    .iterations(1)
    .addAnimation([testUser,logo]);

    this.animation.play();
  }
}
