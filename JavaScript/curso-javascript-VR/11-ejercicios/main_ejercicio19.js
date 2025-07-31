/*

Ejercicio 19.

Muestra todos los numeros divisores de un numero introducido en un prompt.


*/


let numero = parseInt(prompt("Introduce un numero"));

for (let i = 1; i <= numero; i++) {
    if (numero % i == 0) {
        console.log(i);
    }
}

