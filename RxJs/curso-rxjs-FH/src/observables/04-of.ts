import { of } from 'rxjs';

/* Funciones para ayudar a crear observables */

/* FUNCION OF */

//const obs$ = of(1,2,3,4,5,6);
//const obs$ = of<number>(...[1,2,3,4,5,6],2,3,4,5,6);

const obs$ = of(...[1, 2, 3, 4, 5, 6], 'Hola', { a: 1, b: 2 }, true, Promise.resolve(true));

console.log('Inicio del Obs$');

obs$.subscribe({
  next: value => console.log('next:', value),
  error: error => console.warn('error:', error),
  complete: () => console.info('Completado'),
});

console.log('Fin del Obs$');