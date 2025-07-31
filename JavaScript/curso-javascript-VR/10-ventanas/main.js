//ALERTAS

let mensaje = "Hola Mundo";
alert(mensaje);



//CONFIRMACION

let pregunta = confirm("¿Estás seguro de querer salir de esta página?");
console.log(pregunta);



//PROMPTS (INGRESO DE DATOS)
let edad = prompt("¿Qué edad tienes?", 18);
console.log(edad);
console.log(typeof edad); //string
console.log(typeof parseInt(edad)); //number