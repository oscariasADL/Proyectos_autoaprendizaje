/* EXTENSION DE OBJETOS LITERALES */

//ES5

function crearPersona(nombre, apellido, edad){

    return {
        nombre: nombre,
        apellido: apellido,
        edad: edad
    }

}

let melisa = crearPersona("Melisa","Florez",30)
console.log(melisa)


//ES6 se puede simplificar y tambien funciona


function crearPersonaTwo(nombre, apellido, edad){

    return {
        nombre,
        apellido,
        edad
    }

}

let oscar = crearPersonaTwo("Oscar","Arias",32)
console.log(oscar)





/* METODOS CONSISOS */

//ES5
var persona = {
    nombre: "Oscar",
    getNombre: function(){
        console.log( this.nombre );
    }
}

persona.getNombre();


//ES6 -> es redundante poner function a una prop

var personatwo = {
    nombre: "Oscar",
    getNombre(){
        console.log( this.nombre );
    }
}

personatwo.getNombre();





/* PROPIEDADES COMPUTADAS O PROCESADAS */

console.log("=".repeat(40))

var persona = {};
var apellido = "apellido";

persona["Primer nombre"] = "Oscar"
persona[apellido] = "Arias"

console.log( persona["Primer nombre"] + " " + persona[apellido])


//ES6

var apellidos = "primer apellido"

var personaTwo = {

    "primer noumbre": "Eduardo",
    [ apellidos ] : "Peralta"

}

console.log( personaTwo["primer noumbre"] + " " + personaTwo[apellidos] )