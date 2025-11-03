import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: ['eduardo93-12@hotmail.com', [ Validators.required, Validators.email ] ],
    password: [ '', Validators.required ]
  });


  constructor (
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}



  login(){
    //console.log('Login correcto');
    //this.router.navigate(['/dashboard']);

    this.usuarioService.loginUsuario( this.loginForm.value as any )
    .subscribe({
      next: (resp: Object) => {
        console.log('✅ Login succes');
        console.log('📝 PAYLOAD:', resp);
        this.router.navigate(['/dashboard'])
      },
      error: (err: any) => {
        Swal.fire('Error!!!', err.error.msg, 'error');
        console.warn('❌ Error al acceder');
        console.warn('📝 PAYLOAD:', err.error.msg);
      },
      complete: () => {
        console.log('✔️ Petición completada');
      }

    });
  }

}
