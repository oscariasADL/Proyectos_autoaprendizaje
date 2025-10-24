/* ASYNSCHEDULER */

/* Los asynscheduler son una forma de programar la ejecución de tareas de manera asíncrona en RxJS. Permiten ejecutar código después de un retraso o de forma periódica, sin bloquear el hilo principal. Los AsyncScheduler no crean un observable, si no que crean una suscripción que se ejecuta de forma asíncrona. */

import { asyncScheduler } from 'rxjs';

//setTimeout(() => console.log('setTimeout'), 3000);
//setInterval(() => console.log('setInterval'), 3000);

//const saludar = () => console.log('Hola mundo');
//const saludar2 = nombre => console.log(`Hola ${nombre}`);

//asyncScheduler.schedule(saludar, 2000);
//asyncScheduler.schedule(saludar2, 2000, 'Oscar'); //En este caso el tercer argumento solo puede enviar un argumento que basicamente es el state

const subs = asyncScheduler.schedule(function (state) {

  console.log('state', state);
  this.schedule(state + 1, 1000); //El this hace referencia a la función que se está ejecutando, en este caso a la función anónima

}, 3000, 0);


setTimeout(() => {
  subs.unsubscribe(); //Con esto detenemos la ejecución del asyncScheduler
  console.log('Completado');
}, 10000);