import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loggedUsuario: string = ''; //almacena usuario

  constructor(private router: Router, private dbservice: DbserviceService) {}

  ngOnInit() {
    this.loggedUsuario = localStorage.getItem('usuario') || '';
    this.dbservice.crearBD;
    this.dbservice.crearTablas;
    this.dbservice.cargarAsistencias;
    this.dbservice.dbState;
  }

  logOut() {
    this.router.navigate(['/login']);
    

} 




}
