import './render-table.css';
import usersStore from "../../store/users-store";
import { showModal } from '../render-modal/render-modal';
import { deleteUserById } from '../../use-cases/delete-user-by-id'

let table;

const createTable = () => {
    const table = document.createElement( 'table' );
    const tableHeaders = document.createElement( 'thead' );
    const tableBody = document.createElement( 'tbody' );

    tableHeaders.innerHTML = `
        <tr>
            <th>#Id</th>
            <th>Balance</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;

    table.append( tableHeaders, tableBody );
    return table;
}

const tableSelectListener = (event) => {
    const element = event.target.closest('.select-user');
    if ( !element ) return;

    const id = element.getAttribute('data-id');
    showModal(id);
}

const tableDeleteListener = async(event) => {
    const element = event.target.closest('.delete-user');
    if ( !element ) return;

    const id = element.getAttribute('data-id');
    try {
        await deleteUserById(id);
        await usersStore.reloadPage();
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();
        
    } catch (error) {
        console.log(error);
        alert('No se pudo eliminar');
    }

}

export const renderTable = ( element ) => {
    const users = usersStore.getUser();
    if( !table ) {
        table = createTable();
        element.append(table)

        table.addEventListener('click', tableSelectListener );
        table.addEventListener('click', tableDeleteListener );
    }

    let tableHtml = '';
    users.forEach( user => {
        tableHtml += `
            <tr>
                <td>${ user.id }</td>
                <td>${ user.balance }</td>
                <td>${ user.firstName }</td>
                <td>${ user.lastName }</td>
                <td>${ user.isActive}</td>
                <td>
                    <button class="select-user btn btn-success btn-sm" data-id="${ user.id }">Seleccionar</button>
                    <button class="delete-user btn btn-danger btn-sm" data-id="${ user.id }">Eliminar</button>
                </td>
            </tr>
        `;
    })

    table.querySelector('tbody').innerHTML = tableHtml;

}