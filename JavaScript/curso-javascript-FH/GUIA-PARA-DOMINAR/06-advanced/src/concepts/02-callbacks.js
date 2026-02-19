import { heroes } from "../data/heroes";

/**
 * 
 * @param {HTMLDivElement} element 
 */
 export const callbacksComponent = ( element ) => {

    const id = '5d86371f25a058e5b1c8a65e';

    findHero( id, ( error, hero ) => {
        //Opcion con operador ternario
        //element.innerHTML = hero?.name || `No hay un heroe`;

        if ( error ){
            element.innerHTML = error;
            return;
        }

        element.innerHTML = hero.name;

    });

}

/**
 * 
 * @param {String} id 
 * @param { (error:String|null, hero:Object ) } callback 
 */

const findHero = ( id, callback ) => {

    const hero = heroes.find( hero => hero.id === id );

    if ( !hero ){
        callback(`Hero with id ${ id } not found`, null );
        return;
    }

    callback( null, hero );

}






function obtenerDatos(callback) {
    console.log("Obteniendo datos...");
    setTimeout(() => {
        const datos = { usuario: "Oscar", edad: 25 };
        callback(datos); // Llamamos al callback cuando los datos están listos
    }, 2000);
    console.log("Solicitud enviada.");
}

obtenerDatos((resultado) => {
    console.log("Datos recibidos:", resultado);
});


function procesarPedido( idPedido, callback ) {
    console.log(`Procesando pedido ${ idPedido }...`);
    setTimeout(() => {
        const estado = "completado";
        callback( idPedido, estado );
    }, 3000);
}

procesarPedido( 12345, ( idPedido, estado ) => {
    console.log(`El pedido ${ idPedido } ha sido ${ estado }.`);


    // Segundo pedido (Callback Hell)
    procesarPedido(67890, (idPedido2, estado2) => {
        console.log(`El pedido ${idPedido2} ha sido ${estado2}.`);
        console.log("Gracias por su compra");
    });

});