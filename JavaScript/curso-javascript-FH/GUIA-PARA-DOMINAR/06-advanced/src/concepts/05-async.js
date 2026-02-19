import { heroes } from "../data/heroes";

/**
 * 
 * @param {HTMLDivElement} element 
 */
 export const asyncComponent = ( element ) => {

    const id1 = '5d86371fd55e2e2a30fe1ccb';
    console.log('Start asyncComponent');
    
    findHero(id1)
        .then( hero => element.innerHTML = hero.name )
        .catch( err => element.innerHTML = err );

}

const findHero = async(id) => {
    const hero = heroes.find( hero => hero.id === id );
    if (!hero) throw new Error(`Hero with id ${id} not found`);
    return hero;
}