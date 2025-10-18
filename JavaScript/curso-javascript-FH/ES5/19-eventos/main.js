/* EVENTOS */

function evento(arg) {

    console.log("ME DISPARE")
    console.log( arg.keyCode )

}

var objeto = document.querySelector("#objDemo")

objeto.addEventListener("click",evento);