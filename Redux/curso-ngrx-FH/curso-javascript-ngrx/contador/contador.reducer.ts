import { Action } from '../ngrx-fake/ngrx.ts';

export function contadorReducer( state = 10, action: Action ) {

    /*if ( action.type === 'INCREMENTAR' ) {
        return state + 3;
    }*/

    switch ( action.type ) {
        case 'INCREMENTAR':
            return state + 1;

        case 'DECREMENTAR':
            return state - 2;

        case 'MULTIPLICAR':
            return state * action.payload;

        case 'DIVIDIR':
            return state / action.payload;
        
        case 'RESET':
            return state = 0; 
              
        default:
            return state;
    }

}