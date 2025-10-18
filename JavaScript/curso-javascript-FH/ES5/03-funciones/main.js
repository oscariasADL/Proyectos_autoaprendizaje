/* FUNCIONES BASICAS */
function primeraFuncion(){

    var a = 20;
    console.log(a);

}

function imprimir(nombre, apellido){
    //apellido = apellido || "xxx"

    if( apellido === undefined){
        apellido = "xxx"
    }
    console.log(nombre + apellido)
}

primeraFuncion(); 
imprimir("oscar", " Arias");




/*. FUNCIONES CON OBJETOS ANONIMOS */

function imprimirTwo( persona ){
    console.log(persona.nombre + " " + persona.apellido)
}

imprimirTwo({
    nombre: "Edaurdo",
    apellido: "Peralta"
});




/* FUNCIONES ANONIMAS */


function imprimirThree( funcion ) {
    funcion();
}

imprimirThree( function() {

    console.log("funcion anonima")

});
    