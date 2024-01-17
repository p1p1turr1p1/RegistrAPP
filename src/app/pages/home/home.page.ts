import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdlocalService } from 'src/app/service/bdlocal.service';
@Component({

  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loggedUsuario: string = ''; //almacena usuario


  constructor(private router: Router) { }

  ngOnInit() {
    this.loggedUsuario = localStorage.getItem('username') || '';
  }

  logOut() {
    this.router.navigate(['/login']);


  }


}