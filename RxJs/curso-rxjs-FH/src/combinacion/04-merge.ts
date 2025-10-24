import { fromEvent, merge } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

/**
 * MERGE
 * 
 * Es un operador que nos permite combinar múltiples observables en uno solo.
 * 
 * - No espera a que el observable anterior complete para suscribirse al siguiente.
 * - Emite los valores de todos los observables conforme llegan.
 * 
 * Por ejemplo, en este caso, tenemos dos observables: uno que emite eventos de 'keyup' y otro que emite eventos de 'click'.
 * El operador 'merge' combina ambos observables en uno solo, y cada vez que se produce un evento en cualquiera de los dos,
 * se emite el tipo de evento ('keyup' o 'click').
 * 
 * La salida será una mezcla de 'keyup' y 'click' dependiendo de cuál ocurra primero.
 * 
 * Solo se emite el complete hasta que ambos observables hayan completado.
 */

const keyup$ = fromEvent( document, 'keyup');
const click$ = fromEvent( document, 'click');

merge( 
    keyup$.pipe( map(event => event.type) ), 
    click$.pipe( map(event => event.type) )
).subscribe( console.log );



