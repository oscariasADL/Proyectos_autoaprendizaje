/* PLUCK */

/**
 * El operador pluck en RxJS es un operador de transformación que se utiliza para extraer una propiedad específica de los objetos emitidos por un Observable.
 * 
 * pluck es un operador que toma el nombre de una propiedad (o una ruta de propiedades anidadas) y devuelve un nuevo Observable que emite solo el valor de esa propiedad de cada objeto emitido.
 * Sirve para:
 * Simplificar el acceso a propiedades sin tener que usar map y escribir funciones manuales.
 * Extraer datos anidados de forma más concisa.
 * Limpiar el flujo de datos cuando solo necesitas una parte específica del objeto.
 */


import { range, fromEvent } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

const keyup$ = fromEvent<KeyboardEvent>( document, 'keyup' );

const keyupMap$ = keyup$.pipe(
  map( event => event.code )
);

const keyupPluck$ = keyup$.pipe(
  pluck('target', 'baseURI' ) // Extrae la propiedad baseURI del objeto target del evento
);

keyupMap$.subscribe( code => console.log('map: ', code) );
keyupPluck$.subscribe( code => console.log('pluck: ', code) );