import { Store } from '@ngrx/store';
// import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.reducers';
import { resetear } from "../../contador/contador.actions";


@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styles: [
  ]
})
export class NietoComponent  implements OnInit  {

   contador: number | undefined;

  constructor( private Store: Store<AppState> ) {}

  ngOnInit(): void {
     this.Store.select('contador')
    .subscribe( contador => {
      this.contador = contador;
    });
  }

  reset(){
    // this.contador = 0;
    // this.contadorCambio.emit( this.contador );
    this.Store.dispatch( resetear() );
  }

}
