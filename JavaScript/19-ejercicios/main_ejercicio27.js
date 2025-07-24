/*  
Ejercicio 27:

Crea un array de personaes de personajes de peliculas y clasificalos en grupos (heroes, villanos, secundarios)

Muestra mensaje para cada grupo


*/
let personajes = [
    "H:Batman", 
    "H:Superman", 
    "M:Joker", 
    "M:Harley Quinn", 
    "H:Robin", 
    "H:Catwoman", 
    "M:Lex Luthor",
    "M:Penguin"
]

let heroes = personajes.filter(personaje => personaje.startsWith("H"));
let villanos = personajes.filter(personaje => personaje.startsWith("M"));

console.log("Heroes:" + heroes.join(", "));
console.log("Villanos:" + villanos.join(", "));


console.log("****************");
console.log("Heroes:")

heroes.forEach(heroe => {
    console.log(heroe.split(":")[1]);

})

console.log("Villanos:")

villanos.forEach(villano => {
    console.log(villano.slice(2));

})