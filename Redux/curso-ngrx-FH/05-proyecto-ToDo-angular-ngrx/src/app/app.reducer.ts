import { Todo } from "./todos/models/todo.model";

export interface AppState {
    todos:  Todo[];
}

export interface TodoState {
    items:    string[];
    filter:   'all' | 'completed' | 'pending';
    loading:  boolean;
    error?:   string;
}