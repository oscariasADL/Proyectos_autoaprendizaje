/**
 * El operador tap se utiliza para ejecutar efectos secundarios en una cadena de operadores de un Observable, sin modificar los valores que pasan por él.
  * Es útil para depuración, registro o cualquier acción que no afecte el flujo de datos.
 */

import { range } from 'rxjs';
import { tap, map } from 'rxjs/operators';



const numeros$ = range(1,5);


numeros$.pipe(
    tap( x => {
        console.log('antes', x);
        return 100;
    }),
    map( val => val * 10 ),
    tap({
        next: valor => console.log('después', valor),
        complete: () => console.log('Se terminó todo')
    })
)
.subscribe( val => console.log('subs', val ));