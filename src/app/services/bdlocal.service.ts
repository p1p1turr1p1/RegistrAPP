import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { User } from '../interface/user';
import { IonModal } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class BdlocalService {


  user: User[]=[];

  constructor(private storage: Storage,public toastController:ToastController, private router: Router) { 
    this.Init();
    this.cargarUser();
    this.cargarUserAutenticado();

  }

  async Init(){
    const storage=await this.storage.create();
    this.storage=storage;
    console.log('BD CARGADA/CREADA')
    this.getAuthUser('usuarioAutenticado');
  }

  async cargarUser() {
    const miUser=await this.storage.get('user');
    if (miUser) {
      this.user=miUser;
      console.log('works user')

    }
  }

  async cargarUserAutenticado() {
    const miUserA=await this.storage.get('usuarioAutenticado');
    if (miUserA) {
      this.user=miUserA;
      console.log('userA')
    }
  }


  async borrarBD(){
    await this.storage?.clear();
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

    registrarse(usuarioname:string,correo:string){
    const existe=this.user.find(m=>m.username===usuarioname);
      this.user.unshift({username:usuarioname, email: correo})//inserto en el top
      this.storage?.set('user',this.user);
      this.presentToast("Usuario registrado.");
      this.cargarUser();

  }

async getAuthUser(usuarioAutenticado: String){
  this.storage.get('usuarioAutenticado');

}

getUsername(): Promise<string | undefined> {
  return this.storage.get('usuarioAutenticado')
    .then((usuarioAutenticadoString) => {
      if (usuarioAutenticadoString) {
        return JSON.parse(usuarioAutenticadoString).username;
      } else {
        return undefined;
      }
    });

}

  async logeo(Usuarioname: string, Correo: string) {
    const usuarios: any[] = await this.storage.get('user');
    // encontrar usuario en la bd y la contraseña
    const usuarioEncontrado = usuarios.find(m =>m.email === Correo);
    if (usuarioEncontrado) {
      console.log('Usuario logueado:', usuarioEncontrado);
      await this.storage.set('usuarioAutenticado', usuarioEncontrado);  
      this.presentToast("Usuario logueado.");
      this.storage.get('username');
    } else {
      this.presentToast("Usuario o contraseña incorrectos.");
    }
  }

}