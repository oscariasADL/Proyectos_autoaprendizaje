
import {Todo} from "../todos/models/todo.js";
import {createTodoHTML} from "./create-todo-html.js";

let element;

export const renderTodos = ( elementID, todos = [] ) => {
    
    if ( !element )
        element = document.querySelector( elementID );

    if ( !element ) throw new Error(`Element with ID ${ elementID } not found` );

    element.innerHTML = '';

    todos.forEach( todo => {
        element.append( createTodoHTML( todo ) );
    });
}