import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  ngOnInit() {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  //@Input('valor') progress: number = 50; Renombrar el Input por 'valor'
  @Input() progress: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();
  
  get getPorcentaje() {
    return `${ this.progress }%`;
  }

  cambiarValor( valor: number ) {

    if ( this.progress >= 100 && valor >= 0 ) {
      this.valorSalida.emit(100);
      this.progress = 100;
      return;
    }

    if ( this.progress <= 0 && valor < 0 ) {
      this.valorSalida.emit(0);
      this.progress = 0;
      return;
    }
    
    this.progress += valor;
    this.valorSalida.emit( this.progress );
  }

  onChange( valorCaja: number ){
    
    if ( valorCaja >= 100 ) {
      this.progress = 100;
    } else if ( valorCaja <= 0 ) {
      this.progress = 0;
    } else {
      this.progress = valorCaja;
    }

    this.valorSalida.emit( this.progress );

  }

}
