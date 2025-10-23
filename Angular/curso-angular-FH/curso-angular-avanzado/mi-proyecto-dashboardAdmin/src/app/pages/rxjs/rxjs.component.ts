import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, take, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  contador$: Observable<number> = interval(1000);
  contadorSubs!: Subscription; 

  constructor() {
    this.contadorSubs = this.contador$.pipe(
      take(5)
    )
    .subscribe({
      next: value => console.log('next:', value),
      error: error => console.warn('error:', error),
      complete: () => console.info('Completado'),
    });

    /*

    let i = -1;

    const obs$ = new Observable<number>( observer => {

      const intervalo = setInterval( () => {

        i++;
        observer.next(i);

        if ( i === 4 ) {
          clearInterval(intervalo);
          observer.complete();
        }

        if ( i === 2 ) {
          observer.error('i llego al valor de 2');
        }
        
      },1000)

    });

    obs$.pipe(
      retry(1) //El operador retry vuelve a intentar la suscripcion en caso de error, en este caso 1 vez
    ).subscribe( 
      numero => console.log('Subs', numero),
      (error) => console.warn('Error en el obs', error),
      () => console.info('El observador termino')
    );

    */

    //CUANDO SE USAN FUNCIONES QUE RETORNAN OBSERVABLES
    /*
    
    this.retornaObservavle().pipe(
      retry(1) //El operador retry vuelve a intentar la suscripcion en caso de error, en este caso 1 vez
    ).subscribe( 
      numero => console.log('Subs', numero),
      (error) => console.warn('Error en el obs', error),
      () => console.info('El observador termino')
    );

    */
   

    /*

    //Valor en el onInit para ver el funcionamiento del pipe con map y filter
    this.retornaIntervalo().subscribe( console.log );


    retornaIntervalo() : Observable<number> {

      return interval(500)
        .pipe(
          //take(10),
          map( valor => valor +1 ),
          filter( valor => ( valor % 2 === 0 ) ? true : false )
        );
    }




    //FUNCIONES QUE RETORNAN OBSERVABLES
    // Tiene el mismo codigo que el observable de arriba
    
    retornaObservable() : Observable<number> {

      let i = -1;

      const obs$ = new Observable<number>( observer => {
  
        const intervalo = setInterval( () => {
  
          i++;
          observer.next(i);
  
          if ( i === 4 ) {
            clearInterval(intervalo);
            observer.complete();
          }
  
          if ( i === 2 ) {
            observer.error('i llego al valor de 2');
          }
          
        },1000)
  
      });

      return obs$;

    }

    */


  }
  ngOnDestroy(): void {
    // Limpiar suscripciones
    this.contadorSubs.unsubscribe();
  }

}
