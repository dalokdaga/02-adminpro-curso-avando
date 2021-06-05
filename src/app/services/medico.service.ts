import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico, ResponseActMedico, ResponseMedico, ResponseMedicos } from '../models/responseMedicos.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
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
  constructor(private http: HttpClient) { }

  cargarMedicos():Observable<Medico[]>{
    const url = `${base_url}/medicos`
    return this.http.get<ResponseMedicos>(url,this.headers)
          .pipe(
            map(resp => resp.medicos)
          );
  }

  crearMedico( medico: Medico):Observable<any>{
    const url = `${base_url}/medicos`;
    return this.http.post<any>(url,medico,this.headers);
  }

  actualizarMedico(medico: Medico):Observable<Medico>{
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put<ResponseActMedico>(url,medico,this.headers)
              .pipe(
                map(resp=>resp.medicoActualizado)
              );
  }

  eliminarMedico( _id:string):Observable<any>{
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete<any>(url,this.headers);
  }

  buscarMedico(_id:string):Observable<Medico>{
    const url = `${base_url}/medicos/${_id}`;
    return this.http.get<ResponseMedico>(url,this.headers)
                .pipe(
                  map(resp => resp.medico)
                );
  }
}
