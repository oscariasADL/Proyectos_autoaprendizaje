import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  //public imgURL:String =""
  public usuariotraeInfo!: Usuario;

  constructor(
    private usuarioService: UsuarioService,
  ){
    //this.imgURL = this.usuarioService.usuario.imagenUrl;
    this.usuariotraeInfo = this.usuarioService.usuario;
  }

  logout(){
    this.usuarioService.logout();
  }

}
