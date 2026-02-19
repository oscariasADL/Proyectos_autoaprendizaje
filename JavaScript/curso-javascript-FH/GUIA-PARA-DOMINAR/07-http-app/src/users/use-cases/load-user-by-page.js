import { localhostUserToModel } from "../mappers/localhost-user.mapper.js";

export const loadUsersByPage = async( page = 1 ) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
    const response = await fetch( url );
    const data = await response.json();

    const users = data.data.map( userLike => localhostUserToModel( userLike ) );

    return users;

}