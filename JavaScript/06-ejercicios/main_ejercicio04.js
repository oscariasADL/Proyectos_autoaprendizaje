/*
Ejercicio 4

Tenemos una jirafa en el zoo que pesa 1.120 kilos.

Y le damos de comer 141 kilos de comida.

¿Cuánto pesará la jirafa después de comer?

*/

let pesoInicial = 1120;
const pesoComida = 141;
let pesoFinal = pesoInicial + pesoComida;
let resultado = `El peso de la jirafa después de comer es de ${pesoFinal} kilos.`;//${} hace interpolacion de variables, es decir, que se pueden poner variables dentro de un string y se concatenan sin hacer uso de +.
//En este caso, se pone el valor de la variable totalCookies dentro del string.

console.log(resultado);