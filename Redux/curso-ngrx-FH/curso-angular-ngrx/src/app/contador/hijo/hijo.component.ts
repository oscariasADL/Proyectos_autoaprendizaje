import { Store } from '@ngrx/store';
// import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.reducers';
import { multiplicar, dividir } from "../../contador/contador.actions";


@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styles: [
  ]
})
export class HijoComponent implements OnInit {

  contador: number = 10;

  constructor( private Store: Store<AppState> ) {}

  ngOnInit(): void {
    this.Store.select('contador')
    .subscribe( contador => {
      this.contador = contador;
    });
  }

  // @Input() contador: number = 0;
  // @Output() cambioContador = new EventEmitter<number>();

  multiplicar(valor:number){
    // this.contador = this.contador * valor
    // this.cambioContador.emit( this.contador );
    this.Store.dispatch( multiplicar({ valor:2 }) );
  }

  dividir(valor:number){
    // this.contador = this.contador / valor
    // this.cambioContador.emit( this.contador );
    this.Store.dispatch( dividir({ valor:2 }) );
  }

  resetNieto( nuevoContador:number ) {
    // this.contador = nuevoContador
    // this.cambioContador.emit( this.contador );
  }

}
