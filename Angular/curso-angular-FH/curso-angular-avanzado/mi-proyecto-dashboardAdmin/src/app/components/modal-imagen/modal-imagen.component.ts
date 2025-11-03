import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Usuario } from '../../models/usuario.models';
import { FormGroup } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null;


  constructor(
    public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService  
  ) { }

  ngOnInit(): void {
  }

  abrirModal() {
    this.modalImagenService.abrirModal();
  }

  cerrarModal() {
    this.imgTemp = null;
    this.imagenSubir = undefined!;
    this.modalImagenService.cerrarModal();
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

    const id = this.modalImagenService.id!;
    const tipo = this.modalImagenService.tipo!;

    this.fileUploadService
      .actualizarFoto( this.imagenSubir, tipo, id )
      .then( img => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
        this.modalImagenService.nuevaImagen.emit( img );
        this.cerrarModal();
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

  }

}
