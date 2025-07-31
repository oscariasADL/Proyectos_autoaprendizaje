//Crear un array

let vacio = new Array(4);
//console.log(vacio); // [ <4 empty items> ]


let dispositivos = ["pc", "tablet", "movil", "television", "smartwatch"];

console.log(dispositivos); // [ 'pc', 'tablet', 'movil', 'television', 'smartwatch' ]

console.log(dispositivos.length);



//Añadir elementos al array
dispositivos.push("reproductor");
dispositivos.push("consola");

console.log(dispositivos); // [ 'pc', 'tablet', 'movil', 'television', 'smartwatch', 'reproductor', 'consola' ]
console.log(dispositivos.length); // 7



//Eliminar ultimo elemento del array
dispositivos.pop(); // elimina el último elemento del array



//Eliminar primer elemento del array
dispositivos.shift(); // elimina el primer elemento del array



//Eliminar un elemento del array en una posición concreta
dispositivos.splice(2,1); // elimina el elemento en la posición 2 (tercero) del array



//Añadir un elemento al principio del array
dispositivos.unshift("xbox"); // añade el elemento al principio del array



//Añadir un elemento en una posición concreta del array
dispositivos.splice(2,0,"nintendo"); // añade el elemento en la posición 2 (tercero) del array sin eliminar ningún elemento



//Busqueda de un elemento en el array
let posicion = dispositivos.indexOf("tablet"); // devuelve la posición del elemento en el array (si no lo encuentra devuelve -1)



//Busqueda de un elemento en el array con un valor booleano
let existe = dispositivos.includes("tablet"); // devuelve true si el elemento existe en el array (si no lo encuentra devuelve false)



// Filtrar un array

dispositivos.push("ps4", "ps5", "xbox one", "xbox series x", "switch", "gameboy");

let dispositivosConA = dispositivos.filter(dispositivo =>{

    let resultado = false;

    if(dispositivo.includes("a")){
        resultado = true;
    }

    return resultado;

});

console.log(dispositivosConA); 



//Es igual que el anterior pero con una función flecha

let dispositivosConA2 = dispositivos.filter(dispositivo => dispositivo.includes("a"));
console.log(dispositivosConA2); 



//Metodo reduce
// El método reduce() ejecuta una función reductora sobre cada elemento de un array, de izquierda a derecha,
// de forma que cada ejecución produce un valor acumulado. Este valor se devuelve como el resultado final de la función.
// El primer argumento de la función reductora es el acumulador, que se inicializa con el primer elemento del array.
// El segundo argumento es el elemento actual que se está procesando en el array.
// El método reduce() devuelve un único valor, que es el resultado de la función reductora aplicada a todos los elementos del array.

let reducir = dispositivos.reduce((total, actual) => total.toUpperCase() + ", "  + actual.toUpperCase());
console.log(reducir); 

let reducir2  = dispositivos.reduce((total, actual) => total + ", "  + actual[0].toUpperCase() + actual.slice(1).toLowerCase());
console.log(reducir2);


let numeros = [1, 2, 3, 4];
let suma = numeros.reduce((total, actual) => total + actual); // el segundo argumento es el valor inicial del acumulador
console.log(suma); // 55



//Ordenar un array
let elementosDeCocina = ["cuchara", "cuchillo", "tenedor", "plato", "vaso", "sarten", "olla", "alacena", "nevera", "horno", "microondas"];

elementosDeCocina.sort(); // ordena el array de forma ascendente (de menor a mayor)

console.log(elementosDeCocina);



//Invertir un array en un string
elementosDeCocina.reverse(); // invierte el array (de mayor a menor)
console.log(elementosDeCocina);



//Combinar arrays
let frutas = ["manzana", "pera", "naranja", "platano", "kiwi"];
let verduras = ["lechuga", "tomate", "pepino", "zanahoria", "cebolla"];

let union = frutas.concat(verduras); // une los dos arrays en uno solo
console.log(union);



//Convertir todos los elementos de un array en cadena de texto
let etiquetas = dispositivos.join(", "); // convierte el array en una cadena de texto separada por comas
console.log(etiquetas); // pc, tablet, movil, television, smartwatch, xbox, nintendo



//Copiar porciones de un array
let copia = dispositivos.slice(2, 5); // copia los elementos del array desde la posición 2 (tercero) hasta la posición 4 (quinto) sin incluir el último
console.log(copia); // [ 'movil', 'television' ]



