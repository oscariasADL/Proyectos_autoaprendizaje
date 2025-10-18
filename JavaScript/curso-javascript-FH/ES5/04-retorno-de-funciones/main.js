/* RETORNAR EN FUNCIONES */

function obtenerAleatorio(){
    return Math.random();
}
console.log(obtenerAleatorio());



function obtenerNombre(){
    return "Juan"
}
console.log(obtenerNombre() + " Perez");



function booleanoNumero(){
    if( obtenerAleatorio() > 0.5){
        return true;
    }else{
        return false;
    }
}
console.log(booleanoNumero());

if( booleanoNumero() ){
    console.log("Es mayor a 0.5")
}else{
    console.log("No es mayor a 0.5")
}



function crearPersona(obtenerNombre, obtenerApellido){

    return{
        nombre: obtenerNombre,
        apellido: obtenerApellido
    }
}

var persona = crearPersona("Juan", "Perez");
console.log(persona.nombre + " " + persona.apellido);



function creaFuncion(){

    return function( nombre ){
        console.log("Me crearon " + nombre);
    }

}

var nuevaFuncion = creaFuncion();;
nuevaFuncion(persona.nombre);