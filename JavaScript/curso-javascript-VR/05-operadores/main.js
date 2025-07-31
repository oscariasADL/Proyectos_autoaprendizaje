//OPERADORES
let frase = "Hola soy oscar"; //TIpo de dato  cadena de texto / string
let frutas = ["fresa","sandia", "naranja"] //Array o arreglo
let heroe = {nombre: "batman", universo: "DC"}; //Objeto



//-----------------------------------
//Operador de tipo (typeof)
console.log(typeof heroe)// Nos dice en consola que tipo de dato es

//En javascript los arrays los toma como objetos para saber si un array es un array
console.log(Array.isArray(frutas))//Nos dice en consola si es un arreglo o no



//-----------------------------------
//Operadores Aritmeticos (matematicas)

let numero1 = 12;
let numero2 = 44;
let suma = numero1 + numero2;
let resta = numero1 - numero2;
let multi = numero1 * numero2;
let div = numero1 / numero2;
let resto = numero1 % numero2;
let potencia = numero1 ** 2;
console.log("Suma:" + suma);
console.log("Resta:" + resta);
console.log("Multi:" + multi);
console.log("Division:" + div);
console.log("Resto:" + resto);
console.log("Potencia:" + potencia);



//-----------------------------------
//Asignacion

let numerito = 17; // El simple hecho de tener un igual ya lo hace una asignación ya que tiene asignado un valor

//numerito = 17 + 3; // Me da 20

//Es igual a hacer lo siguiente

numerito += 3;

console.log(numerito)



//-----------------------------------
// Comparacion

let numerazo = 31;
console.log( numerazo == "31");// Comparacion que solo compara el valor
console.log( numerazo === "31");// Comparacion extricto === compara el tipo de dato y el valor
console.log( numerazo != "31"); //No es igual a 31 (!= diferente a)
console.log( numerazo !== "31");//Comparacion extricta compara el tipo de dato y el valor
console.log( numerazo > 33 );//Mayor que
console.log( numerazo < 33 );//Menor que
console.log( numerazo >= 31 );//Mayor o igual que
console.log( numerazo <= 28 );//Menor o igual que



//-----------------------------------
//Logicos

let esMayorDeEdad = true;
let tieneEntrada = true;

console.log(esMayorDeEdad && tieneEntrada); //condicion Y ambas se cumplen
console.log(esMayorDeEdad || tieneEntrada);//condicion O Una de las dos se cumplen
console.log(!esMayorDeEdad); //Operador logico NOT comprobar si algo no existe o da false, inivierte el valor, es decir si tiene asignado true lo niega y lo devuelve como false



//-----------------------------------
//Cadena

let mensaje1 = "hola";
let mensaje2 = "que tal?";

let mensaje_total = mensaje1 + " " + mensaje2

mensaje_total += " Como te va";// Sumar un trozo de contenido a string

console.log(mensaje_total)



//-----------------------------------
//Incremento y decremento

let cifra = 1200;

//cifra = 1200 +1;

//cifra = cifra + 1;

// se puede hacer lo anterior con un operador de incremento o decremento

cifra++; // le suma 1
cifra++; // le suma 1
cifra++; // le suma 1
cifra--; // le resta 1

console.warn(cifra)