//Find y FindIndex
// El método find() devuelve el primer elemento del array que cumple con la condición especificada en la función de prueba.

let buscarFind = dispositivos.find(dispositivoUD => dispositivoUD.length > 5);
console.log(buscarFind); // devuelve el primer elemento que cumple con la condición (en este caso "cuchara")



// El método findIndex() devuelve el índice del primer elemento del array que cumple con la condición especificada en la función de prueba.
let buscarFindIndex = dispositivos.findIndex(dispositivoUD => dispositivoUD.length > 5);
console.log(buscarFindIndex); // devuelve el índice del primer elemento que cumple con la condición (en este caso 0)



// Metodo some y every
// El método some() devuelve true si al menos un elemento del array cumple con la condición especificada en la función de prueba.
// El método every() devuelve true si todos los elementos del array cumplen con la condición especificada en la función de prueba.

let letrasA = elementosDeCocina.some(elemento => elemento.includes("a")); // devuelve true si al menos un elemento del array cumple con la condición (en este caso "cuchara")
console.log(letrasA); // true

let letrasE = elementosDeCocina.every(elemento => elemento.includes("e")); // devuelve true si todos los elementos del array cumplen con la condición 
console.log(letrasE); // true



//Aplanar un array funcion Flat
// El método flat() crea un nuevo array con todos los elementos de sub-array concatenados hasta la profundidad especificada.
let anios = [
    [1990, 1991, 1992, 1993, 1994],
    [2000, 2001, 2002, 2003, 2004],
    [2010, 2011, 2012, 2013, 2014, [2015, 2016, 2017, 2018, 2019, [2020, 2021, 2022, 2023]]],
];

let plana = anios.flat(3); // aplana el array hasta la profundidad 2 (es decir, elimina los sub-arrays de profundidad 2)
console.log(plana);



//Funcion CopyWithin
// El método copyWithin() copia una parte del array a otra ubicación dentro del mismo array sin modificar su tamaño.

let fechas = [1990, 1991, 1992, 1993, 1994, 2000, 2001, 2002, 2003, 2004];
//fechas.copyWithin(0, 5, 9); // copia los elementos del array desde la posición 5 (sexto) hasta la posición 9 (décimo) y los pega en la posición 0 (primera)

fechas.copyWithin(0, 7); // copia los elementos del array desde la posición 7hasta el final y los pega en la posición 0 (primera)
console.log(fechas); 



//Convertir un string en un array con el metodo from
// El método from() crea una nueva instancia de array a partir de un objeto iterable (como un string, un array, un objeto, etc.).

let nombre = "Juan Carlos";
let nombreArray = Array.from(nombre); // convierte el string en un array de caracteres
console.log(nombreArray); // [ 'J', 'u', 'a', 'n', ' ', 'C', 'a', 'r', 'l', 'o', 's' ]


//Otra forma de hacerlo es con el método split()
let nombreArray2 = nombre.split(" "); // convierte el string en un array de caracteres
console.log(nombreArray2); // [ 'Juan', 'Carlos' ]



//Convertir un array en un string con el metodo toString
console.log(dispositivos.toString()); // convierte el array en un string separado por comas (en este caso "pc, tablet, movil, television, smartwatch")



//Desestructuración de arrays
// La desestructuración de arrays es una forma de extraer valores de un array y asignarlos a variables individuales.

let [a, b, c] = [1, 2, 3]; // asigna el primer elemento del array a la variable a, el segundo elemento a la variable b y el tercer elemento a la variable c
console.log(a); // 1

let [actor, ...actores] = ["Brad Pitt", "Leonardo DiCaprio", "Tom Cruise", "Johnny Depp"]; // asigna el primer elemento del array a la variable actor y el resto de los elementos a la variable actores (que es un array)
console.log(actor); // Brad Pitt
console.log(actores); // [ 'Leonardo DiCaprio', 'Tom Cruise', 'Johnny Depp' ]



//Expansión de arrays
let array1 = [1, 2, 3];
let array2 = [4, 5, 6];
let array3 = [...array1, ...array2]; // une los dos arrays en uno solo
console.log(array3); // [ 1, 2, 3, 4, 5, 6 ]



//Pasar a seo slug
let slug="Hola Mundo, soy un slug";
let slug2 = slug.split(" ");

console.log(slug2); 

slug3 = slug2.join("-").toLowerCase(); // une los elementos del array en un string separado por guiones
console.log(slug3); // Hola-Mundo,-soy-un-slug
