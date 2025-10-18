/* SYMBOLS */

let primerNombre = Symbol('Primer Nombre');
let segundoNombre = Symbol();

let persona = {
    [segundoNombre]: "Arias"
}

persona[primerNombre] = 'Oscar'

console.log( persona[primerNombre] )
console.log( persona[segundoNombre] )
console.log( primerNombre )
console.log( segundoNombre )

let simbolo1 = Symbol('simbol');
let simbolo2 = Symbol('simbol');

console.log( simbolo1 == simbolo2 )
console.log( simbolo1 === simbolo2 )
console.log( Object.is(simbolo1, simbolo2) )