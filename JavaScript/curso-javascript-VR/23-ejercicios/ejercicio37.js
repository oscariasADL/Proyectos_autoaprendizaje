/*
Ejercicio 37:

    1. Crea un formulario con estos campos: Nombre, Apellidos y edad
    2. Añade un boton de enviuar y usa el evento submit
    3. Muestra los datos por pantalla cuando termine de enviar el form


*/

const formularioVa = document.querySelector("#formularioEnvio");
const cajaInfo = document.querySelector(".info")

let nombre = document.querySelector("#nombre")
let apellidos = document.querySelector("#apellido")
let edad = document.querySelector("#edad")

let InfoNombre = document.querySelector("#info_nombre strong")
let InfoApellidos = document.querySelector("#info_apellido strong")
let InfoEdad = document.querySelector("#info_edad strong")

formularioVa.addEventListener("submit", (event) => {

    event.preventDefault();

    cajaInfo.classList.add("show")
    InfoNombre.textContent = nombre.value
    InfoApellidos.textContent = apellidos.value
    InfoEdad.textContent = edad.value


});