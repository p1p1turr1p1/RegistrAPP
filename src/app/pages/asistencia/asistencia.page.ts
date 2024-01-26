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

  listaAsignaturas: any;
  registros: any;

  correoActivo = 'valenzuela.alou01@gmail.com'; //CAMBIAR POR USER ACTIVO LOCAL STORAGE!!!
  constructor(private serviceRest: ServicerestService, private router: Router) { }


  ngOnInit(): void {
    this.serviceRest.fetchRegistros();
     
    let registroRes = this.serviceRest.getRegistroList();
    registroRes.snapshotChanges().subscribe((res) => {
      this.registros = [];
      res.forEach((item) => {
        let a: any = item.payload.toJSON();
        a['$key'] = item.key;
        if (a['email_usuario'] == this.correoActivo){
          this.registros.push(a as RegistroAsistencia);
        }
      })
      console.log(this.registros);
      this.filtrarAsignatura();
      console.log(this.listaAsignaturas);
    });
  }

  
  filtrarAsignatura(){
    let copia = this.registros;
    this.listaAsignaturas = [];
    copia.forEach((reg : any)=> {
        this.listaAsignaturas.push(reg.asignatura);
    });
    this.listaAsignaturas = this.eliminarDuplicados(this.listaAsignaturas);
  }

  eliminarDuplicados<T>(lista: T[]): T[] {
    const listaUnica: T[] = [];
    for (const elemento of lista) {
        if (listaUnica.indexOf(elemento) === -1) {
            listaUnica.push(elemento);
        }
    }
    return listaUnica;
}


}