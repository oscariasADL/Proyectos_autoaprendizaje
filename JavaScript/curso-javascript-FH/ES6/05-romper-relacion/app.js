/* Romper la relacion entre objetos por referencia */

let persona1 = {
    nombre: 'Oscar',
    edad: 33
}

let persona2= { ...persona1 } //Evita que al cambiar un valor en persona 2 siga manteniendo el de persona 1

persona2.nombre = 'Juan'

console.log(persona1)
console.log(persona2)




/* Añadir propiedades a objetos a partir de otros objetos */

console.log("=".repeat(30))

let sujeto1 = {
    nombre: 'Oscar',
    edad: 33
}

let sujeto2 = {
    nombre: 'Juan',
    edad: 24,
    direccion: 'Calle 71',
    conduce: true,
    vehiculo: true,
    vegetariano: false,
    casado:true
};

/* Forma convencional
sujeto1.direccion = sujeto2.direccion;
sujeto2.direccion = 'Barrio alcazares'
*/

sujeto1 = {
    ...sujeto2,
    ...sujeto1 //Mantiene las propiedades de sujeto 1 y le añade la de sujeto 2
}


console.log(sujeto1)
console.log(sujeto2)