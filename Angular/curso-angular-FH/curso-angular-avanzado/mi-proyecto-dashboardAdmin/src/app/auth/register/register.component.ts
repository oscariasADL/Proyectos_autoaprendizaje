import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/create.service';
import { Observable, Observer } from 'rxjs';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public reigsterForm = this.fb.group({
    nombre: [ 'Oscar Arias', Validators.required ],
    email: ['eduardo93-12@hotmail.com', [ Validators.required, Validators.email ] ],
    password: [ '123', Validators.required ],
    password2: [ '123', Validators.required ],
    terminos: [ true, Validators.requiredTrue ]
  },{
    validator: this.passwordsIguales('password', 'password2')
  });

  constructor (
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {

  }

  crearUsuario() {
    this.formSubmitted = true;
    //console.log( this.reigsterForm.value );

    if( this.reigsterForm.invalid ){
      console.log('💩Formulario incorrecto');
      return
    }else{
      console.log('🚩Enviando formulario...');
    }

    const observer: Observer<any> = {
      next: (value: string) => console.log('next:', value),
      error: (error: any) => console.warn('error:', error),
      complete: () => console.info('Completado:'),
    };


    /*this.usuarioService.crearUsuario( this.reigsterForm.value )
      .subscribe( (resp: Object) => {
        console.log('✅Usuario creado');
        console.log('📝 PAYLOAD:',  resp );
      }, (err:any) => {
        Swal.fire('Error!!!', err.error.msg, 'error');
        console.warn('❌Error al crear usuario');
        console.warn('📝 PAYLOAD:', err.error.msg );
      } );;*/

    this.usuarioService.crearUsuario(this.reigsterForm.value)
    .subscribe({
      next: (resp: Object) => {
        console.log('✅ Usuario creado');
        console.log('📝 PAYLOAD:', resp);
      },
      error: (err: any) => {
        Swal.fire('Error!!!', err.error.msg, 'error');
        console.warn('❌ Error al crear usuario');
        console.warn('📝 PAYLOAD:', err.error.msg);
      },
      complete: () => {
        console.log('✔️ Petición completada');
      }
    });

  }

  campoNovalido( campo: string ): boolean {
    if ( this.reigsterForm.get( campo )!.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValida() {
    const pass1 = this.reigsterForm.get('password')!.value;
    const pass2 = this.reigsterForm.get('password2')!.value;

    if (  (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos(){
    return !this.reigsterForm.get('terminos')!.value && this.formSubmitted;
  }

  passwordsIguales( pass1Name: string, pass2Name: string ) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get( pass1Name );
      const pass2Control = formGroup.get( pass2Name );

      if ( pass1Control!.value === pass2Control!.value ) {
        pass2Control!.setErrors( null );
      } else {
        pass2Control!.setErrors( { noEsIgual: true } );
      }
    }
  }

};
