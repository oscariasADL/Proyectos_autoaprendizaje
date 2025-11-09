import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { LoginFormInterface } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.models';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,

  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role || 'USER_ROLE';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`http://localhost:3000/api/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map( (resp: any) => {
        const{ email, nombre , role, img ,uid } = resp.usuario;
        this.usuario = new Usuario(nombre,email,'',img,role,uid);

        console.log('🚀 Token actualizado en local storage');
        localStorage.setItem('token', resp.token );
        return true;
      }),
      catchError( error => of(false) )
    )

  }

  crearUsuario( formData: RegisterForm ) {
    //console.log('⬆️Usuario creado');
    //console.log( '📝 PAYLOAD:', formData );

    return this.http.post('http://localhost:3000/api/usuarios', formData)

  }

  loginUsuario( formData: LoginFormInterface ) {

    return this.http.post('http://localhost:3000/api/login', formData)
    .pipe(
      tap( (resp: any) => {
        //console.log('🚀 ~ file: login.service.ts:12 ~ UsuarioService ~ loginUsuario ~ resp:', resp);
        localStorage.setItem('token', resp.token );
        console.log('🚀 Enviado al local storage');
      })
    );

  }

  actualizarPerfil( data: { email: string, nombre: string, role: string } ) {

    data = {
      ...data,
      role: this.usuario.role || 'USER_ROLE'
    };

    return this.http.put(`http://localhost:3000/api/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });

  }

  cargarUsuarios( desde: number = 0 ) {

    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuario>( url, this.headers )
            .pipe(
              delay(500),
              map( resp => {
                const usuarios = resp.usuarios.map(
                  user => new Usuario(user.nombre, user.email, '', user.img, user.role, user.uid )
                );
                return {
                  total: resp.total,
                  usuarios
                };
              })
            )
  }

  eliminarUsuario( uid: string ){

    const url = `${ base_url }/usuarios/${ uid }`;
    return this.http.delete( url, this.headers )
    .pipe(
      tap(() => console.log('🚀 Eliminando usuario'))
    );

  }

  guardarUsuario( usuario: Usuario ){ 

    return this.http.put(`http://localhost:3000/api/usuarios/${ usuario.uid }`, usuario, {
      headers: {
        'x-token': this.token
      }
    });

  }

}
