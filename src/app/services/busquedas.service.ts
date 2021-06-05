import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Busqueda } from '../models/busqueda.models';
import { Getusuarios } from '../models/get-usuarios.models';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  busquedas(tipo: 'usuarios'|'medicos'|'hospitales',
                 termino: string ):Observable<any[]>{
    // http://localhost:3000/api/usuarios?desde=5

    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<Busqueda>(url, this.headers)
                  .pipe(
                    map(resp => resp.resultados)
                  );


  }
}
