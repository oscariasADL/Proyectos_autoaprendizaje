//MODIFICAR ELEMENTOS DEL DOM
console.log("*******MODIFICACIONES EN EL DOM*********");

let tarjeta = document.querySelector("#card"); // Selecciona el primer elemento con la clase "card"

console.log(tarjeta); // Devuelve el primer elemento con la clase "card"

tarjeta.textContent = "Hola Mundo"; // Cambia el texto del elemento a "Hola Mundo" tambien se puede usar para ver el contenido

tarjeta.innerHTML = "<strong>Hola Mundo Mundin</strong>"; // Cambia el contenido HTML del elemento a "<strong>Hola Mundo</strong>"

tarjeta.setAttribute("data-id", "12"); // Cambia la clase del elemento a "card2"; // Cambia o añade un atributo al elemento

tarjeta.classList.add("card2"); // Añade la clase del elemento a "card2"
tarjeta.setAttribute("class", "card3 card4 card5"); // Tambien se puede usar para cambiar la clase del elemento a "card3"
tarjeta.className = "card6"; // Cambia las clases del elemento a "card6" (reemplaza todas las clases)

console.log(tarjeta.getAttribute("data-id")); // Devuelve el valor del atributo "data-id" del elemento, se puede uysar para ver el contenido de cualquier atributo

tarjeta.style.backgroundColor = "#c5c5c5"; // Cambia el color de fondo del elemento a rojo



//***********
//CREAR O ELIMINAR ELEMENTOS DEL DOM
tarjeta.classList.add("card2");
tarjeta.classList.remove("card2"); // Elimina la clase "card2" del elemento
tarjeta.classList.toggle("card3"); // Añade la clase "card2" si no existe, o la elimina si ya existe, muy util para trabajar con eventos


//Crear un nuevo elemento y añadirlo al DOM
let nuevoElemento = document.createElement("h2"); // Crea un nuevo elemento <div>
nuevoElemento.textContent = "Hola Mundo desde el script"; // Cambia el texto del nuevo elemento a "Hola Mundo desde el script"

nuevoElemento.classList.add("card2"); // Añade la clase "card2" al nuevo elemento

let nuevoElemento2 = document.createElement("h1"); // Crea un nuevo elemento <div>

nuevoElemento2.textContent = "TITULO DESDE el script"; // Cambia el texto del nuevo elemento a "Hola Mundo desde el script"


tarjeta.appendChild(nuevoElemento); // Añade el nuevo elemento al final del elemento tarjeta, funciona igual que insertAfter pero es mas moderno y permite añadir nodos de texto y elementos HTML, se puede usar appendChild o append, pero append es mas moderno y permite añadir nodos de texto y elementos HTML

tarjeta.append(nuevoElemento); // Añade el nuevo elemento al final del elemento tarjeta, se puede usar appendChild o append, pero append es mas moderno y permite añadir nodos de texto y elementos HTML

tarjeta.prepend(nuevoElemento2); // Añade el nuevo elemento al principio del elemento tarjeta, se puede usar appendChild o prepend, pero prepend es mas moderno y permite añadir nodos de texto y elementos HTML, funciona igual que insertBefore pero es mas moderno y permite añadir nodos de texto y elementos HTML


//Eliminar un elemento del DOM

tarjeta.querySelector("h2").remove(); // Elimina el primer elemento <h2> del elemento tarjeta, se puede usar removeChild o remove, pero remove es mas moderno y permite eliminar nodos de texto y elementos HTML
//tarjeta.remove(); // Elimina el elemento tarjeta del DOM, se puede usar removeChild o remove, pero remove es mas moderno y permite eliminar nodos de texto y elementos HTML