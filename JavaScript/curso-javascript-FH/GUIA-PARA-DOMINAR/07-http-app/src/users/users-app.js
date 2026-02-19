import { renderButtons } from "./presentation/render-buttons/render-buttons";
import { renderTable } from "./presentation/render-table/render-table";
import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import usersStore from "./store/users-store";
import { renderModal } from "./presentation/render-modal/render-modal";
import { saveUser } from "./use-cases/save-user";

export const UsersApp = async( element ) => {

    const loadingMessage = document.querySelector('#loading');
    loadingMessage.innerText = 'Cargando Usuarios...';

    await usersStore.loadNextPage();
    loadingMessage.remove();
    renderTable( element );
    renderButtons( element );
    renderAddButton( element );
    renderModal( element, async(userLike) => {
        const user = await saveUser( userLike );
        usersStore.onUserChanged( user );
        renderTable();
    });
    //console.log( usersStore.getUser() );

}