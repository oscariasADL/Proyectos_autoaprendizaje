/* FROM EVENT */

import { of, range } from 'rxjs';

// const src$ = of(1,2,3,4,5,6);

//asyncScheduler -> Sirve para hacer las emisiones de manera asíncrona
const src$ = range(1, 100);

console.log('Inicio del observable');

src$.subscribe({
  next: (val) => console.log('next', val),
  complete: () => console.log('Completado'),
});

console.log('Fin del observable');