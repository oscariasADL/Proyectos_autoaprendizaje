/* ARREGLOS Y TIPOS DE ARREGLOS */

var arr = [5,4,3,2,1];
console.log ( arr );

console.log("********")

arr.reverse();
console.log(arr);

console.log("********")


/* RECORRER UN ARREGLO CON MAP */
/*.map() es un método de los arrays, no de los objetos. Se usa para transformar cada elemento de un array y devolver un nuevo array con los resultados.*/

arr = arr.map(function(elem){
    elem *= 2;
    return elem;
});
console.log(arr);

console.log("********")

arr = arr.map(function(elem){
    elem *= elem;
    return elem;
});
console.log(arr);

arr = arr.map( Math.sqrt );
console.log(arr);


/* RECORRER UN ARREGLO JOIN*/
/*El método .join() en JavaScript convierte un array en una cadena de texto, uniendo todos sus elementos con un separador que tú defines.*/

arr = arr.join();
console.log(arr);

/* Se puede separar por el caracter que uno quiera por ejemplo |
arr = arr.join("|");
console.log(arr);
*/


/* SEPARAR UNA CADENA Y CONVERTIRLA EN ARREGLO */

arr = arr.split(",");
console.log(arr);


/* AGREGAR NUEVO CAMPO AL ARREGLO */
arr.push("6");
console.log(arr);


/* ELIMINAR EL ULTIMO ELEMENTO DEL ARREGLO */
arr.pop();
console.log(arr);


/* AGREGAR UN ELEMENTO AL INICIO DEL ARREGLO */
arr.unshift("7");
console.log(arr);


/* CONVERTIR ARREGLO A CADENA */

console.log(arr.toString());


/*SPLICE */
/*
.splice() modifica el contenido de un array eliminando, reemplazando o agregando elementos.

array.splice(inicio, cantidadEliminar, elemento1 agregar, elemento2 agregar, ...)

*/

console.log("********")
arr.splice(1,3,"10","20","30");
console.log(arr);


/* SLICE */
/*
.slice() devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin (fin no incluido).

array.slice(inicio, fin)
*/

var arr2 = arr.slice(0,2);
console.log(arr2);