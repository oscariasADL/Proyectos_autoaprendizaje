/* FOR OF */

/* ¿Qué hace for...of? Permite iterar directamente sobre los valores de una colección iterable, sin preocuparte por los índices. */

/* SINTAXIS */

/*

for (const elemento of iterable) {
  // código que usa 'elemento'
}

*/


const frutas = ["manzana", "banana", "kiwi"];

for (const fruta of frutas) {
  console.log(fruta);
}

console.log("=".repeat(10))

const palabra = "Oscar";

for (const letra of palabra) {
  console.log(letra);
}


/* RECORRER UN MAPA */

const mapa = new Map([
  ["nombre", "Oscar"],
  ["edad", 31]
]);

for (const [clave, valor] of mapa) {
  console.log(`Clave: ${clave}, Valor: ${valor}`);
}



/* RECORRER UN SET */


const conjunto = new Set([1, 2, 3]);

for (const numero of conjunto) {
  console.log(numero);
}
