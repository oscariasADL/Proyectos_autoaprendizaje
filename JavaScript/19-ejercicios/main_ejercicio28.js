/*  
Ejercicio 28:

1. Pide al usuario 6 numeros por partido y guardalos en un array.
2. Muestra el array en consola y en el HTML.
3 Ordenalo y muestra el array ordenado en consola y en el HTML.
5. Muestra cuantos elementos tiene el array.
6. Busca uno de los valores del array y muestra su posicion en el array.
7. Refactorea el código para que sea más limpio y legible.

*/


//1. Pide al usuario 6 numeros por partido y guardalos en un array.
let numeros = [];

for(let i = 1; i <= 6; i++){
    let numero = parseInt(prompt("digita el numero " + (i) + ": "));
    if(!isNaN(numero) && numero !== ""){
        numeros.push(numero);
    }
}


//2. Muestra el array en consola y en el HTML.
function mostrarArray(array) {

    console.log(array);
    document.write("<h1>Contenido del array</h1>");
    document.write("<ul>");

    array.forEach(element => {
        document.write("<li>" + element + "</li>");
    });
    document.write("</ul>");

    return array;

}

mostrarArray(numeros);


//3 Ordenalo y muestra el array ordenado en consola y en el HTML.
numeros.sort((a, b) => a - b);// Ordenar el array de menor a mayor

mostrarArray(numeros);


//4. Invertir el array y mostrarlo en consola y en el HTML.
numeros.reverse();// Invertir el array

mostrarArray(numeros);


//5. Muestra cuantos elementos tiene el array.
let cantidadElementos = numeros.length;
console.log("Cantidad de elementos en el array: " + cantidadElementos);


//6. Busca uno de los valores del array y muestra su posicion en el array.
let valorABuscar = parseInt(prompt("¿Qué número quieres buscar?"));
let posicion = numeros.indexOf(valorABuscar);

if( posicion && posicion !== -1){
    console.log("El número " + valorABuscar + " se encuentra en la posición: " + posicion);
}else{
    console.log("El número " + valorABuscar + " no se encuentra en el array.");
}



