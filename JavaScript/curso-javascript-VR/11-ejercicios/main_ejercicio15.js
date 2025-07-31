/*
Ejercicio 15

Muestra la suma y la media de los numeros introducidos por el usuario 
hasta que el usuario introduzca un numero negativo y ahi muestra el resultado.


*/

let suma = 0;  // Inicializamos la variable suma a 0
let numero = 0; // Inicializamos la variable media a 0
let contador = 0; // Inicializamos el contador a 0

do {

    numero = prompt("Introduce un numero"); // Pedimos un nuevo numero

    if(isNaN(numero)){ // Si el numero introducido no es un numero
        alert("No has introducido un numero"); // Mostramos un mensaje de error
        numero = 0; // Volvemos a pedir un numero
        continue; // Volvemos a pedir un numero
    }else if(numero >= 0){ // Si el numero introducido es menor que 0
        
        suma += parseInt(numero); // Sumamos el numero introducido a la variable suma
    
        contador ++;
    }
    else{
        break; // Salimos del bucle
    }
    
}while(numero >= 0); // Mientras el numero introducido sea mayor o igual a 0

media = suma / contador; // Calculamos la media
alert("La suma de los numeros introducidos es: " + suma);// Mostramos la suma de los numeros introducidos
alert("La media de los numeros introducidos es: " + (suma / contador));// Mostramos la media de los numeros introducidos