//Longitud
let nombre = "Oscar Arias";
console.log(nombre.length); // 10



//Conversion a texto
let numero = 1550;
console.log(typeof numero.toString()); // "1550"



//Convertir texto a mayusculas
let web = "www.oscararias.co";
web.toUpperCase(); // "WWW.OSCARARIAS.CO"
console.log(web.toUpperCase()); // "WWW.OSCARARIAS.CO"



//Convertir texto a minusculas
let web2 = "WWW.OSCARARIAS.CO";
web2.toLowerCase(); // "www.oscararias.co"
console.log(web2.toLowerCase()); // "www.oscararias.co"



//Buscar una letra concreta 
let frase = "La vida es un carnaval";
console.log(frase.charAt(4)); // "i"



//Buscar si un texto contiene un texto concreto 
let frase2 = "La vida es un carnaval";
if (frase2.includes("vida")) {
    console.log("La frase contiene la palabra vida"); // "La frase contiene la palabra vida"
}
else {
    console.log("La frase no contiene la palabra vida");
}



//Buscar la primera posicion de una cadena en un texto, devuelve la posicion de la primera letra
let frase3 = "La vida es un carnaval hay que reir";
console.log(frase3.indexOf("carnaval")); // 14



//Extraer una parte de un texto, devuelve la parte del texto que le digamos
let frase4 = "Master en JavaScript";
console.log(frase4.slice(0,6)); // "Master"
console.log(frase4.slice(10)); // "JavaScript" Si no le pasamos el segundo parametro, nos devuelve el resto del texto desde la posicion que le digamos
console.log(frase4.slice(-6)); // "Script" Si le pasamos un numero negativo, nos devuelve el texto desde la posicion que le digamos contando desde el final



//Extraer una parte de un texto, Substring, devuelve la parte del texto que le digamos, pero no acepta numeros negativos
let frase4Substring = "Master en JavaScript";
console.log(frase4Substring.substring(0,6) + " Con substring"); // "Master"
console.log(frase4Substring.substring(10) + " Con substring"); // "JavaScript" Si no le pasamos el segundo parametro, nos devuelve el resto del texto desde la posicion que le digamos



//Reemplazar un texto por otro
let pelicula = "La vida es bella";
console.log(
    pelicula.replace("vida", "muerte")
); // "La muerte es bella"
//Remplazar todas las coincidencias de un texto por otro
console.log(
    pelicula.replaceAll("a", "e")
); // "Le vide es belle"
//Remplazar todas las coincidencias de un texto por otro con una expresion regular
console.log(
    pelicula.replace(/a/g, "e")
); // "Le vide es belle"



//Eliminar espacios al principio y al final de un texto TRIM
let texto = "    eduardo93-12@hotmail.com       ";
console.log(
    texto.trim()
); // "eduardo93-12@hotmail.com"



//Convertir un texto a un array
let texto2 = "Hola soy Oscar";
console.log(
    texto2.split(" ") // ["Hola", "soy", "Oscar"]
); // ["Hola", "soy", "Oscar"]

let texto3 = "manzanas,peras,naranjas,uvas,limones";
console.log(
    texto3.split(",")
);// ["manzanas", "peras", "naranjas", "uvas", "limones"]



//Contatenar textos
let cadena1 = "Hola soy Oscar";
let cadena2 = " y soy programador";
let fraseFinal = "Me presento, " + cadena1 + cadena2;
fraseFinal = `Me presento, ${cadena1}${cadena2}`; // Usando template strings

fraseFinal = " ".concat("Me presento ", cadena1, cadena2); // Usando concat

console.log(fraseFinal); // "Me presento, Hola soy Oscar y soy programador"



//Comienza por un texto y termina por otro
let cadena3 = "Hola soy Oscar y soy programador";
console.log(cadena3.startsWith("Hola")); // true
console.log(cadena3.endsWith("programador")); // true



//Repetir un texto varias veces
let mensajito = "Javascript es el mejor lenguaje del mundo \n";
console.log(
    mensajito.repeat(3) // "Javascript es el mejor lenguaje del mundoJavascript es el mejor lenguaje del mundoJavascript es el mejor lenguaje del mundo"
)



//Buscar textos en un texto Metodos search y match
let miCadena = "Pablito clavín clavó un clavito en la calva de un calvito";
console.log(
    miCadena.search("clavito"), // 20
    // similar a indexOf 
    miCadena.match("clavito"), // ["clavito", index: 20, input: "Pablito clavín clavó un clavito en la calva de un calvito", groups: undefined]
    miCadena.match(/cla/g), // ["cla", "cla", "cla"]

);