/* ANOTACION DE PUNTO */

var persona = {
    nombre: "Juana",
    apellido: "Herrera",
    edad: 25,
    direccion: {
        pais: "Costa Rica",
        ciudad: "San Jose",
        edificio: {
            nombre: "Edificio Principal",
            telefono: "2222-3333"
        }
    }
}

console.log( persona.direccion.pais )
console.log( persona.direccion )

/* Agregar propiedad a un objeto*/

persona.direccion.zipcode = 11011;

console.log(persona.direccion)

console.log(persona.direccion.edificio.telefono)


/* Capturar en variable lo hace menos largo y complejo de leer*/

var edificio = persona.direccion.edificio;

edificio.noPiso = "8vi piso"

console.log(edificio)




/* ANOTACION DE CORCHETE */
console.log(" ")
console.log("**********************************")
console.log(" ")

var campo = "";

console.log( persona["nombre"])
console.log( persona["direccion"]["pais"])