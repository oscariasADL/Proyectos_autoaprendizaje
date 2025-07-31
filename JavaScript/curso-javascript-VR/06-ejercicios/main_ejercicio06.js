/*
Ejercicio 6

En mi tienda de videojuegos tenemos una oferta.

Si compras un juego de $50000 o más, te hacemos un 20% de descuento.

Si un cliente compra el tekken 15 que cuesta $50000 ¿En cuánto le queda?

*/

let precioJuego = 50000;
let descuento = precioJuego * 0.20;;
let precioFinal = precioJuego - descuento;

console.log(`El precio final del juego es de ${precioFinal}`);