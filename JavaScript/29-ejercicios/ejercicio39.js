/*
Ejercicio 39:

SUPER EJERCICIO DE JAVASCRIPT

Crea una aplicacion web en la que puedas añadir, mostrar y elminar tus peliculas favoritas.

Cada Peli que guardes debe tener:

-Titulo de la pelicula
-Fecha de guardado
-Puntuacion de popularidad (Un valor aleatorio entre 1 y 100)

Las peliculas deben mantenerse guardadas aunque se recargue la página, y se debe poder eliminar cualquiera de ellas de la lista en cualquier momento.

Tareas:

1. Ejercicio 39: Crea el formulario necesario -> OK
2. Ejercicio 40: Funcion para guardar peliculas con los datos necesarios
3. Ejercicio 41: Funcion para mostar peliculas extraidas del LocalStorage
4. Ejercicio 42: Haz que las peliculas carguen automaticamente al abrir la web
5. Ejercicio 43: Funcion para eliminar Peliculas

*/

//Guardar formulario
function eliminarPeli(indice){

    //Sacar array de objetos del Local storage
    let peliculasGuardadas = JSON.parse(localStorage.getItem("peliculas"));

    //Eliminar peli del indice
    peliculasGuardadas.splice(indice, 1)

    //Actualizar array del local storage
    localStorage.setItem("peliculas", JSON.stringify(peliculasGuardadas));

    //mostar listado
    mostrar();
}


function mostrar(){

    //seleccionar etiqueta del listado
    let listado = document.querySelector("#listadoPelis")

    //sacarpeliculas del local
    let peliculasGuardadas = JSON.parse(localStorage.getItem("peliculas"))


    //Si no hay mostrar mensajee
    if(peliculasGuardadas.length === 0){

        listado.innerText = "No hay peliculas para mostrar"
        return false;
    }

    //Recorrer peliculas y mostrar
    peliculasGuardadas.forEach((pelicula, indice) => {

        const peliArticle = document.createElement("article")
        peliArticle.innerHTML = `
            <h3>${pelicula.titulo}</h3>
            <p>Fecha: ${pelicula.fecha}</p>
            <p>Puntuacion: ${pelicula.puntuacion}</p>
        `;

        //Boton de eliminar
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar peli";
        eliminarBtn.addEventListener("click", () => eliminarPeli(indice));

        peliArticle.appendChild(eliminarBtn);
        listado.appendChild(peliArticle);
    });

    return true;
}

function guardar(){

    //Seleccionar caja de texto y sacar el Value

    let campoTiulo = document.querySelector("#nombrePeli");
    let tituloPelicula = campoTiulo.value

    if(tituloPelicula.trim() === ""){
        alert("Campo vacio")
        return false;
    }

    //Conseguir Fecha actual
    const fecha = new Date();
    const fechaActual = fecha.toLocaleDateString();

    //Generar numero aleatorio para la popularidad
    let popularidad = Math.floor(Math.random() * 100) + 1;

    //Crear objeto pelicula
    let pelicula = {
        titulo: tituloPelicula,
        fecha: fechaActual,
        puntuacion: popularidad
    }


    //Sacar todas las peliculas (array objetos)
    let peliculasGuardadas = JSON.parse(localStorage.getItem("peliculas"));

    if(!peliculasGuardadas){
        peliculasGuardadas = [];
    }

    //Añadir al array la nueva peli
    peliculasGuardadas.push(pelicula);


    //Guardar todo en el local storage
    localStorage.setItem("peliculas", JSON.stringify(peliculasGuardadas));

    //Limpiar el campo
    campoTiulo.value = ""

    //Mostrar Peliculas
    

    //Mostrar peliculas
    return true;

    
}

window.addEventListener("load", () => {

    mostrar();

    let formulario = document.querySelector("#formularioPelis");

    formulario.addEventListener("submit", (e) =>{
        e.preventDefault();
        guardar();
        
    });

});



