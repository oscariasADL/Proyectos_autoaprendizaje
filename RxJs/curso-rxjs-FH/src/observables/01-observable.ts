import { Observable, Observer } from 'rxjs';

//Uso de un observer
const observer: Observer<any> = {
  next: (value: string) => console.log('Siguiente [next]:', value),
  error: (error: any) => console.warn('error [obs]:', error),
  complete: () => console.info('Completado [obs]:'),
};


const obs$ = new Observable<string>(subscriber => {
  subscriber.next('Hola');
  subscriber.next('Mundo');
  subscriber.next('Oscar');
  subscriber.next('Eduardo');

  subscriber.complete();

  subscriber.next('Holaaaa');//No se va a emitir porque ya se completo el observable
  subscriber.next('Mundoooo');//No se va a emitir porque ya se completo el observable
});

console.log('Inicio del Obs$');


/*
obs$.subscribe( console.log ); //Solo procesa el next del suscriber

obs$.subscribe( res    => {
  console.log('next:', res);
});


Otra forma de suscribirse, manejando next, error y complete

obs$.subscribe({
  next: value => console.log('next:', value),
  error: error => console.warn('error:', error),
  complete: () => console.info('Completado'),
});
*/



obs$.subscribe( observer);

console.log('Fin del Obs$');