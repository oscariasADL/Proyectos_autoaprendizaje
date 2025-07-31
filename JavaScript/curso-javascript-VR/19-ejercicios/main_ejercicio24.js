/*
Ejercicio 24:

Crea un array con 10 numeros aleatorios entre 1 y 100.
Luego pide al usuario que adivine un numero.

Si acierta, muestra un mensaje de "acertaste".
Si no acierta, muestra un mensaje de "no acertaste" y el numero correcto.

*/

let numeros = [11,23,45,67,89,12,34,56,78,90];
//let numeroAleatorio = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
//console.log(numeroAleatorio);

let seleccion = prompt("¿Cual es el numero?");

if (numeros.includes(parseInt(seleccion))) {
    alert("Acertaste el numero");
}else {
    alert("No acertaste");
}