import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy  {

  ingresoForm: FormGroup;
  tipo: string =  'ingreso';
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>,
  ) { 
    
  }

  ngOnInit() {

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required,/*Validators.pattern(/^[0-9]+$/)*/]
    })

    this.uiSubscription = this.store.select('ui')
                              .subscribe(ui => {
                                this.cargando = ui.isLoading;
                                console.log("Cargando subs ", this.cargando);
                              });

  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  guardar(){

    if (this.ingresoForm.invalid) { return; }

    this.store.dispatch( ui.isLoading() );
    
    console.log('🔥 Formulario enviado');
    console.log(this.ingresoForm.value);
    console.log(this.tipo);

    const { descripcion, monto } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
      .then( () => { 
        this.ingresoForm.reset();
        this.store.dispatch( ui.stopLoading() );
        Swal.fire('Registro creado', descripcion , 'success');
      })
      .catch( err => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire('Error', err.message , 'error');
      });
  }

}
