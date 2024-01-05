import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AnimationController, IonCard, IonTitle } from '@ionic/angular';
import { Animation } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChildren(IonTitle, {read: ElementRef})
  titleElements!:QueryList<ElementRef<HTMLIonTitleElement>>;

  private animation!:Animation; 
  constructor(private animationCtrl: AnimationController) { }
  ngOnInit(){

  }

  ngAfterViewInit(){
    const testUser = this.animationCtrl
    .create()
    .addElement(this.titleElements.get(0)!.nativeElement)
    .fromTo('opacity', '0', '1');

    

    this.animation=this.animationCtrl
    .create()
    .duration(2000)
    .iterations(1)
    .addAnimation([testUser]);

    this.animation.play();
  }
}
