import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.models';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService) {

    this.usuario = this.usuarioService.usuario;

    // Inicializa el form aquí para evitar issues de timing
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario?.nombre || '', Validators.required ],
      email: [ this.usuario?.email || '', [ Validators.required, Validators.email ] ],
    });

    // Opcional: Si usuario es undefined, podrías redirigir o mostrar error
    if (!this.usuario) {
      console.warn('Usuario no inicializado en el servicio. Redirigiendo...');
      // this.router.navigate(['/login']); // Asumiendo Router inyectado si necesitas
    }
  }

  ngOnInit(): void {
    // Ahora vacío; usa para otras init si necesitas (e.g., subscriptions)
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil( this.perfilForm.value )
        .subscribe( () => {
          const { nombre, email } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  cambiarImagen(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      this.imagenSubir = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imgTemp = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  subirImagen() {

    this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid! )
      .then( img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }

}
