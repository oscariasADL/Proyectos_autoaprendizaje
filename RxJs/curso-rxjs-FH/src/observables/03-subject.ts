import { Observable, Observer, Subject } from 'rxjs';

//Uso de un observer
const observer: Observer<any> = {
  next: (value: string) => console.log('next:', value),
  error: (error: any) => console.warn('error:', error),
  complete: () => console.info('Completado:'),
};

const intervalo$ =   new Observable<number>(subscriber => {

  const intervalID = setInterval(() => {
    subscriber.next(Math.random());
  }, 2000);

  return () => {
    clearInterval(intervalID);
    console.log('Intervalo destruido');
  }

});

// QUE ES UN SUBJECT
// Es un tipo especial de observable que permite multicasting a múltiples observadores 

/*
 * 1- Casteo multiple
 * 2- Tambien es un observer
 * 3- Next, error y complete
*/

const subject$ = new Subject();
const intervalSubject = intervalo$.subscribe(subject$);

const subs1 = subject$.subscribe( observer );
const subs2 = subject$.subscribe( observer );



/* EMITEN VALORES DIFERENTES */
//const subs1 = intervalo$.subscribe( rnd => console.log('subs1', rnd) );
//const subs2 = intervalo$.subscribe( rnd => console.log('subs2', rnd) );



/* Cuando la data es producida por el observable en si mismo, es considerado un "Cold Observable", Pero cuando la data es producida fuera del observable es llamado "Hot Observable" */

setTimeout(() => {

  subject$.next(10);
  subject$.complete( );
  intervalSubject.unsubscribe();
  //subs1.unsubscribe();
  //subs2.unsubscribe();

},  3500);