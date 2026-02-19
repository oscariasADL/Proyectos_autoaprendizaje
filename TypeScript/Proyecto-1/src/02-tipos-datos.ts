//SOLO SE USA LET Y CONST 
// Si se declara una variable con el mismo nombre de otro archivo, TypeScript dara error
// No se puede declarar una variable con el mismo nombre en el mismo archivo

let nombre2 = "oscar A"; //TypeScript infiere el tipo de dato en este caso string
let edad = 30; //TypeScript infiere el tipo de dato en este caso number


//nombre2 = 10; //Error, no se puede asignar un número a una variable de tipo string
console.log(nombre2); //string
console.log(typeof nombre2); //string


//String
let pais:string = "Colombia"; //Declaración explícita de tipo string


//Number    
let habitantes:number = 50000000; //Declaración explícita de tipo number

//Boolean
let esColombiano:boolean = true; //Declaración explícita de tipo boolean


//Any
// Se usa cuando no se conoce el tipo de dato o se quiere permitir cualquier tipo de dato
// No se recomienda su uso, pero es útil en ciertas situaciones
let locura:any = "Hola"; //Declaración explícita de tipo any
locura = 10; //Se puede cambiar a cualquier tipo de dato


//Array

let lenguajes:string[] = ["JavaScript", "TypeScript", "Python"]; //Declaración explícita de tipo array de strings
let decadas: Array<number> = [1990, 2000, 2010, 2020]; //Declaración explícita de tipo array de números

let arrayVariosTipos: Array<string | number> = ["JavaScript", 1995, "TypeScript", 2012]; //Array que puede contener strings y números


//Tipos especiales

let sinDefinir: undefined; //Declaración explícita de tipo undefined, valor no definido
let nulo: null = null; //Declaración explícita de tipo null


//Tipo personalizado

type alfanumerico = string | number; //Declaración de un tipo personalizado que puede ser string o number
let codigo: alfanumerico = "ABC123"; //Uso del tipo personalizado
codigo = 123456; //También se puede asignar un número