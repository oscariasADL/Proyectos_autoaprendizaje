import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styles: [
  ]
})
export class HijoComponent {

  @Input() contador: number = 0;
  @Output() cambioContador = new EventEmitter<number>();

  multiplicar(valor:number){
    this.contador = this.contador * valor
    this.cambioContador.emit( this.contador );
  }

  dividir(valor:number){
    this.contador = this.contador / valor
    this.cambioContador.emit( this.contador );
  }

  resetNieto( nuevoContador:number ) {
    this.contador = nuevoContador
    this.cambioContador.emit( this.contador );
  }

}
