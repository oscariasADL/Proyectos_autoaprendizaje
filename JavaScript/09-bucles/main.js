//CICLOS



//-----------------------------------
//CICLO FOR
// Ciclo es una estructura de control que ejecuta un bloque de código 
// varias veces de forma automatica mientras se cumpla una condicion

/*
for (inicializacion; condicion; incremento) {
    // bloque de codigo que se ejecuta repetidamente
}
*/

//Ejemplo 1

let limite = 7;

for (let contador = 0; contador <= limite; contador++) {
    console.log(contador);
}



//-----------------------------------
//CICLO WHILE
// Ciclo es una estructura de control que ejecuta un bloque de código
// mientras se cumpla una condicion 

/*
let contador = 0;
while (condicion) {
    // si se cumple se ejecuta indefinidamente
    contador ++
}
*/

//Ejemplo 2

let year = 2150;
let objetivo = 2177;
let interferencia = 2167;

while (year <= objetivo) {
    console.log("Estamos en el año: " + year);
    if (year === interferencia) {
        console.log("Se ha detectado una interferencia en el año: " + year);
        break;// con el break se corta en bucle en cualquier momento
    }
    year++;
}



//-----------------------------------
//CICLO DO WHILE
// Ciclo es una estructura de control que ejecuta un bloque de código
// el ciclo se ejecuta al menos una vez y luego se repite mientras se cumpla una condicion

/*

do {
    // bloque de codigo que se ejecuta repetidamente
} while (condicion);

*/

//Ejemplo 3

let numeros = 47;

do {    
    console.log("El numero es: " + numeros);
    numeros--;
}while (numeros > 30);