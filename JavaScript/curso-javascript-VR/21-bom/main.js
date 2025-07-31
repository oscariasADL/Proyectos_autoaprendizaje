//BOM - Browser Object Model
//El BOM (Browser Object Model) en JavaScript es un conjunto de objetos que permite a JavaScript interactuar con el navegador web. A diferencia del DOM, que se enfoca en el contenido del documento, el BOM permite acceder y manipular funcionalidades del navegador como la ventana, la pantalla, el historial y la ubicación, entre otras cosas. 


//Alertas y dialogos
//alert("Hola Mundo"); //Muestra una alerta con el mensaje "Hola Mundo"
//prompt("¿Cuál es tu nombre?"); //Muestra un cuadro de diálogo que solicita al usuario que ingrese su nombre
//confirm("¿Estás seguro?"); //Muestra un cuadro de diálogo de confirmación con "Aceptar" y "Cancelar"



//Window

console.log(window); //Muestra el objeto window en la consola, que representa la ventana del navegador

console.log(window.innerWidth); //Muestra el ancho interno de la ventana del navegador
console.log(window.innerHeight); //Muestra la altura interna de la ventana del navegador
console.log(window.outerWidth); //Muestra el ancho externo de la ventana del navegador, incluyendo la barra de herramientas y los bordes
console.log(window.outerHeight); //Muestra la altura externa de la ventana del navegador, incluyendo la barra de herramientas y los bordes
console.log(window.location); //Muestra la URL actual de la ventana del navegador
console.log(window.location.href); //Muestra la URL completa de la ventana del navegador
console.log(window.document); //Muestra el objeto document, que representa el contenido del documento HTML cargado en la ventana si tenemos acceso a el DOM
console.log(window.navigator); //Muestra el objeto navigator, que contiene información sobre el navegador y el sistema operativo del usuario
console.log(window.navigator.userAgent); //Muestra la cadena de agente de usuario, que identifica el navegador y el sistema operativo del usuario
console.log(window.scrollX); //Muestra la posición de desplazamiento horizontal de la ventana del navegador
console.log(window.scrollY); //Muestra la posición de desplazamiento vertical de la ventana del navegador


//Navigator
console.log("*******NAVIGATOR*********");
console.log(navigator.appName, navigator.appVersion); //Muestra el nombre y la versión del navegador

if(!navigator.onLine){
    alert("No tienes conexión a internet"); //Muestra una alerta si el navegador no está conectado a internet
}else{
    alert("Tienes conexión a internet"); //Muestra una alerta si el navegador está conectado a internet
}



//Location

console.log(location.href)// Capturar la url
console.log(location.hostname)

//location.href = "www.oscar.com"

//location.reload -> recargar el navegador



//History

history.back()//Me lleva a la pagina inmediatamente anterior visitada
history.length;//Me muestra la cantidad de paginas visitadas antes de la pagina principal
history.go(1)// Navega hacia atras la cantidad de paginas visitadas anteriormente



//Screen
console.log(screen.width, screen.height)//Muestra la anchura y altura del contenido de la web



//Ventanas emergentes o popups
let miWeb = window.open("https://oscar-arias .com", "ruta de aprendizaje", "width=768,height=500, left=550, top=550px")//Abrir pantalla emergente con dicha pagina

miWeb.close();//cerarr popup o ventana emergente