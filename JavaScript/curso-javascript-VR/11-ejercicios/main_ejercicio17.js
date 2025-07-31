/*
Ejercicio 17

Mostrar todos los numeros impares que hay entre dos numeros introducidos por el usuario

*/

let numero1 = parseInt(prompt("Introduce el primer numero", 0));
let numero2 = parseInt(prompt("Introduce el segundo numero", 0));

for (let i = numero1; i <= numero2; i++) {
    if (i % 2 != 0) {
        console.log(`El numero ${i} es impar`);
    }
}

/*

El mismo ehercicio con while

while (numero1 <= numero2) {
    if (numero1 % 2 != 0) {
        console.log(`El numero ${numero1} es impar`);
    }
    numero1++;
}

*/