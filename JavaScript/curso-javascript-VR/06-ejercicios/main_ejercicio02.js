/*
Ejercicio 2

Tenemos 7 cajas con 8 cookies rellenas de chocolate cada una.

¿Cuántas cookies hay en total?
*/  

let cajas = 7;
const cookies = 8;
let totalCookies = cajas * cookies;

console.log(`Hay ${totalCookies} cookies en total.`);//${} hace interpolacion de variables, es decir, que se pueden poner variables dentro de un string y se concatenan sin hacer uso de +.
//En este caso, se pone el valor de la variable totalCookies dentro del string.