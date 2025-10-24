/**
 * Operador Reduce
 * https://rxjs.dev/api/operators/reduce
 * 
 * Es similar a Array.reduce()
 * 
 * Sirve para acumular valores
 * 
 * Emite un unico valor al completar el observable
 * 
 * No emite valores intermedios
 * 
 * El valor emitido es el resultado de la operacion de acumulacion
 * 
 * Requiere que el observable complete
 * 
 * El operador reduce en RxJS es un operador de acumulación que permite reducir todos los valores emitidos por un Observable a un solo resultado final, usando una función acumuladora.
 */
import { interval } from 'rxjs';
import { take, reduce, tap } from 'rxjs/operators';


const numbers = [1,2,3,4,5];

const totalReducer = ( acumulador: number, valorActual: number ) => {
    return acumulador + valorActual;
}

const total = numbers.reduce( totalReducer, 0 );
console.log('total arr', total );

interval(500).pipe(
    take(6),
    tap( console.log ),
    reduce( totalReducer )
)
.subscribe({
    next: val => console.log('next:', val ),
    complete: () => console.log('Complete')
});





