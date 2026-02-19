import { User } from "../models/user.js";

export const localhostUserToModel = ( localhostUser ) => {

    const {
        avatar,
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name
    } = localhostUser;

    return new User({
        id,
        isActive,
        balance,
        avatar,
        firstName: first_name,
        lastName: last_name,
        gender
    });

}