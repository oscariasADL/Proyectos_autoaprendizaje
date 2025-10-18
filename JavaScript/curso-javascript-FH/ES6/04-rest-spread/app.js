/* Parametro REST, es indicado por tres puntos (...) seguido del nombre que le asignaremos a dicho parametro */
/* Ese parametro se convierte en un arreglo que contiene el "resto" de los parametros pasados a la funcion, deahi se origina el nombre REST */

/* ES5 */

function agregar_alumno( ){
    
    console.log( arguments);

    for( var i = 1; i < arguments.length; i++){
        arguments[0].push(arguments[i]);
    }

    return arguments[0];
}

var arr_alumnos = ["Juan", "Pedro", "Maria", "Luis"];
var arr_alumnos2 = agregar_alumno(arr_alumnos, "Ana", "Pablo", "Sofia");

console.log(arr_alumnos2);





/* ES6 */

console.log(" ".repeat(20))
console.log("=".repeat(20))
console.log(" ".repeat(20))

function agregar_alumn2( arregloAlumnos, ...alumnos ){
    
    console.log( arguments);

    for( let i = 0; i < alumnos.length; i++){
        arregloAlumnos.push(alumnos[i]);
    }

    return arregloAlumnos;
}

var alumnos_arr = ["Juan", "Pedro", "Maria", "Luis"];
var alumnos_arr2 = agregar_alumn2(alumnos_arr, "Ana", "Pablo", "Sofia");

console.log(alumnos_arr2);




/* SPREAD */

console.log(" ".repeat(20))
console.log("=".repeat(20))
console.log(" ".repeat(20))


let numeros = [1,5,10,6500,100,235,5555]

//var max = Math.max.apply( Math, numeros ); ES5
let max = Math.max( ...numeros )

console.log(max)




/* DIFERENCIAS */

/* En JavaScript, rest y spread son dos conceptos que usan la misma sintaxis (...), pero tienen propósitos diferentes dependiendo del contexto. */

/* 
Concepto	¿Qué hace?	                                                        ¿Dónde se usa?
rest	    Agrupa múltiples elementos en un solo array u objeto	            En parámetros de funciones o destructuración
spread	    Expande un array u objeto en elementos individuales	                Al copiar, combinar o pasar valores 
*/


function saludarRest ( saludo, ...nombres ){

    for ( i in nombres ){
        console.log(` ${saludo} ${nombres[i]} `)
    }

}

function saludarSpread ( saludo, ...nombres ){

    console.log(` ${saludo} ${nombres} `)

}

saludarRest("Hola", "Fernando", "Oscar", "Pepe", "Juan")

let personas = ["melissa", "Hernando", "Juan"]
saludarSpread("Que tal!", personas)