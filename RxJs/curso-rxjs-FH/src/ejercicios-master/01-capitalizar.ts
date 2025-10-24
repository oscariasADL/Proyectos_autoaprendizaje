import { of, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * Ejercicio: 
 * El objetivo de es realizar la misma impresión, pero usando observables
 * Nota: NO hay que usar el ciclo "FOR OF", usar un observable y llamar la función capitalizar
 */

/**
 * Salida esperada:
 * Batman
 * Joker
 * Doble Cara
 * Pingüino
 * Hiedra Venenosa
 */



(() =>{

    const capitalizar = (nombre: string) => nombre.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

    const observer: Observer<any> = {
      next: value => console.log(value),
      error: error => console.warn('error:', error),
      complete: () => console.info('Completado'),
    };
    
    const obs$ = of(...[ 'batman', 'joker', 'doble cara', 'pingüino', 'hiedra venenosa' ] )
    .pipe(
        map(capitalizar)
    );
    
    obs$.subscribe( observer );
    

})();


/*


Otra forma de hacerlo

(() =>{


    const nombres = ['batman', 'joker', 'doble cara', 'pingüino', 'hiedra venenosa'];

    const capitalizar = (nombre: string) => nombre.replace(/\w\S*\/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

    from( nombres ).pipe(
        map(capitalizar)
    ).subscribe( observer );

})();


*/

