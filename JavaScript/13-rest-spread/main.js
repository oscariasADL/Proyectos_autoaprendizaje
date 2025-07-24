//Parametros REST(...) nos permite agrupar valores adicionais en un array, es util cuando no sabemos cuantos parametros le pasaremos a una funcion

//PARAMETROS REST

function misPeliculas (pelicula1, pelicula2, ...restoDePeliculas) {
    console.log(pelicula1);
    console.log(pelicula2);
    console.log(restoDePeliculas); //el resto de peliculas se agrupa en un array
}

misPeliculas("Jhon wick", "Avengers", "Batman", "Superman", "Spiderman");
//en el caso de que no sepas cuantas peliculas le vas a pasar a la funcion, puedes usar el operador REST(...) para agruparlas en un array



//OPERADOR SPREAD
//El operador (...)spread  nos permite expandir un array en elementos individuales.

let numeros = [1, 2, 3, 4, 5];
//let masNumeros = [6, 7, 8, 9, 10];


let masNumeros = [numeros, 6, 7, 8, 9, 10];//aqui se agrupan los numeros en un array, pero no se expanden

let masNumerosEx = [...numeros, 6, 7, 8, 9, 10];//aqui se expanden los numeros y se agrupan en un array

console.log(masNumerosEx)




let misPelisFavs = ["Harry Potter", "El Señor de los Anillos"];
misPeliculas(...misPelisFavs, "Iron Man", "Thor", "Capitan America");
//aqui se expanden las peliculas favoritas y se agrupan en un array junto con las otras peliculas