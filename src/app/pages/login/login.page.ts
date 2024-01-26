import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, AnimationController, IonImg, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { BdlocalService } from 'src/app/services/bdlocal.service';
import { Animation } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;

  email: any;
  password: any;
  contact: any;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthServiceService,
    private router: Router,
    public formBuilder: FormBuilder,
    public bdlocalservice: BdlocalService,
    private animationCtrl: AnimationController,

  ) { }

  async ngOnInit() {

    this.ionicForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-zd$@$!%*?&].{8,}'
          ),
          Validators.required,
        ],
      ],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    console.log(this.email + this.password);
    if (this.ionicForm.valid) {
      await loading.dismiss();
      const user = await this.authService
        .loginUser(this.ionicForm.value.email, this.ionicForm.value.password)
        .catch((err) => {
          this.presentToast(err);
          console.log(err);
          loading.dismiss();
        });

      if (user) {
        loading.dismiss();
        this.logeo();
        this.router.navigate(['/home']);
      }
    } else {
      await loading.dismiss();
      loading.dismiss();
      this.presentToast('Datos incorrectos.');
    }
  }
  get errorControl() {
    return this.ionicForm.controls;
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      translucent: true,
      color: 'medium',
      position: 'top',
      duration: 2000,
    });
    toast.present();
  }


  usuarioname!: string;
  correo!: string;

  logeo() {
    this.bdlocalservice.logeo(this.usuarioname, this.correo);
  }

  @ViewChildren(IonImg, {read:ElementRef})
  iconElements!:QueryList<ElementRef<HTMLIonImgElement>>;

  private animation!:Animation; 

  animacion(){
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
    .duration(1500)
    .iterations(1)
    .addAnimation([logo]);

    this.animation.play();
  }

  ngAfterViewInit(){
    this.animacion();
  }
}
