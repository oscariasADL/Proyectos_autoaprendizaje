//DOM - Document Object Model
//El DOM (Document Object Model) es una interfaz de programación que representa un documento HTML o XML como un árbol de objetos, donde cada nodo representa una parte del documento. Permite a los lenguajes de programación, como JavaScript, interactuar con los elementos de la página web para acceder, modificar, o crear contenido de forma dinámica. 

// DOM es como el plano de una casa, es una representación de la estructura de una página web, se usa para que javascript pueda interactuar con el HTML y CSS de una página web. Es una manera de acceder a los elementos de una página web y manipularlos.

//Todas las etiquetas pueden ser accedidas desde el DOM, pero no todas tienen el mismo uso. Por ejemplo, las etiquetas <script> y <style> no se pueden acceder desde el DOM porque no tienen un valor que se pueda manipular. En cambio, las etiquetas <div>, <p>, <h1>, <img>, etc. sí se pueden acceder desde el DOM porque tienen un valor que se puede manipular.


//SELECCIONAR ELEMENTOS DEL DOM
//Para seleccionar elementos del DOM se pueden usar diferentes métodos. Los más comunes son:



//***********
//1. getElementById: Selecciona un elemento por su id. Este método devuelve un solo elemento.

//Con window addEventListener se puede ejecutar una función cuando el DOM está completamente cargado. Esto es útil para asegurarse de que todos los elementos del DOM estén disponibles antes de intentar manipularlos. O usar defer directamente en el html.

/*window.addEventListener("DOMContentLoaded", function() {
    let caja = document.getElementById("caja");
    console.log(caja); // <div id="caja">Hola</div>
});*/

let caja = document.getElementById("caja");

console.log(caja.innerHTML); // <div id="caja">Hola</div>

caja.innerHTML = "<h1>Hola mundo ajustado desde el script</h1>"; // Cambia el contenido de la caja a "Hola mundo"

//Agregar estilos a la caja
caja.style.backgroundColor = "red"; // Cambia el color de fondo de la caja a rojo
caja.style.color = "white"; // Cambia el color del texto de la caja a blanco
caja.style.fontSize = "30px"; // Cambia el tamaño de la fuente de la caja a 30px
caja.style.padding = "20px"; // Cambia el padding de la caja a 20px
caja.style.maxWidth = "500px"; // Cambia el ancho máximo de la caja a 500px
caja.style.margin = "0 auto"; // Centra la caja en la página
caja.style.textAlign = "center"; // Centra el texto dentro de la caja

//Agregar una clase a la caja
let cajaTwo = document.getElementById("caja2");

cajaTwo.classList.add("cajaPorScript")

//Tambien se puede usar className, pero es mejor usar classList porque permite agregar y quitar clases sin afectar las demás clases que tenga el elemento. className reemplaza todas las clases del elemento por la nueva clase. O captura el valor de las clases en una variable.
//cajaTwo.className = "cajaza cajon"; // Reemplaza todas las clases del elemento por la nueva clase

//Cambiar propiedades de la caja con una función y parámetros
function cambiarColor(color, radius){
    cajaTwo.style.backgroundColor = color; // Cambia el color de fondo de la caja a rojo
    cajaTwo.style.borderRadius = radius; // Cambia el color de fondo de la caja a rojo
}

cambiarColor("pink", "50px"); // Cambia el color de fondo de la caja a azul y el radio de la caja a 50px



//***********
//2. getElementsByClassName: Selecciona multiples elementos por su clase. Este método devuelve una colección de elementos, por lo que se debe usar un bucle para acceder a cada uno de ellos.

let articulo = document.getElementsByClassName("article"); // Selecciona todos los elementos con la clase "articulo"
console.log(articulos); // Devuelve una colección de elementos con la clase "articulo"

