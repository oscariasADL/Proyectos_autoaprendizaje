import { createStore } from 'redux';
//ACCION
interface Action {
    type: string;
    payload?: any;
}

//REDUCER
//EN los reducers es recomendable no usar else, solo if o switch
//Siempre deben retornar un estado
//Nunca deben de tener efectos secundarios o llamadas al exterior (llamadas http, fechas aleatorias, etc), todo debe ser puro y resolver solo con lo que se le pasa
function contadorReducer( state = 10, action: Action ) {

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

        default:
            return state;
    }

}

const incrementadorAction: Action = {
    type:'INCREMENTAR'
}

const decrementadorAction: Action = {
    type:'DECREMENTAR'
}

const multiplicarAction: Action = {
    type:'MULTIPLICAR',
    payload: 5
}

const dividirAction: Action = {
    type:'DIVIDIR',
    payload: 5
}

console.log( contadorReducer( 10, dividirAction ) );