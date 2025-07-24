//SOLO SE USA LET Y CONST 
// Si se declara una variable con el mismo nombre de otro archivo, TypeScript dara error
// No se puede declarar una variable con el mismo nombre en el mismo archivo
var nombre2 = "oscar A"; //TypeScript infiere el tipo de dato en este caso string
var edad = 30; //TypeScript infiere el tipo de dato en este caso number
//nombre2 = 10; //Error, no se puede asignar un número a una variable de tipo string
console.log(nombre2); //string
console.log(typeof nombre2); //string
//String
var pais = "Colombia"; //Declaración explícita de tipo string
//Number    
var habitantes = 50000000; //Declaración explícita de tipo number
//Boolean
var esColombiano = true; //Declaración explícita de tipo boolean
//Any
// Se usa cuando no se conoce el tipo de dato o se quiere permitir cualquier tipo de dato
// No se recomienda su uso, pero es útil en ciertas situaciones
var locura = "Hola"; //Declaración explícita de tipo any
locura = 10; //Se puede cambiar a cualquier tipo de dato
//Array
var lenguajes = ["JavaScript", "TypeScript", "Python"]; //Declaración explícita de tipo array de strings
var decadas = [1990, 2000, 2010, 2020]; //Declaración explícita de tipo array de números
var arrayVariosTipos = ["JavaScript", 1995, "TypeScript", 2012]; //Array que puede contener strings y números
//Tipos especiales
var sinDefinir; //Declaración explícita de tipo undefined, valor no definido
var nulo = null; //Declaración explícita de tipo null
var codigo = "ABC123"; //Uso del tipo personalizado
codigo = 123456; //También se puede asignar un número
