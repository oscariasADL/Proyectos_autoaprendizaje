/**
 * Operador FRIST
 * El operador first en RxJS, que es muy útil en flujos donde solo te interesa la primera emisión que cumpla una condición (o simplemente la primera emisión en general).
 * 
 * El operador first permite que un Observable emita solo el primer valor que cumple una condición (si se especifica) y luego se completa automáticamente.
 */
import { fromEvent } from 'rxjs';
import { take, first, tap, map } from 'rxjs/operators';


const click$ = fromEvent<MouseEvent>( document, 'click' );



click$.pipe(
    tap<MouseEvent>( console.log ),
    // map( event => ({
    //     clientY: event.clientY,
    //     clientX: event.clientX
    // }) )
    map( ({ clientX, clientY }) => ({ clientY,clientX }) ),

    first( event => event.clientY >= 150 )
)
.subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('complete')
});

