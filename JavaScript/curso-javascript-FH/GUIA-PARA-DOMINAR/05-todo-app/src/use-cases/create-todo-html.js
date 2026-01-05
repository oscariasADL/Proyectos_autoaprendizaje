import { Todo } from "../todos/models/todo.js";

export const createTodoHTML = ( todo ) => {

    const html = `<div class="view">
                    <input class="toggle" type="checkbox" ${ todo.done ? 'checked' : '' }>
                    <label>${ todo.description }</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="${ todo.description }">`;
    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', todo.id);
    if ( todo.done ) {
        liElement.classList.add( 'completed' );
    }

   return liElement;

}
    
