//PROMESAS
// Una promesa es un objeto que representa la finalización o el fracaso de una operación asíncrona.
// Las promesas tienen tres estados: pendiente, resuelta y rechazada.
// Una promesa se crea con el constructor Promise y recibe una función que toma dos parámetros: resolve y reject.
// Una analogía para entender las promesas es pensar en un pedido de comida a domicilio.

let miPromesa= new Promise((resolve, reject) => {

    let correcto = true; // Simulamos si la operación fue exitosa o no

    if (correcto) {
        resolve("¡La operación fue exitosa!"); // Resolvemos la promesa
    } else {
        reject("¡La operación falló!"); // Rechazamos la promesa
    }

});

miPromesa
    .then(resultado => {
        alert(resultado);
    })
    .catch(error => {
        alert(error);
    });



// PROMESAS ENCADENADAS
// Podemos encadenar promesas para realizar operaciones secuenciales.

function servirPizza (){
    //15
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Pizza servida");
        }, 15000);
    })

}

function servirHamburguesa (){
    //8
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Hamburguesa servida");
        }, 8000);
    })
}

function servirLasaña (){
    //12
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Lasaña servida");
        }, 12000);
    })
}

servirPizza()
    .then(resultado1 => {
        console.log(resultado1);
        // Aquí podemos encadenar otra promesa
        return servirHamburguesa();
    })
    .then(resultado2 => {
        console.log(resultado2);
        // Aquí podemos encadenar otra promesa
        return servirLasaña();
    })
    .then(resultado3 => {
        console.log(resultado3);
    })
    .catch(error => {
        console.error(error);
    });


// PROMESAS CON ASYNC/AWAIT
// Async/Await es una forma más sencilla de trabajar con promesas, permitiendo escribir código asíncrono de manera más legible y similar al código síncrono.

async function servirComida() {
    try {
        const resultado1 = await servirPizza();
        console.log(resultado1);

        //Prueba de errores personalizada
        if (resultado1 != "Pizzeta") {
            throw new Error("Error: No se ha servido la pizza correctamente.");
        }

        const resultado2 = await servirHamburguesa();
        console.log(resultado2);

        const resultado3 = await servirLasaña();
        console.log(resultado3);
        
    } catch (error) {
        console.error(error);
    }
}

servirComida();