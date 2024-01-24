import { Component, OnInit } from '@angular/core';
import { ServicerestService } from 'src/app/services/servicerest.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  filterTerm: String;
  registros: any;

  constructor(private serviceRest: ServicerestService, private router: Router) { }


  ngOnInit(): void {
    this.serviceRest.getRegistroList().subscribe((data) => {
      console.log(data);
      this.registros = data;
    });
  }

  filtrarAsignatura(registro:any){

  }

  irDetalleAsistencia(asistencia:String){
    this.router.navigate([`/asistencia/detalleAsistencia/`])
  }

}
