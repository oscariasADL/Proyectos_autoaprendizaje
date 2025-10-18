/* DESTRUCTURACION DE OBJETOS */

let ajustes = {
    nombre: "Oscar Arias",
    correo: "eduardo93-12@hotmail.com",
    facebook: "oscarArias93",
    instagram: "oscared1993",
    premiun: true
}


/* En ES5 para acceder a cada propierad de un objeto debiamos ir uno por uno, por ejemplo: ajustes.nombre, ajustes.correo etc */

let { nombre, correo, facebook, instagram, premiun } = ajustes

console.log( nombre, correo, ajustes)

/*
Para renombrar una propiedad

let { nombre:nombreUsuario, correo, facebook }


Para añadir una propieda nueva

let { twitter = "twhitte_oscar" }

*/





/* DESTRUCTURACION DE OBJETOS ANIDADOS */
console.log("=".repeat(20))
let autoGuardado = {
    archivo: "app.js",
    cursor: {
        linea: 7,
        columna: 16
    },
    ultimoArchivo:{
        archivo: "index.html",
        cursor: {
                    linea: 8,
                    columna: 20
                }
    }
};

let { cursor:cursorActivo } = autoGuardado;
console.log( cursorActivo );

let { ultimoArchivo:{ cursor:ultimoArchivo } } = autoGuardado
console.log( ultimoArchivo )





/* DESTRUCTURACION DE ARREGLOS */

console.log("=".repeat(10))

let frutas = ["banano", "manzana", "pera"];

let [ fruta1, fruta2 ] = frutas;

console.log( fruta1 )
console.log( fruta2 )

let [ , , fruta3 ] = frutas;
console.log( fruta3 )