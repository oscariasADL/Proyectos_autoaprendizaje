/*  
Ejercicio 26:

Dado un array de palabras, cuenta cuatas letras tiene cada palabra y crea un nuevo array que contenga solo esos números.


*/

const palabras = ['Hola', 'mundo', 'esto', 'es', 'JavaScript'];
const longitudes = palabras.map(palabra => palabra.length);
console.log(longitudes); // [4, 5, 4, 2, 10]


//Otra forma de hacerlo es usando una funcion


function contarLetras(array) {

    let resultadoConteo = array.map(elemento => elemento.length);

    return resultadoConteo;

}


const frutas = ['Hola', 'mundo', 'esto', 'es', 'JavaScript'];


console.log(
    contarLetras(frutas)
); 

