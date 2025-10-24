/* INTEVAL Y TIMER*/

import { interval, timer } from 'rxjs';

const observer = {
  next: val => console.log('next:', val),
  complete: () => console.log('completado')
}

//Los intervals y los timers son observables que emiten valores de manera periódica y asincrónica

//El interval emite valores numéricos enteros, empezando desde el 0 y aumentando de uno en uno, cada cierto intervalo de tiempo
//El timer emite un único valor después de un retraso especificado, y luego puede continuar emitiendo valores periódicamente si se proporciona un segundo argumento

const interval$ = interval(1000);
const timers$ = timer(2000, 1000)


console.log('Inicio del Ciclo');
//interval$.subscribe( observer );
timers$.subscribe( observer );
console.log('Fin del Ciclo');