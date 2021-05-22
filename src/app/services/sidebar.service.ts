import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo:'Dashboard',
      icono:'mdi mdi-gauge',
      submenu:[
        {titulo:'Main', url:'/'},
        {titulo:'PogresBar', url:'progress'},
        {titulo:'Gráficas', url:'grafica1'},
        {titulo:'Promesas', url:'promesas'},
        {titulo:'XRJS', url:'xrjs'},
      ]
    }
  ];

  constructor() { }
}
