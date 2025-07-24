/*
Ejercicio 18

Tenemos una colección de numeros desde el 1 al 17.

Y el usuario tiene que adivinar cual es el elegido

Haz un programa para que pueda adivinar el numero

*/

const numeroAdivinar = 7;

let intento;

while( intento !== numeroAdivinar ) {
    intento = parseInt(prompt('Adivina el número del 1 al 17'));

    if( intento === numeroAdivinar ) {
        alert('¡Felicidades! Adivinaste el número');
    } else {
        alert('Intenta de nuevo');
    }
};