/* MAP TO */

/**
 * El operador mapTo en RxJS es un operador de transformación que reemplaza cada valor emitido por un Observable con un valor fijo que tú defines.
 * mapTo es como una versión simplificada de map, pero en lugar de transformar cada valor con una función, siempre devuelve el mismo valor sin importar lo que emita el Observable original.
 */


import { range, fromEvent } from 'rxjs';
import { map, pluck, mapTo } from 'rxjs/operators';

const keyup$ = fromEvent<KeyboardEvent>( document, 'keyup' );

const keyupMap$ = keyup$.pipe(
  map( event => event.code )
);

const keyupPluck$ = keyup$.pipe(
  pluck('target', 'baseURI' ) // Extrae la propiedad baseURI del objeto target del evento
);

const keyUpMapTo$ = keyup$.pipe(
  mapTo('Tecla presionada')
);

keyupMap$.subscribe( code => console.log('map: ', code) );
keyupPluck$.subscribe( code => console.log('pluck: ', code) );
keyUpMapTo$.subscribe( msg => console.log('mapTo: ', msg) );