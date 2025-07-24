//Array es una estructura de datos que permite almacenar una coleccion de elementos

let nombres = ["Juan", "Pedro", "Maria", "Jose", "Luis"];//El indice de un array empieza en 0

console.log(nombres); //["Juan", "Pedro", "Maria", "Jose", "Luis"]
console.log(nombres[0]); //Acceder a los elementos del array
console.log(nombres[3]); //Acceder a los elementos del array
console.log(nombres.length); //5

let peliculas = new Array("Iron man", "El padrino");//Otra forma de crear un array
console.log(peliculas.length)
console.log(peliculas[0]); 


//Modificar un elemento del array
nombres[3] = "Carlos"; //Modificar el primer elemento del array
console.log(nombres[3]);


//Ejercicio Practico
let elemento = parseInt(prompt("Que usuario quieres", 0));
if (elemento >= 0 && elemento < nombres.length) {
    console.log(nombres[elemento]);
} else {
    console.log("No existe el usuario");
}