/**
 * Operador TAKE
 * El operador take en RxJS es un operador de control de emisiones que te permite limitar la cantidad de valores que un Observable puede emitir antes de completarse.
 * 
 * take no transforma los valores emitidos por el Observable, simplemente controla cuántos de esos valores se permiten pasar al suscriptor.
 * 
 * take(n) hace que el Observable emita solo los primeros n valores y luego se complete automáticamente.
 */
import { of } from 'rxjs';
import { take, tap } from 'rxjs/operators';


const numeros$ = of(1,2,3,4,5);


numeros$.pipe(
    //tap( t => console.log('tap', t) ),
    take(3)
)
.subscribe({
    next: val => console.log('next:' , val),
    complete: () => console.log('complete'),
});