for(let i = 0; i < articulo.length; i++){
    
    articulo[i].classList.add("articulosPorScript");
    articulo[i].style.backgroundColor = "black"; 
    articulo[i].style.color = "white"; 
    articulo[i].style.fontSize = "20px";
    articulo[i].style.padding = "10px";
    articulo[i].style.margin = "10px";

    if(i % 2 == 0){
        articulo[i].style.backgroundColor = "blue"; 
    }
    if(i === (articulo.length - 1)){
        articulo[i].style.backgroundColor = "green"; 

        //Añadir mas HTML a los elementos
        articulo[i].innerHTML += "<a href='#'>Ultimo elemento de los articulos</a><br>"

        //Añadir un nodo al DOM
        let enlace = document.createElement("a");// Crea un nuevo elemento <a>
        enlace.setAttribute("href", "#"); // Establece el atributo href del enlace
        enlace.setAttribute("target", "_blank");
        enlace.innerHTML = "Enlace creado desde el script"; // Establece el texto del enlace
        enlace.style.color = "white"; // Cambia el color del texto del enlace a blanco

        //Tambien se puede usar CreateTextNode para crear un nodo de texto y luego añadirlo al enlace
        //let texto = document.createTextNode("Enlace creado desde el script"); // Crea un nuevo nodo de texto
        //enlace.append(texto); // Añade el nodo de texto al enlace
        //articulo[i].append(enlace); // Añade el enlace al final del elemento

        articulo[i].appendChild(enlace); // Añade el enlace al final del elemento
    }
}



//***********
//3. getElementsByTagName: Selecciona multiples elementos por su etiqueta. Este método devuelve una colección de elementos, por lo que se debe usar un bucle para acceder a cada uno de ellos.

let etiquetasArticulos = document.getElementsByTagName("article"); // Selecciona todos los elementos <article>
console.log(etiquetasArticulos[4]); // Devuelve una colección de elementos <article>



//***********
//4. querySelector: Selecciona el primer elemento que coincide con el selector CSS. Este método devuelve un solo elemento.
//Se puede usar cualquier selector CSS, como id, clase, etiqueta, etc. También se pueden usar selectores compuestos, como .clase1.clase2 o #id1 .clase1. Este método es más flexible que getElementById y getElementsByClassName.

let seccionArticulosQuery = document.querySelector("#articulos"); // Selecciona el primer elemento con el id "articulos" #para seleccionar por id y . para seleccionar por clase

seccionArticulosQuery.style.backgroundColor = "gray";
seccionArticulosQuery.style.padding = "20px"
console.log("*******QUERY SELECTOR*********");
console.log(seccionArticulosQuery); // Devuelve el elemento <div id="articulos">...</div>

//QuerySelector y clases

let primerArticulo = document.querySelector(".article"); // Selecciona el primer elemento con la clase "articulo"
console.log(primerArticulo); // Devuelve el primer elemento con la clase "articulo"



//***********
//5. querySelectorAll: Selecciona todos los elementos que coinciden con el selector CSS. Este método devuelve una colección de elementos, por lo que se debe usar un bucle para acceder a cada uno de ellos.

console.log("*******QUERY SELECTOR ALL*********");
let articuloQueryALL = document.getElementsByClassName("article2"); // Selecciona todos los elementos con la clase "articulo"
console.log(articuloQueryALL); // Devuelve una colección de elementos con la clase "articulo"

for(let i = 0; i < articuloQueryALL.length; i++){
    
    articuloQueryALL[i].classList.add("articulosPorScript");
    articuloQueryALL[i].style.backgroundColor = "black"; 
    articuloQueryALL[i].style.color = "white"; 
    articuloQueryALL[i].style.fontSize = "20px";
    articuloQueryALL[i].style.padding = "10px";
    articuloQueryALL[i].style.margin = "10px";

    if(i % 2 == 0){
        articuloQueryALL[i].style.backgroundColor = "blue"; 
    }
    if(i === (articuloQueryALL.length - 1)){
        articuloQueryALL[i].style.backgroundColor = "green"; 

        //Añadir mas HTML a los elementos
        articuloQueryALL[i].innerHTML += "<a href='#'>Ultimo elemento de los articulos</a><br>"

        //Añadir un nodo al DOM
        let enlace = document.createElement("a");// Crea un nuevo elemento <a>
        enlace.setAttribute("href", "#"); // Establece el atributo href del enlace
        enlace.setAttribute("target", "_blank");
        enlace.innerHTML = "Enlace creado desde el script"; // Establece el texto del enlace
        enlace.style.color = "white"; // Cambia el color del texto del enlace a blanco

        //Tambien se puede usar CreateTextNode para crear un nodo de texto y luego añadirlo al enlace
        //let texto = document.createTextNode("Enlace creado desde el script"); // Crea un nuevo nodo de texto
        //enlace.append(texto); // Añade el nodo de texto al enlace
        //articulo[i].append(enlace); // Añade el enlace al final del elemento

        articuloQueryALL[i].appendChild(enlace); // Añade el enlace al final del elemento
    }
}
