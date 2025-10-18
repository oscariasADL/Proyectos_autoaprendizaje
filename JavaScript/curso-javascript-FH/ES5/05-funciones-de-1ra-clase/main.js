/* FUNCIONES DE PRIMERA CLASE */

function a(){

    console.log("Hola soy la funcion a");

}

a();

a.nombre = "Maria" // Añadi una propiedad con el nombre nombre a la funcion, recordar que las funciones son objetos




/* METODOS Y OBJETO THIS */

/* La propieda this apunta a la propiedad dentro de la funcion u objeto*/

var persona = {
    nombre: "Maria",
    apellido: "Dubon",
    imprimirNombre: function(){
        console.log(`${this.nombre} ${this.apellido}`);
    },
    direccion: {
        pais: "Colombia",
        obtenerPais: function(){
            var self = this;
            console.log(`La direccion es en ${self.pais}`);

            var nuevaDireccion = function(){
                console.log(`La direccion es en ${self.pais}`);
            }
            nuevaDireccion();

        }
    }
}

persona.imprimirNombre();
persona.direccion.obtenerPais();




/* PALABRA RESERVADA NEW */
/* En JavaScript, la palabra clave new se usa para crear una nueva instancia de un objeto a partir de una función constructora o clase, y hace varias cosas de forma automática: */

console.log(" ")
console.log("**********************")
console.log(" ")

function Persona(nombre, apellido, edad){

    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;

    this.imprimirNombre = function(){
        return `${this.nombre} ${this.apellido} ${this.edad}`;
    }

}


var persona1 = new Persona("carlos", "villagran", 45);
var persona2 = new Persona("oscar", "arnoldo", 55);

console.log( persona1.imprimirNombre() );
console.log( persona2.imprimirNombre() );