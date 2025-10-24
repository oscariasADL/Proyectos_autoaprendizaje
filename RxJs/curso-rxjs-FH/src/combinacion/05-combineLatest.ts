import { fromEvent, combineLatest, from } from 'rxjs';
import { pluck, map } from 'rxjs/operators';

/**
 * COMBINE LATEST
 * 
 * Es un operador que nos permite combinar múltiples observables en uno solo.
 * 
 * - Espera a que todos los observables hayan emitido al menos un valor.
 * - Emite un arreglo con los últimos valores emitidos por cada observable.
 */

// const keyup$ = fromEvent( document, 'keyup');
// const click$ = fromEvent( document, 'click');

// combineLatest( 
//     keyup$.pipe( pluck('type') ), 
//     click$.pipe( pluck('type') )
// ).subscribe( console.log );

const input1 = document.createElement('input');
const input2 = document.createElement('input');

input1.placeholder = 'email@gmail.com';

input2.placeholder = '*********';
input2.type = 'password'

document.querySelector('body').append(input1, input2);


// Helper
const getInputStream = ( elem: HTMLElement ) => 
    fromEvent<KeyboardEvent>( elem, 'keyup' ).pipe(
        map<KeyboardEvent,string>(event => event.target['value'])
    );


combineLatest(
    getInputStream( input1 ),
    getInputStream( input2 ),
).subscribe( console.log )
