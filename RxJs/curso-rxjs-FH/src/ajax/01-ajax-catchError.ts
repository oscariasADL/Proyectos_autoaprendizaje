import { ajax, AjaxError } from 'rxjs/ajax';
import { map, pluck, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

/* FETCH API
   Ejemplo de uso de la API de GitHub para obtener una lista de usuarios.
*/

const url = 'https://api.github.com/users?per_page=5';

const manejaErrores = ( response: Response ) => {

    if ( !response.ok ) {
        throw new Error( response.statusText );
    }
    
    return response;
}

const atrapaError = (err: AjaxError) => {
    console.warn('error en:', err.message );
    return of([]);
}



const fetchPromesa = fetch( url );

// fetchPromesa
//     .then( resp => resp.json() )
//     .then( data => console.log('data:', data) )
//     .catch( err => console.warn('error en usuarios', err ) )

// fetchPromesa
//     .then( manejaErrores )
//     .then( resp => resp.json() )
//     .then( data => console.log('data:', data) )
//     .catch( err => console.warn('error en usuarios', err ) )

ajax( url ).pipe(
    //pluck('response'),
    map( resp => resp.response ),
    catchError( atrapaError )
)
.subscribe( usuarios => console.log('usuarios:', usuarios) );


