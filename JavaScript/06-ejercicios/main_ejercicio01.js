/*
Ejercicio 1; 

Calcula cuántas horas le llevaria llegar a la luna a una nave espacial y guarda el resultado en una variable.

La distancia desde la tierra hasta la luna es de 384.400 kilometros.

La velocidad de la nave es de 1225 kilometros por hora,

*/


// Variables
let distancia = 384400;
let velocidad = 1225;
let tiempo = distancia / velocidad;

console.warn("El tiempo en horas que tomaria es:" + Math.ceil(tiempo) + " horas");//Math.ceil redondea hacia arriba