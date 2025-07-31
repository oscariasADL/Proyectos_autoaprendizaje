/*  
Ejercicio 25:

Crea un array de ingredientes para una receta absurda.

(como una pizza con chocolate y aceitunas, o un batido de espinacas y helado de fresa)

Muestra la receta completa en una frase divertida


*/

let ingredientes = ["chocolate", "aceitunas", "espinacas", "helado de fresa", "piña", "salmón", "mostaza", "gominolas"];

let frase = `La receta absurda es: ${ingredientes. join(", ")}.`;

document.write(frase + "<br>");