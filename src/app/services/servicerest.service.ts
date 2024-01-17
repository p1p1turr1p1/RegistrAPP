import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import { RegistroAsistencia } from '../clases/registro-asistencia';

@Injectable({
  providedIn: 'root'
})
export class ServicerestService {

  URL: string ='https://registrapp-923b2-default-rtdb.firebaseio.com';

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' :'*'
   }),
  };


  constructor(private http: HttpClient) { }

  getRegistro(id: any): Observable<RegistroAsistencia[]> {
    console.log('Entre aca '+`${this.URL}/Asistencia/` + id + '.json');
    return this.http.get<RegistroAsistencia[]>(`${this.URL}/Asistencia/` + id).pipe(
      tap((_) => console.log(`RegistroAsistencia fetched: ${id}`)),
      catchError(this.handleError<RegistroAsistencia[]>(`Get registro id=${id}`))
    );
  }
  getRegistroList(): Observable<RegistroAsistencia[]> {
    return this.http.get<RegistroAsistencia[]>(`${this.URL}/Asistencia/`).pipe(
      tap((RegistroAsistencia) => console.log('RegistroAsistencia fetched!')),  
      catchError(this.handleError<RegistroAsistencia[]>('Get registro', []))
    );
  }
  addRegistro(registro: RegistroAsistencia): Observable<any> {
    console.log(registro);
    return this.http
      .post<RegistroAsistencia>(`${URL}/Asistencia/`, registro, this.httpHeader)
      .pipe(catchError(this.handleError<RegistroAsistencia>('Add RegistroAsistencia')));
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



}
