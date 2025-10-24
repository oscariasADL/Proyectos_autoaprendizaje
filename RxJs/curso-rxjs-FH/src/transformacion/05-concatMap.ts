import { interval, fromEvent } from 'rxjs';
import { take, switchMap, concatMap } from 'rxjs/operators';

/**
 * ConcatMap
 * 
 * El operador concatMap en RxJS es una herramienta poderosa para manejar flujos de datos asíncronos, especialmente cuando necesitas mantener el orden de las emisiones y asegurarte de que cada operación se complete antes de iniciar la siguiente.
 * 
 * concatMap mapea cada valor emitido por el observable fuente a un nuevo observable, y se suscribe a estos observables de manera secuencial. Esto significa que concatMap esperará a que el observable interno actual complete su emisión antes de suscribirse al siguiente.
 * 
 * Esta característica es particularmente útil en escenarios donde el orden de las operaciones es crucial, como en la realización de solicitudes HTTP que deben procesarse en secuencia o en la ejecución de tareas dependientes.
 */

const interval$ = interval(500).pipe( take(3) );
const click$    = fromEvent( document, 'click' );

click$.pipe(
    concatMap( () => interval$ )
)
.subscribe( console.log );