/*
Ejercicio 38:

Valida el formulario del ejercicio anterior, usando el dom y las funciones / metodos que conoces.

El nombre y apellidos deben NO estar vacios

La edad debe no ser menor a 0 y debe ser siempre un numero


*/

const formularioVa = document.querySelector("#formularioEnvio");
const cajaInfo = document.querySelector(".info")

let nombre = document.querySelector("#nombre")
let apellidos = document.querySelector("#apellido")
let edad = document.querySelector("#edad")

let InfoNombre = document.querySelector("#info_nombre strong")
let InfoApellidos = document.querySelector("#info_apellido strong")
let InfoEdad = document.querySelector("#info_edad strong")

let ErrorNombre = document.querySelector("#errorNombre")
let ErrorApellido = document.querySelector("#errorApellido")
let ErrorEdad= document.querySelector("#errorEdad")

formularioVa.addEventListener("submit", (event) => {

    event.preventDefault();

    //Validacion de campos

    if(nombre.value.trim() == null || nombre.value.trim().length == 0){

        ErrorNombre.textContent = "Ingrese un valor valido"

        //TAMBIEN ES VALIDO HACER
        // mensaje = mensaje de errorres
        //document.querySelector("#errorNombre").textContent = mensaje

        return false;
    }else{
         ErrorNombre.style.display = "none";
    }



    cajaInfo.classList.add("show")
    InfoNombre.textContent = nombre.value
    InfoApellidos.textContent = apellidos.value
    InfoEdad.textContent = edad.value


});