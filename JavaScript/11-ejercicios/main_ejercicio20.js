/*

Ejercicio 20.

En base a un numero que nos de un usario.

Decirle si es par o impar.

*/

let numero = parseInt(prompt("Introduce un numero"));


while (isNaN(numero)) {
    numero = parseInt(prompt("Introduce un numero"));
}   

if (numero % 2 == 0) {
    console.log(`El numero ${numero} es par`);
} else {        
    console.log(`El numero ${numero} es impar`);
}   