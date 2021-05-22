import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {

    // href="./assets/css/colors/default-dark.css"
    const url = localStorage.getItem('theme') || './assets/css/colors/blue-dark.css';
    this.linkTheme.setAttribute('href',url);
    
    console.log('Settings Service');    
  }

  changeTheme(theme : string){

    const url = `./assets/css/colors/${ theme }.css`
    this.linkTheme.setAttribute('href',url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    // obtenemos todas las etiquetas que contienen la clases selector
    const links:NodeListOf<Element>= document.querySelectorAll('.selector');;
    // recorremos el ciclo que se genera
    links.forEach(element => {
      element.classList.remove('working');
      // asiganamos el valor que contiene la etiqueta data-theme
      const btnTheme = element.getAttribute('data-theme');
      // armamos la url del tema
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      // obtenemos la url actual
      const currentTheme = this.linkTheme.getAttribute('href');
      // se comparan las url
      if (btnThemeUrl === currentTheme) {
        // si es igual se agrega la clase working
        element.classList.add('working')
      }
    });
  }
}
