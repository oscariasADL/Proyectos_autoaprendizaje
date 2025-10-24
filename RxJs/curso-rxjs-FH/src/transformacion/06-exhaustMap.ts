import { interval, fromEvent } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';


/**
 * ExhaustMap
 * 
 * El operador exhaustMap en RxJS es útil cuando deseas ignorar nuevas emisiones de un observable fuente mientras una operación interna (un observable interno) está en curso. En otras palabras, si el observable fuente emite un nuevo valor mientras el observable interno aún no ha completado su emisión, ese nuevo valor será ignorado.
 * 
 * Esto es particularmente útil en escenarios donde no quieres que múltiples operaciones se solapen, como en el caso de manejar eventos de clics rápidos que disparan solicitudes HTTP. Con exhaustMap, solo la primera solicitud se procesará y las subsecuentes serán ignoradas hasta que la primera se complete.
 * 
 * Ejemplo:
 * 
 * Imagina que tienes un botón que, al hacer clic, inicia una operación que tarda 3 segundos en completarse (simulada aquí con un intervalo). Si haces clic varias veces rápidamente, solo la primera operación se ejecutará y las demás serán ignoradas hasta que la primera termine.
 */

const interval$ = interval(500).pipe( take(3) );
const click$    = fromEvent( document, 'click' );

click$.pipe(
    exhaustMap( () => interval$ )
)
.subscribe( console.log );




