/*  
Ejercicio 29:

Crea una funcion que reciba una palabra y devuelva cuantas vocales tiene.


*/

function contarVocales(palabra) {
    let contador = 0;
    const vocales = 'aeiouAEIOU';

    for (let i = 0; i < palabra.length; i++) {
        if (vocales.includes(palabra[i])) {
            contador++;
        }
    }

    return contador;
}

let palabra = prompt("Introduce una palabra:");
let cantidadVocales = contarVocales(palabra);
console.log(`La palabra "${palabra}" tiene ${cantidadVocales} vocales.`);

