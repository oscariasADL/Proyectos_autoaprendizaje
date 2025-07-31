//LOCAL STORAGE
//alert("Hola oscar")


//Saber si el local storage esta  cargado

if(typeof(Storage) !== "undefined"){
    console.log("Local Storage cargado")
}else{
    console.log("LocalStorage No cargado")
}

//Guardar datos

localStorage.setItem("curso", "Master Javascript")
localStorage.setItem("enlace", "Vue")


//Sacar datos

//localStorage.getItem("curso")
//localStorage.getItem("Aprender")

console.log(localStorage.getItem("curso"))


//Guardar objetos

let animal = {
    especie: "elefante",
    nombre: "michi",
    color: "gris"
}

localStorage.setItem("animal", JSON.stringify(animal))


//Recuperar objeto

let animalTransform = JSON.parse(localStorage.getItem("animal"));

console.log(animalTransform)


//Eliminar elementos del storage
localStorage.removeItem("animal");


//Vaciar el storage
localStorage.clear();limpia todo el storage