

/**
 * @returns {Object}
 */

const fetchQuote = async () => {
    const response = await fetch('https://dragonball-api.com/api/characters', {
        method: 'GET', // Aquí indicas el tipo de petición
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json(); // Convertimos la respuesta a JSON
    return data;
}




/**
 * 
 * @param {HTMLDivElement} element 
 */

export const DragonBallApp = async( element ) => {

    document.querySelector('#app-title').innerHTML = 'Dragon Ball App';
    const loading = document.querySelector('#loading');

    loading.innerHTML = 'Cargando...';
    const listaPersonaje = document.createElement('ul');
    element.append( listaPersonaje );
    


    const data = await fetchQuote();
    loading.innerHTML = 'Data Cargada';
    const characters = data.items;
    
    console.log( characters );

    characters.forEach( character => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${ character.name }</strong> - 
            <em>${ character.ki }</em>
            <p>${ character.race }</p>
        `;
        listaPersonaje.append( li );
    });

}