/* COOKIES */

var carro = {

    color: "Blanco",
    marca: "Mazda",
    imprmir: function(){
        var salida = this.marca + " - " + this.color
        return salida;
    }

}

console.log( carro.imprmir() );

var logCarro = function( arg1, arg2 ){

    console.log("================================")
    console.log( "Carro: ", this.imprmir() );//Aca el this apunta al objeto global window y no encuentra funcion imprimir
    console.log( "Argumentos: ", arg1, arg2 );

}

var logModeloCarro = logCarro.bind( carro );//Aca el bind altera adonde apunta el this, en este caso cambia el objeto global a objeto carro

logModeloCarro( "abc", "xyz" )


/* Otra forma de hacerlo es un el Call */

logModeloCarro.call( carro, "123", "456" );//El primer parametro es adonde queremos que apunte el this y seguido los parametros



/* EL aply es igual pero se pasan los parametros como arreglo cuando no se sabe la cantidad de argumentos */
/* Sirve para funciones prestadas */





/* CONDICIONES AVANZADAS */

var a = 80;
var b = 20;

var c = ( a > b ) ? function(){

    console.log("A es mayor que B");
    return a;

}() : function(){

    console.log("B es mayor que A");
    return b;  
}();

console.log(c)
console.log("================================")

function getNombre( nombre ){

    var nomb = nombre || "<Sin Nombre>" //Determina si el valor es nulo o undefined toma el sin nombre

    console.log( nomb );

};

getNombre();