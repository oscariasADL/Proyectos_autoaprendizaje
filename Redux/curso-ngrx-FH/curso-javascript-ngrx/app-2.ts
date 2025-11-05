import { createStore } from 'redux';
import { contadorReducer } from './contador/contador.reducer.ts';
import { incrementadorAction, decrementadorAction, multiplicarAction, dividirAction, resetAction } from './contador/contador.actions.ts';
import { Action } from './ngrx-fake/ngrx';
//REDUCER
//EN los reducers es recomendable no usar else, solo if o switch
//Siempre deben retornar un estado
//Nunca deben de tener efectos secundarios o llamadas al exterior (llamadas http, fechas aleatorias, etc), todo debe ser puro y resolver solo con lo que se le pasa


console.log( contadorReducer( 10, incrementadorAction ) );
console.log( contadorReducer( 10, decrementadorAction ) );
console.log( contadorReducer( 10, multiplicarAction ) );
console.log( contadorReducer( 10, dividirAction ) );
console.log( contadorReducer( 10, resetAction ) );