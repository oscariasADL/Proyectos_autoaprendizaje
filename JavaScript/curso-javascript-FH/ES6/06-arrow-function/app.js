/* FUNCIONES DE FLECHA */

/*

1. Menos codigo
2. No hay nuevo "this" dentro de las funciones
3. No hay constructores, no tiene new
4. No se puede cambiar elv alor del "this" aunque se use call(), aplply() o bind().
5. No hay objeto "arguments"
6. Nop puede tener nombre de parametros duplicados

*/

// Ejemplo1

var miFuncion2 = function(valor){
    return valor;
}

let miFuncion1 = valor => valor;

console.log( miFuncion2("Oscar") );

console.log( miFuncion1("Eduardo") );


//Ejemplo 2

var sumar2 = function( num1, num2 ){
    return num1 + num2;
}

let sumar1 = (num1, num2) => num1 + num2;


//Ejemplo 3

var saludar2 = function(){
    return "Hola mundo"
}

var saludar1 = () => "Hola mundo"


//Ejemplo 4

console.log("-".repeat(50))

var saludarPersona2 = function(nombre){

    var salida  = "Hola, " + nombre;

    return salida

}

let saludarPersona1 = nombre =>{

    let salida = `Hola, ${nombre}`;

    return salida;

}

console.log( saludarPersona2("Jairo") );
console.log( saludarPersona1("Varela") );


//EJemplo 5

var obtenerLibro = function(id){

    return{
        id:id,
        nombre: "Harry potter"
    }

}

let obtenerLibro2 = id => ({ id:id, nombre: "Harry potter 2" })

console.log( obtenerLibro("50") )
console.log( obtenerLibro2("20") )


// Ejemplo 6 = Funcion anonimna

//ES5
console.log("-".repeat(50))
var saludo1 = function(nombre){

    return "Hola " + nombre

}("Fernando")
console.log(saludo1)


var saludo1flecha = (nombre) => {

    return `Hola ${nombre}`

};
console.log(saludo1flecha("Melisa"))





// OBJETO THIS

console.log("-".repeat(50))
console.log("MANEJADORES")
console.log("-".repeat(50))
var manejador = {

    id: "123",
    init: function(){

        //ES6
        document.addEventListener("click", 
            event => this.clickEnPagina( event.type ));
        
        //ES5
        //document.addEventListener("click", (function(event){
        //    this.clickEnPagina( event.type )
        //}).bind(this), false);

    },
    clickEnPagina: function(type){
        console.log("Manejando" + type + "Para el id: " + this.id)
    }

}

manejador.init();





//FUNCIONES DE FLECHA Y ARREGLOS

var arreglo = [34,54,78,12,576,2,3,5];

//ES5
var ordenado = arreglo.sort( function(a,b){
    return a-b;
});

//ES6

let ordenadoES6 = arreglo.sort( (a,b) => a-b);
console.log( ordenadoES6 )