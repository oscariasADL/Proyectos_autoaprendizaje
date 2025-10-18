/* EXPRESIONES REGULARES */

/* Las expresiones regulares (o regex) en JavaScript son una herramienta muy poderosa para buscar, validar, extraer o reemplazar texto dentro de cadenas. */

/* Una expresión regular es una secuencia de caracteres que define un patrón de búsqueda. Se usa para trabajar con texto de forma flexible y precisa. */

var reg1 = RegExp("a");
var reg2 = /a/;

var texto = "Hola mundo";

var arr = texto.match( reg1 );
//var arr = texto.match( /^A/ ) -> El pico hacia arriba indica que busque en la primer parte de la palabra

console.log( arr )