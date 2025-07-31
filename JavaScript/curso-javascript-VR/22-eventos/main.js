//EVENTOS
//Un evento es cualquier acción que ocurre en el navegador que puede ser detectada por JavaScript para ejecutar una función.



//***********
//CLICK

let botonClickeable = document.querySelector("#botonClick");

botonClickeable.addEventListener("click", (event) =>{

    alert("Has hecho click");

    console.log(event);//Es un objeto que contiene informacion sobre lo que ha pasado con ese evento, tiene bastante informacion que podria ser util

});



//***********
//DOBLE CLICK

let botonDblClickeable = document.querySelector("#botonDblClick");

botonDblClickeable.addEventListener("dblclick", () =>{

    alert("Doble click!")

});



//***********
//MOUSEOVER y MOUSEOUT

let areaHover = document.querySelector("#cajaTexto1");

areaHover.addEventListener("mouseover", () => {

    areaHover.style.backgroundColor = "black";

});

//Salir del over
areaHover.addEventListener("mouseout", () => {

    areaHover.style.backgroundColor = "red";

});

//Moverse Dentro del propio elemento
areaHover.addEventListener("mousemove", () => {

    areaHover.style.backgroundColor = "yellow";

});



//***********
//EVENTOS CON EL TECLADO
let campoInputTexto = document.querySelector("#campoTexto");

campoInputTexto.addEventListener("keydown", (event)=>{

    console.log("Has presionado la tecla:" + event.key)

});


//EVENTO CUANDO SUELTO UNA TECLA

campoInputTexto.addEventListener("keyup", (event)=>{

    console.log("Has soltado la tecla:" + event.key)

});


//EVENTO CUANDO MANTIENE UNA TECLA PULSADA
campoInputTexto.addEventListener("keypress", (event)=>{

    console.log("Has soltado la tecla:" + event.key)

});



//***********
//EVENTOS DE FORMULARIO

//EVENTO SUBMIT -> Cuando se envia un formulario

let formularioBase = document.querySelector("#superFormulario")

formularioBase.addEventListener("submit", (event) =>{

    event.preventDefault();//Evita el comportamiento por defecto de los submit y enlaces de recargar la ventana

    let nombre = document.querySelector("#name").value;
    let correo = document.querySelector("#email").value;
    let genero = document.querySelector("#genero").value;

    alert(nombre);
    alert(correo);
    alert(genero);

});


//EVENTO INPUT Y CHANGE -> Input detecta lo que se esta tecleando en el input y change detecta un cambio

let inputNombre = document.querySelector("#name");

inputNombre.addEventListener("input", function(){

    console.log(this.value)//EL THIS NO SE PUEDE USAR CON FUCIONES DE FLECHA

});


let selectGenero = document.querySelector("#genero");

selectGenero.addEventListener("change", () => {

    console.warn("Has cambiado el genero a: " + selectGenero.value);

});


//EVENTO FOCUS Y BLUR -> FOCUS DETECTA CUANDO SE PARA SOBRE EL CAMPO y BLUR SE USA CUANDO SE SALE DEL CAMPO

let campoEmail = document.querySelector("#email");

campoEmail.addEventListener("focus", function(){

    console.log("Acabas de entrar en email")

})



//***********
//EVENTOS DEL DOM Y LA VENTANA


//DETECTAR SI EL DOM ESTA COMPLETAMENTE CARGADO
document.addEventListener("DOMContentLoaded", () => {

    //AQUI PONGO TODO MI CODIGO JS SI QUIERO QUE SE EJECUTE SOLO CUANDO EL DOM ESTA CARGADO

});


//DETECTAR SI LA VENTANA CARGO TODOS LOS RECURSOS O ELEMENTOS NO SOLO EL DOM (TODA LA PAGINA SE CARGO)
window.addEventListener("load", () => {

     //AQUI PONGO TODO MI CODIGO JS SI QUIERO QUE SE EJECUTE SOLO CUANDO EL DOM ESTA CARGADO

});


//DETECTA SI LA VENTANA CAMBIA DE TAMAÑO

window.addEventListener("resize", () => {

    console.log("Ventana redimensionada a: " + window.innerWidth + window.innerHeight)

})


//DETECTA EL SCROLL DE LA VENTANA
window.addEventListener("scroll", () => {

    console.log("Estas en el pixel" + window.screenY)

});


//EVENTOS DEL PORTAPAPELES -> COPIAR = COPY, PASTE, CUT para detectar si copian pegan o cortan

//CAPTURAR EL MENU DEL CLICK DERECHO -> CONTEXTMENU si le paso el evento y le doy event.preventdefault queda bloqueado


//DEJAR DE ESCUCHAR EVENTOS O ELIMINAR UN EVENT LISTENER

let botoncitoTwo = document.querySelector("#botoncito2")

function alertita(){

    alert("Has dado click al boton2");

}

botoncitoTwo.addEventListener("click", alertita);

setTimeout(()=>{

    botoncitoTwo.removeEventListener("click", alertita)// PARA QUE FUNCIONE DEBEMOS ABSTRAERNOS DE LA FUNCION CALLBACK ES DECIR TENER UNA FUNCION SEPARAD

    alert("Ya no puedes usar el boton")

});