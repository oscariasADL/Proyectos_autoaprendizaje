/* MAPS */

/* Nuevo tipo de coleccion de datos que por mucho tiempo fue necesario en JavaScript */

/* Es una coleccion de datos que tiene una llave y que tiene un valor */


/*

LLAVE           VALOR

nombre          Oscar
edad            31

*/

let mapa = new Map();

mapa.set( "nombre", "Oscar" )
mapa.set( "edad", "31" )

console.log( mapa );
console.log ( mapa.size )

console.log("=".repeat(10))
console.log( mapa.get( "nombre" ) );
console.log( mapa.get( "edad" ) );
console.log( mapa.has( "nombre" ) );
console.log( mapa.has( "apellido" ) );

mapa.delete("nombre")
console.log( mapa.has( "nombre" ) );
console.log( mapa.get( "nombre" ) );//undefined

mapa.set("edad")
console.log(mapa)

mapa.clear();
console.log(mapa)


/* Otro ejemplo */

// Crear el Map con usuarios
console.log(" ".repeat(10))
console.log("=".repeat(10))
console.log(" ".repeat(10))

const usuarios = new Map();

usuarios.set(1, { nombre: "Oscar", rol: "Admin" });
usuarios.set(2, { nombre: "Laura", rol: "Editor" });
usuarios.set(3, { nombre: "Carlos", rol: "Viewer" });

// Acceder a un usuario por su ID
const usuario = usuarios.get(2);

// Recorrer todos los usuarios
usuarios.forEach((valor, clave) => {
  console.log(`ID: ${clave}, Nombre: ${valor.nombre}, Rol: ${valor.rol}`);
});

// Verificar si un usuario existe
if (usuarios.has(3)) {
  console.log("El usuario con ID 3 existe");
}

//Eliminar un usuario
usuarios.delete(1);





/* INICIALIZACION DE MAPAS */

let mapaTwo = new Map(); //Esto crea un Map vacío al que puedes agregar elementos con .set().

console.log(" ".repeat(10))
console.log("=".repeat(10))
console.log(" ".repeat(10))

let mapaThree = new Map([
  ["nombre", "Oscar"],
  ["edad", 31],
  ["profesion", "Frontend Developer"]
]);

console.log(mapaThree.get("nombre")); // "Oscar"
console.log(mapaThree.get("profesion")); // "Frontend Developer"




/* FOR EACH EN LOS MAPAS */

console.log(" ".repeat(10))
console.log("=".repeat(10))
console.log(" ".repeat(10))

const persona = new Map();

persona.set("nombre", "Oscar");
persona.set("edad", 31);
persona.set("profesion", "Frontend Developer");

persona.forEach((valor, clave) => {
  console.log(`Clave: ${clave}, Valor: ${valor}`);
});
