/* FOR IN */

var Persona = function(){
    this.nombre = "Juan";
    this.apellido = "Pineda";
    this.edad = 18;
}

var juan = new Persona();

Persona.prototype.direccion = "San jose";


for( prop in juan ){

    if( !juan.hasOwnProperty( prop )  )
        continue;

    console.log( prop, ": ", juan[prop] )

}