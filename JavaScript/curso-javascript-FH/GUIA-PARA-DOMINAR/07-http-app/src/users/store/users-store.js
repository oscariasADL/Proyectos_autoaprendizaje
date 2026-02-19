import { loadUsersByPage } from "../use-cases/load-user-by-page.js";

const state = {
    currentPage: 0,
    users: []
}

const loadNextPage = async() => {
    //const datos = await loadUsersByPage( state.currentPage + 1 );
    //console.log( datos.data );
    //throw new Error('No implementado')
    const users = await loadUsersByPage( state.currentPage + 1 );
    if ( users.length === 0 ) return;

    console.log('🚀 Usuarios cargados');

    state.currentPage += 1;
    state.users = users
}

const loadrPreviousPage = async() => {
    if ( state.currentPage <= 1 ) return;
    const users = await loadUsersByPage( state.currentPage - 1 );
    state.currentPage -= 1;
    state.users = users
}

const onUserChanged = (updatedUser) => {

    let wasFound = false;

    state.users = state.users.map( user => {
        if ( user.id === updatedUser.id ) {
            wasFound = true;
            return updatedUser;
        }
        return user;
    });

    if ( state.users.length < 10 && !wasFound ) {
        state.users.push( updatedUser );
    }

}

const reloadPage = async() => {
    const users = await loadUsersByPage( state.currentPage );
    if ( users.length === 0 ) {
        await loadPreviousPage();
        return;
    } 
    
    state.users = users;
}


export default {
    loadrPreviousPage,
    loadNextPage,
    onUserChanged,
    reloadPage,

    getUser: () => [...state.users],
    getCurrentPage: () => state.currentPage
}