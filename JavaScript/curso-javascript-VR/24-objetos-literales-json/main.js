//Objetos Literales
//Es una estructura de datos que agrupa propiedades y metodos
// bajo un mismo nombre

//Objeto basico
let pelicula = {
    titulo: "terminator",
    anio: "2025",
    genero: "ciencia ficcion",
    director: "James cameron",
    //Se pueden añadir funciones a las propiedades de los metodos
    elenco: ["Arnold","flores","El chinga"],
    detalle: {
        duracion: 120,
        pegi: 18
    },
    descripcion: function(){
        return `${this.titulo} es una peli
                de ${this.genero}
                dirigida por ${this.director}`;//El this lo que hace es acceder a las propiedades del mismo objeto donde estamos trabajando
    },
    mostrarElenco: () => {

        console.log("****Mostrar Actores*****");

        pelicula.elenco.forEach( nombre => {
            console.log(nombre)
        })


    }
}

//Metodos para acceder a un objeto
console.log(
    pelicula.anio
)

//Otro metodo para acceder que es valido

console.log(
    pelicula["director"],
    pelicula["genero"],
)



//***********
//CAMBIAR LOS DATOS DE UN OBJETO

pelicula.director = "Oscar Arias"

console.log(pelicula)//Nos muestra con la modificacion realizada

//Agregar nueva propiedad

pelicula.secuela = "Terminator 2: el juicio final"

console.log(pelicula.descripcion());
console.log(pelicula.mostrarElenco());

console.log(pelicula.detalle.duracion);

delete pelicula.genero; //Eliminar una propiedad de un objeto



//***********
//OBJETO JSON

let equipoFutbol = {
    nombre: "Atletico Nacional",
    patrocinador: "Bettson",
    fundacion: 1947,
    copas: 36,
    color: "verde"
}

let equpoFutbokJSON = JSON.stringify(equipoFutbol); //CONVERTIR OBJETO A JSON

console.log(equipoFutbol);
console.log(equpoFutbokJSON);

let objetoConvertido = JSON.parse(equpoFutbokJSON); //CONVERTIR JSON A OBJETO DE NUEVO



//***********
//RECORRER OBJETO

for(let index in equipoFutbol){

    console.log(index);

}// Solo se imprimiria el indice del objeto

//PARA IMPRIMIRLO COMPLETO O BIEN

const cajaMostrar = document.querySelector("#caja");

for(let clave in equipoFutbol){

    cajaMostrar.innerHTML += `<p>${clave}: ${equipoFutbol[clave]}</p>`;

}