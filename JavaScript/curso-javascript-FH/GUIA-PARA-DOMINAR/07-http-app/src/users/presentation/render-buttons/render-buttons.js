import './render-buttons.css';
import usersStore from "../../store/users-store";
import { renderTable } from '../render-table/render-table';

export const renderButtons = ( element ) =>{

    const buttonsContainer = document.createElement( 'div' );
    buttonsContainer.classList.add( 'buttons-container' );

    const prevButton = document.createElement( 'button' );
    prevButton.classList.add( 'btn', 'btn-primary', 'btn-sm' );
    prevButton.textContent = 'Previous';
    buttonsContainer.appendChild( prevButton );

    const currentPageLabel = document.createElement( 'span' );
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerHTML = usersStore.getCurrentPage();
    buttonsContainer.appendChild( currentPageLabel );

    const nextButton = document.createElement( 'button' );
    nextButton.classList.add( 'btn', 'btn-primary', 'btn-sm' );
    nextButton.textContent = 'Next';
    buttonsContainer.appendChild( nextButton );

    

    element.appendChild( buttonsContainer );

    nextButton.addEventListener( 'click', async() => {
        await usersStore.loadNextPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable( element );
    });

    prevButton.addEventListener( 'click', async() => {
        await usersStore.loadrPreviousPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable( element );
    });

}