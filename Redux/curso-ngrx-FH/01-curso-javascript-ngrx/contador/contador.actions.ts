import { createStore } from 'redux';
import { Action } from '../ngrx-fake/ngrx.ts';

export const incrementadorAction: Action = {
    type:'INCREMENTAR'
}

export const decrementadorAction: Action = {
    type:'DECREMENTAR'
}

export const multiplicarAction: Action = {
    type:'MULTIPLICAR',
    payload: 5
}

export const dividirAction: Action = {
    type:'DIVIDIR',
    payload: 5
}

export const resetAction: Action = {
    type:'RESET'
}