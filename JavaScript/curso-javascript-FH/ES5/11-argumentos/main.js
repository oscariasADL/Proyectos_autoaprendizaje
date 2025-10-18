/* ARGUMENTS */
/* arguments es un objeto especial disponible dentro de las funciones tradicionales (no flechas () => {}), que contiene todos los valores pasados como argumentos, sin importar si los declaras explícitamente como parámetros.*/

var arguments = 10;

function miFuncion() {
    console.log(arguments);
}

miFuncion(10,20,30,40);


/* SOBRE CARGA DE OPERADORES */
/* Funciona cuando se declara una funcion a la que se le deben pasar un argumento pero no se le envia nada */

function crearProducto(nombre, precio){

    nombre = nombre || "sin nombre";
    precio = precio || 0;

    console.log( "Producto:", nombre, "Precio: ", precio );

}

function crearProducto100(nombre){
    crearProducto(nombre, 100)
}

function crearProductoCamisa( precio ){
    crearProducto("Camisa", precio)
}


crearProducto();
crearProducto100("Corrector")
crearProductoCamisa(75)