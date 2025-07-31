/*  
Ejercicio 30:

Crea una funcion que reciba un numero y devuelva su factorial.
El factorial de un numero es el resultado de multiplicar todos los numeros enteros positivos desde 1 hasta ese numero.


*/


function factorial(numero){

    if (numero < 0) return undefined; // El factorial no está definido para números negativos
    if (numero === 0 || numero === 1) return 1; // El factorial de 0 y 1 es 1

    let resultado = 1;
    for (let i = 2; i <= numero; i++) {
        resultado *= i;
    }
    return resultado;

}

let numero = parseInt(prompt("Introduce un número para calcular su factorial: "));
let resultado = factorial(numero);




if (resultado === undefined) {
    console.log("El factorial no está definido para números negativos.");
} else {
    console.log(`El factorial de ${numero} es: ${resultado}`);
}