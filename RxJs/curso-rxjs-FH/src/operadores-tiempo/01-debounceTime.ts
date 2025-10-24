import { fromEvent } from 'rxjs';
import { debounceTime, pluck, distinctUntilChanged } from 'rxjs/operators';
/* DEBOUNCE TIME
   El operador debounceTime en RxJS es un operador de control de tiempo que se usa para esperar un intervalo de tiempo antes de emitir el último valor recibido. Es especialmente útil para evitar emisiones excesivas en flujos rápidos, como eventos de teclado o clics.
*/

const click$ = fromEvent( document, 'click' );

click$.pipe(
    debounceTime(3000)
);//.subscribe( console.log );

// Ejemplo 2
const input = document.createElement('input');
document.querySelector('body').append( input );


const input$ = fromEvent( input, 'keyup' );

input$.pipe(
    debounceTime(1000),
    pluck('target','value'),
    distinctUntilChanged()
).subscribe( console.log );