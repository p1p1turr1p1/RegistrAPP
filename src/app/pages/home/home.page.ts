import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AnimationController, IonCard, IonTitle } from '@ionic/angular';
import { Animation } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loggedUsuario: string = ''; //almacena usuario


  private animation!:Animation; 
  constructor(private animationCtrl: AnimationController) { }

  constructor(private router: Router) {}

  ngOnInit() {
    this.loggedUsuario = localStorage.getItem('usuario') || '';
  }

  logOut() {
    this.router.navigate(['/login']);
} 

}
