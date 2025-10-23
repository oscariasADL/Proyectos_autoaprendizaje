import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');
  public links!: NodeListOf<Element>;

  constructor( private SettingsService: SettingsService ) { }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector'); 
    this.checkCurrentTheme();
  }

  changeTheme( theme: string ) {
    //console.log(theme);
    /*
    TODO ESTO ME LO LLEVE AL SERVICIO PARA TENERLO CENTRALIZADO
    const url = `./assets/css/colors/${ theme }.css`;
    this.linkTheme?.setAttribute('href', url);
    //document.getElementById('theme')?.setAttribute('href', url); Es lo mismo que lo de arriba pero con otra sintaxis
    localStorage.setItem('theme', url);
    */

    this.SettingsService.changeTheme( theme );
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {

    //const links = document.querySelectorAll('.selector'); 
    // Es mas recomendable hacerlo como clase publica y no hacer querySelectorAll cada vez que se llame a la funcion
    
    this.links.forEach( elem => {

      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        //console.log("ES IGUALLLLL")
        elem.classList.add('working');
      }

      
    });
  }
}
