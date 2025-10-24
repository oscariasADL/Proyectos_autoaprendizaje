/* FILTER */

/**
 * El operador filter en RxJS es un operador de tipo condicional que permite filtrar los valores emitidos por un Observable según una condición que tú defines. Solo los valores que cumplen esa condición pasan al siguiente operador o al suscriptor.
 * 
 * filter funciona de forma similar al método filter de los arrays en JavaScript. Evalúa cada valor emitido por el Observable y solo deja pasar aquellos que cumplen con una función de predicado (una función que devuelve true o false).
 */


import { range, from, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const numImpar$ =range(20,30).pipe(

  filter( (val, i) => {
    console.log('index', i);
    return val % 2 === 1; // Filtra los números impares
  }) 

); 

numImpar$.subscribe(
  val => console.log( val )
 )


console.log(" ".repeat(10));
console.log("=".repeat(10));
console.log(" ".repeat(10));

const personajes = [
  {
    tipo: 'heroe',
    nombre: 'Batman'
  },
  {
    tipo: 'heroe',
    nombre: 'Rocket Raccoon'
  },
  {
    tipo: 'villano',
    nombre: 'Joker'
  },
  {
    tipo: 'villano',
    nombre: 'Lex Luthor'
  },
  {
    tipo: 'villano',
    nombre: 'Thanos'
  },
  {
    tipo: 'heroe',
    nombre: 'Ironman'
  }
]

const personajes$ = from( personajes ).pipe(

  filter( p => p.tipo === 'heroe') 


);

personajes$.subscribe(
  val => console.log( val.nombre)
);

console.log(" ".repeat(10));
console.log("=".repeat(10));
console.log(" ".repeat(10));

const keyEncadenadores$ = fromEvent<KeyboardEvent>( document, 'keyup' ).pipe(
  map( event => event.code ),
  filter( key => key === 'Enter' ),
);

keyEncadenadores$.subscribe( console.log );