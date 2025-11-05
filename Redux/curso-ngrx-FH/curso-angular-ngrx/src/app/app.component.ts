import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrementar, incrementar } from "./contador/contador.actions";

interface AppState {
  contador: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'curso-angular-ngrx';

  public contador: number = 10;

  constructor( private store: Store<AppState> ) {
    //this.contador = 10;

    this.store.select('contador').subscribe( contador => {
      console.log('Estado actual: ', contador );
      this.contador = contador;

      if ( this.contador < 0 ) {
        this.contador = 0;
      }
      
    })
  }

  incrementar() {
    this.store.dispatch( incrementar() );
  }

  decrementar() {
    this.store.dispatch( decrementar() );
  }

  /*
  incrementar( valor:number ) {
    this.contador = this.contador + valor;
  }

  decrementar( valor:number ) {
    this.contador = this.contador - valor;

    if ( this.contador < 0 ) {
      this.contador = 0;
    }

  }
  */

}
