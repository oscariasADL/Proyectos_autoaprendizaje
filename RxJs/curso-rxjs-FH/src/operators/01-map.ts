/* MAP */

/**
 * El operador map permite transformar los valores emitidos por un observable. Map es un operador de transformación que permite modificar cada valor emitido por un Observable antes de que llegue al suscriptor.
 * 
 * Map transforma pero no produce efectos secundarios, simplemente toma un valor de entrada, lo transforma y emite el valor transformado.
 * 
 * Pipes
 * Los pipes son una forma de encadenar múltiples operadores en una secuencia. Permiten aplicar una serie de transformaciones a los valores emitidos por un Observable de manera concisa y legible.
 */


import { range, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const rangoNum$ = range(1,5).pipe(
  map<number,number>( val => val * 10)
)

rangoNum$.subscribe( console.log );

console.log(" ".repeat(20));
console.log("=".repeat(20));
console.log(" ".repeat(20));

const keyup$ = fromEvent<KeyboardEvent>( document, 'keyup' );

const keyupMap$ = keyup$.pipe(
  map( event => event.code )
);

keyupMap$.subscribe( console.log );