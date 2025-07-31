// FUNCIONES ANONIMAS

// Es una función que no tiene nombre.
const saludo = function() {
    console.log('Hola desde una función anónima');
};
saludo(); // Llama a la función anónima
// Son utiles cuando se necesita pasar una función como argumento a otra función, o cuando se quiere crear una función de forma rápida sin necesidad de nombrarla.




//FUNCIONES DE CALLBACK
// Son funciones que se pasan como parametro de otra función y se ejecutan en un momento posterior. Son útiles para manejar eventos o para realizar operaciones asíncronas.

setTimeout(function() {//SetInterval ejecuta una función cada cierto tiempo, en este caso cada segundo.
    console.log('Hola desde una función anónima en setInterval');
}, 1000);  // Llama a la función anónima cada segundo


setTimeout(saludo, 1000); // Llama a la función saludo cada segundo

// Si las funciones anonimas tienen parametros, se pueden pasar como argumentos a la función que las llama. Por ejemplo, si queremos pasar un nombre a la función saludo, podemos hacerlo de la siguiente manera:
const saludoDos = function(nombre) {
    console.log(`Hola hola hola ${nombre}`);
};
setTimeout(function() {
    saludoDos('Juanito');
}, 1000);




//FUNCIONES DE CALLBACK AVANZADAS

function restame(numero1, numero2, mostrar, multiplicar){

    let resta = numero1 - numero2;

    mostrar(resta);
    multiplicar(resta);

    return resta;

}

restame(20, 5, function(resultado){
    console.log(`La resta es: ${resultado}`);
},
function(resultado){
    console.log(`La multiplicacion es: ${resultado * 3}`);
});


//Ejemplo 2

function convertirGrados(grados, mostrarCallback, transformarCallback){
    let convertir = transformarCallback(grados);
    mostrarCallback(convertir);
    return convertir;
}

convertirGrados(30, function(resultado){
    console.log(`La temperatura es: ${resultado}`);
},
function(transformar){

    operacion = transformar * 1.8 + 32; // Convierte de Celsius a Fahrenheit
    return (operacion); // Convierte de Celsius a Fahrenheit

});




//AMBITOS DE LAS FUNCIONES SCOPE
// Las funciones pueden tener diferentes ambitos, dependiendo de donde se declaren y como se llamen. Los ambitos son los siguientes: 
// 1. Ambito global: Las variables y funciones declaradas en el ambito global son accesibles desde cualquier parte del codigo. Se declaran fuera de cualquier funcion o bloque.
// 2. Ambito local: Las variables y funciones declaradas dentro de una funcion son accesibles solo dentro de esa funcion. Se declaran dentro de una funcion o bloque.

let tipoAmbito = 'Ambito global'; // Variable global
function mostrarAmbito() {
    // Funcion global
    console.warn(`Hola ${tipoAmbito}`); // Accede a la variable global

    let nombre = 'Juanito'; // Variable local
    console.warn(`Hola ${nombre}`); // Accede a la variable local
}
mostrarAmbito(); // Llama a la funcion global  
console.warn(`Hola ${tipoAmbito} desde afuera`);
//console.warn(`Hola ${nombre} desde afuera`); // No se puede acceder a la variable local desde afuera de la funcion, amenenos que se devuelva como resultado de la funcion.


// 3. Ambito de bloque: Las variables y funciones declaradas dentro de un bloque (por ejemplo, dentro de un if o un for) son accesibles solo dentro de ese bloque. Se declaran dentro de un bloque.
// 4. Ambito de funcion: Las variables y funciones declaradas dentro de una funcion son accesibles solo dentro de esa funcion. Se declaran dentro de una funcion.
// 5. Ambito de objeto: Las variables y funciones declaradas dentro de un objeto son accesibles solo dentro de ese objeto. Se declaran dentro de un objeto.
// 6. Ambito de clase: Las variables y funciones declaradas dentro de una clase son accesibles solo dentro de esa clase. Se declaran dentro de una clase.
// 7. Ambito de modulo: Las variables y funciones declaradas dentro de un modulo son accesibles solo dentro de ese modulo. Se declaran dentro de un modulo.




// HOISTING O LEVANTAMIENTO DE FUNCIONES
// El hoisting es un comportamiento de JavaScript que permite llamar a funciones antes de haberlas declarado. Esto se debe a que las funciones son elevadas al inicio del ambito en el que se declaran.

//Ejemplo de hoisting:
saludar(); // Llama a la funcion saludar antes de haberla declarado
function saludar() {
    console.log('Hola desde la funcion saludar');
}




// FUNCIONES DE FLECHA
// Son una forma mas abreviada de escribir funciones en JavaScript. Se declaran con la sintaxis => y no tienen su propio this, lo que significa que heredan el this del ambito en el que se declaran. Son utiles para escribir funciones de una sola linea o para funciones anonimas.

// Ejemplo de funcion de flecha: Definir la funcion

let NuevoCurso = () => {
    console.log('Hola desde la funcion de flecha');
};

NuevoCurso(); // Llama a la funcion de flecha   

//Utilizar en un callback
setTimeout(() => {
    console.log('Hola desde la funcion de flecha en setTimeout');
}, 2000); // Llama a la funcion de flecha cada segundo



// Funciones de orden superior
// Funciones recursivas
// Funciones puras e impuras
// Funciones generadoras
// Funciones callback
// Funciones asíncronas
// Funciones de primera clase
// Funciones de segunda clase
// Funciones de tercera clase
