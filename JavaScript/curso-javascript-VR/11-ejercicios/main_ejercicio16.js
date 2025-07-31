/*
Ejercicio 16

Escribe un programa que muestre la tabla de multiplicar de un número
 introducido por teclado, el resultado se mostrará en consola.

*/

let numero = prompt("Introduce un número para mostrar su tabla de multiplicar");

for (let i = 1; i <= 10; i++) {
    console.log(`${numero} x ${i} = ${numero * i}`);
}   