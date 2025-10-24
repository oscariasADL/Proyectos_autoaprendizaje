import { interval, concat, of } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';

/**
 * CONCAT
 * 
 * Es un operador que nos permite concatenar observables.
 * 
 * - Espera a que el observable anterior complete para suscribirse al siguiente.
 * - Si algún observable no completa, los siguientes no se ejecutan.
 * 
 * Por ejemplo, en este caso, el primer observable emite 3 valores (0, 1, 2) y luego completa.
 * Una vez que completa, se suscribe al segundo observable, que emite 2 valores (0, 1) y luego completa.
 * Finalmente, se suscribe al observable creado con 'of(1)', que emite el valor 1 y luego completa.
 * 
 * La salida será: 0, 1, 2, 0, 1, 1
 * 
 * ( SI EL OBSERVABLE 1 NO SE COMPLETA JAMAS SE EJECUTAN LOS SIGUIENTES )
 */

const interval$ = interval(1000);

concat(
    interval$.pipe( take(3) ),
    interval$.pipe( take(2) ),
    of(1)
).subscribe( console.log  )


