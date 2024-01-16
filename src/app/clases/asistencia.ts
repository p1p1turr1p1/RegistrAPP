export class Asistencia {
    id_asistencia: number | undefined;
    id_alumno: number | undefined;
    fecha: Date | undefined;
    tipo : string | undefined;
}




// import { Injectable } from '@angular/core';
// import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
// import { Platform, ToastController } from '@ionic/angular'; 
// import { BehaviorSubject, Observable } from 'rxjs'; 
// import { Noticia } from '../clases/noticia';

// @Injectable({
//   providedIn: 'root'
// })
// export class DbserviceService {

//   public database!: SQLiteObject;
//   tblAsistencias: string = "CREATE TABLE IF NOT EXISTS asistencia(id_asistencia INTEGER PRIMARY KEY autoincrement,id_alumno INTERGER NOT NULL, fecha DATE NOT NULL, tipo VARCHAR(10));";
//   listaAsistencias = new BehaviorSubject<Noticia[]>([]);
//   private isDbReady:
//     BehaviorSubject<boolean> = new BehaviorSubject(false);


//   constructor(private sqlite: SQLite,
//     private platform: Platform,
//     public toastController: ToastController) {
//     this.crearBD();
//   }

//   /**
//    * Método que crea la BD si no Existe o carga la existente
//    */
//   crearBD() {
//     this.platform.ready().then(() => {
//       this.sqlite.create({
//         name: 'registrapp.db',
//         location: 'default'
//       }).then((db: SQLiteObject) => {
//         this.database = db;
//         this.presentToast("BD creada");
//         //llamo a crear la(s) tabla(s)
//         this.crearTablas();
//       }).catch(e => this.presentToast(e));
//     })
//   }

//   /**
//      * Método que crea la tabla de la BD si no Existe o carga la existente
//      */
//   async crearTablas() {
//     try {
//       await this.database.executeSql(this.tblAsistencias, []);
//       this.presentToast("Tabla creada");
//       this.cargarAsistencias();
//       this.isDbReady.next(true);
//     } catch (error) {
//       this.presentToast("Error en Crear Tabla: " + error);
//     }
//   }


//   /**
//      * Método que carga en la listaNoticias TODO el contenido de la tabla noticia
//      */
//   cargarAsistencias() {
//     let items: Asistencia[] = [];
//     this.database.executeSql('SELECT * FROM asistencia', [])
//       .then(res => {
//         if (res.rows.length > 0) {
//           for (let i = 0; i < res.rows.length; i++) {
//             items.push({
//               id_asistencia: res.rows.item(i).id_asistencia,
// 			  id_alumno: res.rows.item(i).id_alumno,
//               fecha: res.rows.item(i).fecha,
//               tipo: res.rows.item(i).tipo
//             });
//           }
//         }
//       });
//     this.listaAsistencias.next(items);
//   }

//   /**
//      * Método que inserta un registro en la tabla noticia
//      */
//   async addAsistencia(titulo: any, texto: any) {
//     let data = [titulo, texto];
//     await this.database.executeSql('INSERT INTO noticia(titulo,texto) VALUES(?,?)', data);
//     this.cargarNoticias();
//   }

//   /**
//      * Método que actualiza el título y/o el texto filtrando por el id
//      */
//   async updateNoticia(id: any, titulo: any, texto: any) {
//     let data = [titulo, texto, id];
//     await this.database.executeSql('UPDATE noticia SET titulo=?, texto=? WHERE id=?', data);
//     this.cargarNoticias();
//   }

//   /**
//      * Método que elimina un registro por id de la tabla noticia
//      */
//   async deleteNoticia(id: any) {
//     await this.database.executeSql('DELETE FROM noticia WHERE id=?', [id]);
//     this.cargarNoticias();
//   }

//   /**
//      * Método que verifica la suscripción del Observable
//      */
//   dbState() {
//     return this.isDbReady.asObservable();
//   }

//   /**
//      * Método que se ejecuta cada vez que se hace un cambio en la tabla de la BD
//      */
//   fetchNoticias(): Observable<Noticia[]> {
//     return this.listaNoticias.asObservable();
//   }

//   async presentToast(mensaje: string) {
//     const toast = await this.toastController.create({
//       message: mensaje,
//       duration: 3000
//     });
//     toast.present();
//   }
// }
