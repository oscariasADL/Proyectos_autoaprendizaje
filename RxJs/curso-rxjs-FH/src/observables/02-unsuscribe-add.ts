import { Observable, Observer } from 'rxjs';

//Uso de un observer
const observer: Observer<any> = {
  next: (value: string) => console.log('next:', value),
  error: (error: any) => console.warn('error:', error),
  complete: () => console.info('Completado:'),
};

const intervalo$ = new Observable<number>(subscriber => {
  //Crear un contador
  let contador = 0;

  const interval = setInterval(() => {
    contador++;
    subscriber.next(contador);
    console.log(contador);
  }, 1000);

  setTimeout(() => {
    subscriber.complete();
  }, 2500 );

  return () => {
    clearInterval(interval);
    console.log('Intervalo destruido');
  }
});

const subs1 = intervalo$.subscribe( observer );
const subs2 = intervalo$.subscribe( observer );
const subs3 = intervalo$.subscribe( observer );

//Encadenar las subscripciones
subs1.add( subs2.add( subs3 ) );

//Si queremos cancelar las subscripciones antes de que se completen

setTimeout(() => {
  //Si estan encadenadas, solo llamando la subscription principal se cancelan todas las demas
    subs1.unsubscribe();
    /*subs2.unsubscribe();
    subs3.unsubscribe();*/

    console.log('Completado timeout');
  }, 6000);