
import { ModalImagenComponent } from './../../../components/modal-imagen/modal-imagen.component';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { CargarUsuario } from '../../../interfaces/cargar-usuarios.interface';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
[x: string]: any;

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(
    private UsuariosService: UsuarioService,
    private busquedaService: BusquedasService,
    private ModalImagenService: ModalImagenService
  ) { }

  ngOnInit(): void {
    this.CargarUsuarios();
    this.ModalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe( img => this.CargarUsuarios() );
  }

  CargarUsuarios(){
    this.cargando = true;
    this.UsuariosService.cargarUsuarios(this.desde)
    .subscribe( ({ total, usuarios }) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  cambiarPagina( valor: number){
    this.desde += valor;

    if( this.desde < 0 ){
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ){
      this.desde -= valor;
    }

    this.CargarUsuarios();
  }

  buscar( termino: string ){
    console.log( termino );
    if ( termino.length === 0 ) {
      return this.CargarUsuarios();
    }
    this.busquedaService.buscar( 'usuarios', termino )
      .subscribe( resp => {
        this.usuarios = resp as Usuario[];
      });
    /*


    this.busquedaService.buscar( 'usuarios', termino )
      .subscribe( ( resultados: Usuario[] ) => {
        this.usuarios = resultados;
      });
      */
  }

  eliminarUsuario( usuario: Usuario ): void {

    if ( usuario.uid === this.UsuariosService.uid ) {
      Swal.fire('Error', 'No puede eliminarse a si mismo', 'error');
      return;
    }

    Swal.fire({
      title: "Remover Usuario",
      text: `¿Desea eliminar el usuario ${usuario.nombre} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.UsuariosService.eliminarUsuario( usuario.uid! )
        .subscribe( resp => {
          Swal.fire(
            'Eliminado!',
            `El usuario ${ usuario.nombre } fue eliminado correctamente.`,
            'success'
          );
          this.CargarUsuarios();
        });
      }
    });

  }

  cambiarRole( usuario: Usuario ){
    this.UsuariosService.guardarUsuario( usuario )
      .subscribe(
        resp => {
          Swal.fire({
            //position: "top-end",
            icon: "success",
            title: "Rol de usuario actualizado",
            showConfirmButton: false,
            timer: 1500
          });
        }
      )
  }

  abrirModal( usuario: Usuario ){
    console.log( usuario.uid );
    this.ModalImagenService.abrirModal( 'usuarios', usuario.uid!, usuario.img! );
  }

}
