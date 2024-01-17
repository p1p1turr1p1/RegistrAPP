import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { Asistencia } from 'src/app/clases/asistencia';
import { SQLiteObject } from "@awesome-cordova-plugins/sqlite";
import { Alumno } from 'src/app/clases/alumno';

@Component({

  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loggedUsuario: string = ''; //almacena usuario

  id_alumno: Number;
  fecha: Date;
  tipo: string;

  constructor(private router: Router, private dbservice: DbserviceService,) { }

  ngOnInit() {
    this.loggedUsuario = localStorage.getItem('usuario') || '';
  }

  logOut() {
    this.router.navigate(['/login']);


  }

  cargar() {
    this.dbservice.cargarAsistencias;

  }

  addAsistencia() {
    this.dbservice.addAsistencia(this.id_alumno, this.fecha, this.tipo);

  }

}
