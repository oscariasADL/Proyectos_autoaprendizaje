let frameworks = ["Anguklar", "React", "Vue", "Svelte", "Astro", "NodeJS", "Express", "Django", "Flask", "Spring", "Laravel", "Ruby on Rails"];

// Acceso manual 
//console.log(frameworks[0]); // Angular
//console.log(frameworks[1]); // React
//etc...

// Acceso con bucles For
for(let i = 0; i<frameworks.length; i++){
    console.log(frameworks[i]);
}

// Mostrar por pantalla
document.write("<ul>");
for(let i = 0; i<frameworks.length; i++){
    document.write("<li>"+frameworks[i] + "</li>");//document wrtite es una funcion de javascript que permite escribir en el html y esta funcion no es recomendable usarla en produccion, pero es util para aprender y hacer pruebas.
}
document.write("</ul>");
console.log("***************************");



// BUCLES PARA RECORRER ARRAYS

let actores = ["Brad Pitt", "Angelina Jolie", "Tom Cruise", "Nicole Kidman", "Robert Downey Jr.", "Chris Evans", "Scarlett Johansson", "Chris Hemsworth", "Mark Ruffalo", "Tom Hiddleston"];

console.log("Listado de actores:");



//Bucle For

for(let contador = 0; contador < actores.length; contador++){
    //console.log(actores[contador]);
}



// Bucle For OF -> Recorre directamente el array sin necesidad de usar un contador, es decir, no es necesario usar la variable contador para acceder a los elementos del array. Esta diseñado para recorrer arrays y objetos.

for(let actor of actores){
    console.log(actor);
}
// cada vez que se itera el bucle, la variable actor toma el valor de cada uno de los elementos del array actores. Por lo tanto, no es necesario usar un contador para acceder a los elementos del array.



// Bucle For IN -> Recorre el array y devuelve el indice de cada uno de los elementos del array. Es decir, devuelve la posicion de cada uno de los elementos del array. Este bucle es menos utilizado que el bucle For OF, ya que no es necesario conocer la posicion de los elementos del array para recorrerlo.
for(let indice in actores){
    console.log(indice + " - " + actores[indice]);
}// cada vez que se itera el bucle, la variable indice toma el valor de cada uno de los indices del array actores. Por lo tanto, es necesario usar la variable indice para acceder a los elementos del array.
console.log("***************************");



//Bucle forEach -> Recorre el array y devuelve el elemento de cada uno de los elementos del array. Es decir, devuelve el valor de cada uno de los elementos del array. Este bucle es menos utilizado que el bucle For OF, ya que no es necesario conocer la posicion de los elementos del array para recorrerlo. Este bucle es una funcion que se aplica a los arrays y recibe como parametro una funcion que se ejecuta por cada uno de los elementos del array.

/* Forma normal de usar el forEach
array.forEach(element => {
    
});*/

actores.forEach(function(actor, indice){
    console.log(indice + " - " + actor);
});
console.log("***************************");

//Otra forma de usar el forEach es usando una funcion flecha, que es una forma mas corta de escribir funciones en javascript. Esta forma es la mas utilizada en la actualidad, ya que es mas legible y menos verbosa.
actores.forEach((actor, indice) => {
    console.log(indice + " - " + actor);
});
console.log("***************************");

//Simplicar mas el forEach, ya que no es necesario usar el indice para acceder a los elementos del array. Por lo tanto, se puede omitir el indice y solo usar el actor.
actores.forEach(actor => {
    console.log(actor);
});
console.log("***************************");
console.log("***********MAP****************");



//Bucle Map -> Recorre el array y devuelve un nuevo array con los resultados de la funcion que se le pasa como parametro. Es decir, devuelve un nuevo array con los resultados de la funcion que se le pasa como parametro. Este bucle es muy utilizado para transformar arrays, ya que permite aplicar una funcion a cada uno de los elementos del array y devolver un nuevo array con los resultados de la funcion. Este bucle es una funcion que se aplica a los arrays y recibe como parametro una funcion que se ejecuta por cada uno de los elementos del array.
actores.map(actor => {
    console.log(actor);
});
console.log("***************************");

//Devolver un nuevo array con los resultados de la funcion.
let nuevosActores = actores.map(actor => {
    //console.log(actor);

    return actor + "es un gran actor";
});
console.log(nuevosActores);
console.log("***************************");
console.log("********MULTIDIMENSIONALES*******************");



//ARRAYS MULTIDIMENSIONALES -> Son arrays que contienen otros arrays dentro de ellos. Es decir, son arrays que contienen otros arrays como elementos. Estos arrays son muy utilizados para representar matrices o tablas de datos, ya que permiten almacenar datos en filas y columnas. Estos arrays son muy utilizados en la actualidad, ya que permiten almacenar datos de forma estructurada y facilitan el acceso a los datos.

let categorias = ["lucha"," Deportes", "Accion", "Rol", "Fantasia", "Carreras"];
let titulos = ["Street Fighter", "Fifa", "Call of Duty", "Final Fantasy", "World of Warcraft", "Need for Speed"];

let videojuegos = [categorias, titulos];
console.log(videojuegos);

//Acceder a los elementos del array multidimensional
console.log(videojuegos[1][2]); //Call of Duty
console.log(videojuegos[0][3]); //Rol
console.log("***************************");
console.log("********BIDIMENSIONALES*******************");



//ARRAYS BIDIMENSIONALES

let tabla = [
    ["Producto", "Precio", "Cantidad"],
    ["Cerveza", 1.5, 10],
    ["Vino", 2.5, 5],
    ["Agua", 0.5, 20],
    ["Refresco", 1, 15],
    ["Cafe", 1.2, 8]
];
console.log(tabla[1][0], tabla[1][1]); //1
console.table(tabla)
console.log("***************************");

//Recorrer el array bidimensional con un bucle ForEach
tabla.forEach((fila, indice) => {
    console.log("Fila " + indice + ": " + fila.join(" - ")); //join es una funcion que se aplica a los arrays y devuelve un string con los elementos del array separados por el separador que se le pasa como parametro. En este caso, se le pasa como parametro el separador " - ". Por lo tanto, se devuelve un string con los elementos del array separados por " - ". 
});
console.log("***************************");

//Recorrer el array bidimensional con dos bucles ForEach

document.write("<table border=1>");
tabla.forEach((fila, indice) => {
    document.write("<tr>");
    fila.forEach(elemento => {
        if(indice === 0){
            document.write("<th>"+elemento+"</th>");
        }else{
            document.write("<td>"+elemento+"</td>");
        }
    });
    document.write("</tr>");
});
document.write("</table'>");



// ARRAYS TRIDIMENSIONALES
let cartaRestaurante = [
    ["Plato", "Cantidad", "Precio", "Tamaño"],
    ["Pizza", 1, [8,10,15], ["Pequeño", "Mediano", "Grande"]],
    ["Hamburguesa", 5, [5,7,10], ["Pequeño", "Mediano", "Grande"]],
    ["Ensalada", 1, [4,6,8], ["Pequeño", "Mediano", "Grande"]],
    ["Pasta", 6, [6,8,12], ["Pequeño", "Mediano", "Grande"]],
    ["Sopa", 1, [3,5,7], ["Pequeño", "Mediano", "Grande"]]
];

for ( let menu of cartaRestaurante){

    for( let fila of menu){
        

        if(Array.isArray(fila)){

            for(elemento of fila){
                console.log(elemento);
            }
        }else{
            console.log(fila);
        }
    }

    //

};