/* COOKIES */

function crearCookie( nombre, valor ){

    valor = escape(valor);

    var hoy = new Date();

    document.cookie = nombre + " = " + valor +";";

}


crearCookie("nombre","Oscar")

var cookies = document.cookie;
console.log( cookies )