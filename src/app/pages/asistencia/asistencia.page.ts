import { Component, OnInit } from '@angular/core';
import { ServicerestService } from 'src/app/services/servicerest.service';
import { Router } from '@angular/router';
import { RegistroAsistencia } from 'src/app/clases/registro-asistencia';
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
    this.serviceRest.fetchRegistros();
    let registroRes = this.serviceRest.getRegistroList();
    registroRes.snapshotChanges().subscribe((res) => {
      this.registros = [];
      res.forEach((item) => {
        let a: any = item.payload.toJSON();
        a['$key'] = item.key;
        this.registros.push(a as RegistroAsistencia);
      });
    });
  }

  
  filtrarAsignatura(registro:any){

  }

  irDetalleAsistencia(asistencia:String){
    this.router.navigate([`/asistencia/detalleAsistencia/`])
  }

}
