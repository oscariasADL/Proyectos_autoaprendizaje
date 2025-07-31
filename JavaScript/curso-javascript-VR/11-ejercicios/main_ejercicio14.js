/*
Ejercicio 14

Un DJ no sabe que genero musical poner

Preguntale al usuario que genero quiere (Pop, Rock, Jazz) 

y dependiendo de lo que elija deberás mostrar un mensaje diferente

*/

let genero = prompt("¿Qué genero musical quieres escuchar? (Pop, Rock, Jazz)");

switch (genero) {
    case "Pop":
        console.log("¡Vamos a escuchar música Pop!");
        break;
    case "Rock":
        console.log("¡Vamos a escuchar música Rock!");
        break;
    case "Jazz":
        console.log("¡Vamos a escuchar música Jazz!");
        break;
    default:
        console.log("No has elegido un genero musical válido");
        break;
}
