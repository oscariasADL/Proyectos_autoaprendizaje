import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() { 
    //console.log("Servicio de settings listo");

    const url = localStorage.getItem('theme') || './assets/css/colors/default.css';
    this.linkTheme?.setAttribute('href', url);

  }

  changeTheme( theme: string ) {
    //console.log(theme);
    const url = `./assets/css/colors/${ theme }.css`;
    this.linkTheme?.setAttribute('href', url);
    //document.getElementById('theme')?.setAttribute('href', url); Es lo mismo que lo de arriba pero con otra sintaxis
    localStorage.setItem('theme', url);
  }

}
