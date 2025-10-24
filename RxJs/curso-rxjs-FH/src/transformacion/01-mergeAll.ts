import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, pluck, mergeAll } from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';

import { GithubUser } from '../interfaces/github-user.interface';
import { GithubUsersResp } from '../interfaces/github-users.interface';

/**
 * MERGE ALL
 * Es un operador que recibe un observable que emite observables y los convierte en un solo observable.
 * Es decir, "aplana" una estructura de observables.
 * 
 * En este caso, el observable que emite observables es el resultado del operador map, que convierte
 * cada evento de teclado en un observable que emite la respuesta de la petición HTTP.
 */

// Referencias
const body = document.querySelector('body');
const textInput = document.createElement('input');
const orderList = document.createElement('ol');
body.append( textInput, orderList );

// Helpers
const mostrarUsuarios = ( usuarios: GithubUser[] ) => {
    
    console.log(usuarios);
    orderList.innerHTML = '';

    for( const usuario of usuarios ) {

        const li  = document.createElement('li');
        const img = document.createElement('img');
        img.src = usuario.avatar_url;

        const anchor  = document.createElement('a');
        anchor.href   = usuario.html_url;
        anchor.text   = 'Ver página';
        anchor.target = '_blank';

        const paragraph = document.createElement('p');
        paragraph.textContent = 'ID: ' + usuario.id;

        li.append( img );
        li.appendChild( document.createElement('br') );
        li.append( paragraph );
        li.append( usuario.login + ' ' );
        li.appendChild( document.createElement('br') );
        li.append( anchor );

        orderList.append(li);
    }

}



// Streams
const input$ = fromEvent<KeyboardEvent>( textInput, 'keyup' );

/*
input$.pipe(
    debounceTime<KeyboardEvent>(500),
    pluck<KeyboardEvent, string>('target','value'),
    map<string, Observable<GithubUsersResp>>( texto => ajax.getJSON(
        `https://api.github.com/search/users?q=${ texto }`
    )),
    mergeAll<GithubUsersResp>(),
    pluck<GithubUsersResp, GithubUser[]>('items')
).subscribe( mostrarUsuarios );

*/

input$.pipe(
    debounceTime(500),
    map(event => (event.target as HTMLInputElement)?.value),
    map(texto => ajax.getJSON<GithubUsersResp>(
        `https://api.github.com/search/users?q=${ texto }`
    )),
    mergeAll(),
    map(resp => resp.items)
).subscribe(mostrarUsuarios);