import { Observer, from, of } from 'rxjs';
/* FROM Y OF MAS EJEMPLOS */

/**
 * of = toma argumentos y genera una secuencia
 * from = array, promise, iterable, observable
 */

const Observer = {
  next: (value) => console.log('next', value),
  complete: () => console.info('completado'),
}

//const source$ = from([1, 2, 3, 4, 5, 6]); //Genera una secuencia a partir de un array (separados)
//const source$ = of([1, 2, 3, 4, 5, 6]); //Genera una secuencia a partir de los argumentos (todo junto)
//const source$ = from('Hola Mundo'); //Genera una secuencia a partir de un iterable (string) (separados) letra por letra en cada next

const source$ = from(fetch('https://api.github.com/users/klerith')); //Genera una secuencia a partir de una promesa

// source$.subscribe( async(resp) => {

//   const dataResp = await resp.json(); //convierte la respuesta a json

//   console.log(dataResp);
  
// });

//source$.subscribe(Observer);


const miGenerador = function*() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  yield 6;
}

const miIterable = miGenerador();

// for (let id of miIterable) {
//   console.log(id);
// }

from(miIterable).subscribe(Observer);