import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable,of,retry } from 'rxjs';
import { RegistroAsistencia } from '../clases/registro-asistencia';

@Injectable({
  providedIn: 'root'
})
export class ServicerestService {

  URL: string ='http://localhost:3000';
  constructor(private http: HttpClient) { }

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
    return this.http.get<RegistroAsistencia[]>(`${this.URL}/asistencia/`).pipe(
      tap((RegistroAsistencia) => console.log('RegistroAsistencia fetched!')),  
      catchError(this.handleError<RegistroAsistencia[]>('Get registro', []))
    );
  }
  addRegistro(registro: RegistroAsistencia): Observable<RegistroAsistencia> {
    console.log(this.http
      .post<RegistroAsistencia>(
        this.URL + '/asistencia',
        JSON.stringify(registro),
        this.httpHeader));
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



}
