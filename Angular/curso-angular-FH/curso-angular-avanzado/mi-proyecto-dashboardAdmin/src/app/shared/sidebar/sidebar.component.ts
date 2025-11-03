import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems!: any[];
  //public imgURL:String =""
  public usuariotraeInfo!: Usuario;

  constructor(
    private SidebarService: SidebarService,
    private usuarioService: UsuarioService,
  ) {
   // this.imgURL = this.usuarioService.usuario.imagenUrl;
   this.usuariotraeInfo = this.usuarioService.usuario;
  }

  logout(){
    this.usuarioService.logout();
  }

  ngOnInit(): void {
    this.menuItems = this.SidebarService.menu as any[];
    //console.log(this.menuItems);
  }

}
