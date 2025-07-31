/*
Ejercicio 8

Tengo una heladeria y cada bola de helado vale 1800 pesos.

¿Cuanto cuestan los conos de 1, 2 y 3 bolas de helado?

Ten en cuenta que el barquillo cuesta 300 pesos.

*/

const precioBola = 1800;

let precioCono1 = precioBola + 300;
let precioCono2 = precioBola * 2 + 300;
let precioCono3 = precioBola * 3 + 300;

console.log(`
    El precio de un cono de 1 bola es de ${precioCono1} pesos.
    El precio de un cono de 2 bolas es de ${precioCono2} pesos.
    El precio de un cono de 3 bolas es de ${precioCono3} pesos.
    
`);
