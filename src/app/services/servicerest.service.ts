import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable,of,retry } from 'rxjs';
import { RegistroAsistencia } from '../clases/registro-asistencia';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ServicerestService {
  registroListRef: AngularFireList<any>;
  registroRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}
  // Create
  addRegistro(registro: RegistroAsistencia) {
    return this.registroListRef.push({
      email_usuario: registro.email_usuario,
      asignatura:registro.asignatura,
      profesor:registro.profesor,
      fecha:registro.fecha,
      estado:registro.estado,
    });
  }
  // Get Single
  getBooking(id: string) {
    this.registroRef = this.db.object('/asistencia/' + id);
    return this.registroRef;
  }
  // Get List
  getRegistroList() {
    this.registroListRef = this.db.list('/asistencia');
    return this.registroListRef;
  }
  // Update
  updateRegistro(id: any, registro: RegistroAsistencia) {
    return this.registroRef.update({
      email_usuario: registro.email_usuario,
      asignatura:registro.asignatura,
      profesor:registro.profesor,
      fecha:registro.fecha,
      estado:registro.estado
    });
  }
  // Delete
  deleteRegistro(id: string) {
    this.registroRef = this.db.object('/asistencia/' + id);
    this.registroRef.remove();
  }

  fetchRegistros() {
    this
      .getRegistroList()
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
      });
  }

  /*

  
  constructor(private http: HttpClient) { }
  
  URL: string ='https://registrapp-923b2-default-rtdb.firebaseio.com';
  


  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' :'*'
   }),
  };



  getRegistro(id: any): Observable<RegistroAsistencia[]> {
    console.log(this.URL + '/asistencia/' + id);
    return this.http
      .get<RegistroAsistencia[]>(this.URL + '/asistencia/' + id)
      .pipe(retry(1), catchError(this.handleError<RegistroAsistencia[]>(`Get registro id=${id}`)));
  }
  getRegistroList(): Observable<RegistroAsistencia[]> {
    return this.http.get<RegistroAsistencia[]>(`${this.URL}/asistencia.json`).pipe(
      tap((RegistroAsistencia) => console.log('RegistroAsistencia fetched!')),  
      catchError(this.handleError<RegistroAsistencia[]>('Get registro', []))
    );
  }
  addRegistro(registro: RegistroAsistencia): Observable<RegistroAsistencia> {
    console.log(JSON.stringify(registro));
    return this.http
      .post<RegistroAsistencia>(
        this.URL + '/asistencia',
        JSON.stringify(registro),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.handleError<RegistroAsistencia>('Add RegistroAsistencia')));
  }
  updateRegistro(id: any, registro: RegistroAsistencia): Observable<any> {
    return this.http.put(`${URL}/Asistencia/` + id, registro, this.httpHeader).pipe(
      tap((_) => console.log(`RegistroAsistencia updated: ${id}`)),
      catchError(this.handleError<RegistroAsistencia[]>('Update registro'))
    );
  }
  deleteregistro(id: any): Observable<RegistroAsistencia[]> {
    return this.http.delete<RegistroAsistencia[]>(`${URL}/Asistencia/` + id, this.httpHeader).pipe(
      tap((_) => console.log(`RegistroAsistencia deleted: ${id}`)),
      catchError(this.handleError<RegistroAsistencia[]>('Delete registro'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  **/
  



}
