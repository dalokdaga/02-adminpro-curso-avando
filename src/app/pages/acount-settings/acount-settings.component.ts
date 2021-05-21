import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acount-settings',
  templateUrl: './acount-settings.component.html',
  styles: [
  ]
})
export class AcountSettingsComponent implements OnInit {
  public linkTheme = document.querySelector('#theme');
  // obtenemos todas las etiquetas que contienen la clases selector
  public links:NodeListOf<Element>;
  constructor() { }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }
  changeTheme(theme : string){

    const url = `./assets/css/colors/${ theme }.css`
    this.linkTheme.setAttribute('href',url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){

    // recorremos el ciclo que se genera
    this.links.forEach(element => {
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
