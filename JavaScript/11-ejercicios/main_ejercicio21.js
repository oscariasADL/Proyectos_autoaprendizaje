/*

Ejercicio 21.

Calculadora:
- Pida dos números por pantalla.
- Si metemos uno mal que nos vuelva a pedir.
- En una alerta y por consola el resultado de sumar, restar, multiplicar y dividir esas dos cifras. 



*/

let numero1= parseInt(prompt("Introduce el primer número", 0));
let numero2= parseInt(prompt("Introduce el segundo número", 0));

while(isNaN(numero1) || isNaN(numero2)){
    numero1= parseInt(prompt("Introduce el primer número", 0));
    numero2= parseInt(prompt("Introduce el segundo número", 0));
}

let resultado= `
La suma es: ${numero1+numero2}
La resta es: ${numero1-numero2}
La multiplicación es: ${numero1*numero2}
La división es: ${numero1/numero2}
`;



alert(resultado);
console.log(resultado);