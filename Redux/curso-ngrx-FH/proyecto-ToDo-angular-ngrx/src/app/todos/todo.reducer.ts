import { Action, createReducer, on } from "@ngrx/store";
import { crearTodo } from "./todos.actions";
import { Todo } from "./models/todo.model";


export const initialState: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Robar el escudo del Capitán América'),
    new Todo('Pedirle a Tony Stark que me haga un traje de Iron Man'),
];

const _todoReducer = createReducer(
    initialState,
    on( crearTodo, (state, {texto}) => [...state, new Todo(texto)] )
);


export function todoReducer(state: Todo[] = initialState, action: Action) {
    return _todoReducer(state, action);
}