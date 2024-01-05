import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})




export class LoginPage implements OnInit {
  usuario: string = '';
  password: string = '';

  constructor(private router: Router) { }


  
  irHome() {
    localStorage.setItem('usuario', this.usuario);
    this.router.navigate(['/home']);
} 
  ngOnInit() {
  }

}
