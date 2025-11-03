import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RegisterForm } from '../interfaces/register-form.interface';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }



  crearUsuario( formData: RegisterForm ) {
    //console.log('⬆️Usuario creado');
    //console.log( '📝 PAYLOAD:', formData );

    return this.http.post('http://localhost:3000/api/usuarios', formData)

  }

}
