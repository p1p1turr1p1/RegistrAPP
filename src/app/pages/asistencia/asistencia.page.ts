import { Component, OnInit } from '@angular/core';
import { ServicerestService } from 'src/app/services/servicerest.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  registros: any;

  constructor(private serviceRest: ServicerestService) { }

  ngOnInit() {
    this.getRegistroList();
  }

  getRegistroList(){
    this.serviceRest.getRegistroList().subscribe((data)=>{
      console.log(data);
      this.registros=data;
    });
    console.log(this.registros);
  }

}
