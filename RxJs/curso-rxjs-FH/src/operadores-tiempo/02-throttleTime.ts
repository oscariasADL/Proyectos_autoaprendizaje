import { fromEvent, asyncScheduler } from 'rxjs';
import { throttleTime, pluck, distinctUntilChanged } from 'rxjs/operators';

/*
* THROTTLE TIME
   El operador throttleTime en RxJS es un operador de control de tiempo que se utiliza para limitar la frecuencia con la que se emiten los valores de un observable. Funciona emitiendo el primer valor recibido y luego ignorando cualquier valor adicional durante un intervalo de tiempo especificado. Después de que transcurre ese intervalo, el operador está listo para emitir el siguiente valor recibido. 
*/
const click$ = fromEvent( document, 'click' );

click$.pipe(
    throttleTime(3000)
)//.subscribe( console.log );

// Ejemplo 2
const input = document.createElement('input');
document.querySelector('body').append( input );


const input$ = fromEvent( input, 'keyup' );

input$.pipe(
    throttleTime(400, asyncScheduler, {
        leading: false,
        trailing: true
    }),
    pluck('target','value'),
    distinctUntilChanged()
).subscribe( console.log );