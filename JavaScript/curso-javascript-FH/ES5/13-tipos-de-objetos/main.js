/* TIPOS DE OBJETOS */
/* Un objeto en JavaScript es una estructura de datos que permite almacenar múltiples valores relacionados entre sí, usando una combinación de claves (propiedades) y valores. Es uno de los pilares del lenguaje y se usa muchísimo en desarrollo frontend. */



/* OBJETO NUMBER */

var a = 10.456465;
console.log( a.toFixed(5) );//Redonde el valor en los decimnales

a = a.toString();
console.log( a ) // Convierte en cadena de texto


a = 100.456789;
console.log( a )
console.log ( a.toPrecision(5) )//redondea en cuanto a cantidad de caracteres


var b = new Number( "20" );

console.log( b );           // 👉 Muestra el objeto Number
console.log( b.valueOf() )  // 👉 Muestra el valor primitivo: 20
console.log(" ")
console.log("**********")
console.log(" ")



/* OBJETO STRING */

var b = "Herrera"

var a = new String("Fernando Herrera")
console.log(a)

console.log(a.toUpperCase());
console.log(a.toLowerCase());

var i = a.indexOf("Herrera")
console.log("La letra esta: ", i)

i = a.lastIndexOf("n")
console.log("La letra esta; ", i)

var nombre = a.substr( 0, a.indexOf(" ") );
console.log( nombre )