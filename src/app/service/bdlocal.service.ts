import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { User } from '../interface/user';
import { IonModal } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class BdlocalService {


  user: User[]=[];
  private _storage: Storage | null=null;

  constructor(private storage: Storage,public toastController:ToastController, private router: Router) { 
    this.Init();
    this.cargarUser();
  }

  async Init(){
    const storage=await this.storage.create();
    this._storage=storage;
  }
  async cargarUser() {
    const miUser=await this.storage.get('user');
    if (miUser) {
      this.user=miUser;
    }
  }


  async borrarBD(){
    await this._storage?.clear();
    this.user=[];
    console.log(this.user.length);
    this.presentToast("Se ha eliminado la BD");
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      translucent:true,
      color:'medium',
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

    registrarse(Username:string, Password:string,Email:string){
    const existe=this.user.find(m=>m.username===Username);
    if (!existe) {
      this.user.unshift({username:Username, password:Password, email: Email})//inserto en el top
      this._storage?.set('user',this.user);
      this.presentToast("Usuario registrado.");

    }else{
      this.presentToast("Usuario ya existe.");
    }
  }

getAuthUser(usuarioAutenticado: String){
  this._storage?.get('usuarioAutenticado');
}


  async login(Username: string, Password: string) {
    const usuarios: any[] = await this.storage.get('user');
    // encontrar usuario en la bd y la contraseña
    const usuarioEncontrado = usuarios.find(m => m.username === Username && m.password === Password);
    if (usuarioEncontrado) {
      console.log('Usuario logueado:', usuarioEncontrado);
      await this.storage.set('usuarioAutenticado', usuarioEncontrado);  
      this.presentToast("Usuario logueado.");
      this.router.navigate(['/home']);
      this._storage?.get('username');
    } else {
      this.presentToast("Usuario o contraseña incorrectos.");
    }
  }

}