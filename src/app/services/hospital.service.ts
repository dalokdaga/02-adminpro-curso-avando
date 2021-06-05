import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseHospitales,Hospital, ResponseDelete } from '../models/responseHospitales.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { 
      headers: 
      {
        'x-token': this.token
      }
    }
  }

  cargarHospitales():Observable<Hospital[]>{
    const url = `${base_url}/hospitales`;
    return this.http.get<ResponseHospitales>(url, this.headers)
            .pipe(
              map(resp => resp.hospitales,(error)=>[])
            );
  }

  crearHospital( nombre: string):Observable<Hospital>{
    const url = `${base_url}/hospitales`;
    return this.http.post<ResponseHospitales>(url,{nombre},this.headers)
            .pipe(
              map(resp => resp.hospital)
            );
  }

  actualizarHospital( _id:string, nombre: string):Observable<Hospital>{
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put<ResponseHospitales>(url,{nombre},this.headers)
            .pipe(
              map(resp => resp.hospital)
            );
  }

  eliminarHospital( _id:string):Observable<ResponseDelete>{
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete<ResponseDelete>(url,this.headers);

  }
}
