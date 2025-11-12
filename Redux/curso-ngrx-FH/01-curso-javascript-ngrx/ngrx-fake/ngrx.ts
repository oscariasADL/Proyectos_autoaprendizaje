import { createStore } from 'redux';
//ACCION
export interface Action {
    type: string;
    payload?: any;
}

export interface Reducer<T> {
    ( state: T, action: Action ): T;
}