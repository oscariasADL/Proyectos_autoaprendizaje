import { of, interval, forkJoin } from 'rxjs';
import { take, delay } from 'rxjs/operators';


/**
 * forkJoin
 * - Toma como argumento un array o un objeto con observables.
 * - Espera a que todos los observables se completen y devuelve el último valor emitido por cada uno.
 * - Si alguno de los observables no emite ningún valor, el observable resultante no emitirá ningún valor.
 * - Si alguno de los observables falla, el observable resultante fallará también.
 * 
 * Se ejecuta cuando todos los observables se completan. Emite el ultimo valor emitido por cada uno.
 * forkJoin([obs1, obs2, obs3]).subscribe( console.log )
 */

const numeros$   = of(1,2,3,4);
const intervalo$ = interval(1000).pipe( take(5) ); //0..1..2 
const letras$    = of('a','b','c').pipe( delay(3500) );

// forkJoin(
//     numeros$,
//     intervalo$,
//     letras$
// ).subscribe( console.log  )

// forkJoin(
//     numeros$,
//     intervalo$,
//     letras$
// ).subscribe( resp => {
//     console.log('numeros: ', resp[0] )
//     console.log('intérvalo: ', resp[1] )
//     console.log('letras: ', resp[2] )
// });

// forkJoin({
//     numeros$,
//     intervalo$,
//     letras$
// }).subscribe( resp => {
//     console.log(resp)
// });

forkJoin({
    num: numeros$,
    int: intervalo$,
    let: letras$
}).subscribe( resp => {
    console.log(resp)
});


