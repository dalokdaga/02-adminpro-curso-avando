import { Injectable } from '@angular/core';
import { Menu } from '../models/ResponseToken.models';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: Menu[] = [];

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
    // if (this.menu.length === 0) {
      
    // }
  }
  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', url: '/' },
  //       { titulo: 'Gráficas', url: 'grafica1' },
  //       { titulo: 'rxjs', url: 'rxjs' },
  //       { titulo: 'Promesas', url: 'promesas' },
  //       { titulo: 'ProgressBar', url: 'progress' },
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimineto',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Hopsitales', url: 'hospitales' },
  //       { titulo: 'Medicos', url: 'medicos' },        
  //     ]
  //   },    
  // ];

  constructor() { }
}
