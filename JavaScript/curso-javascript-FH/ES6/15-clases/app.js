/* CLASES */

/* Una clase es como un molde o plantilla para crear objetos con propiedades y métodos definidos. Te permite organizar tu código de forma más clara y reutilizable. */


//ES5

function PersonaOld(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}

PersonaOld.prototype.saludar = function() {
  console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
}

// Crear una instancia
let oscarOld = new PersonaOld("Oscar", 31);
oscarOld.saludar(); // "Hola, soy Oscar y tengo 31 años."

console.log("=".repeat(50));




// CLASES COMO EXPRESIONES

let Animal = class {
  constructor(nombre) {
    this.nombre = nombre;
  }

  hablar() {
    console.log(`${this.nombre} hace un ruido.`);
  }
};

let perro = new Animal("Firulais");
perro.hablar(); // "Firulais hace un ruido."




// CLASES COMO PARÁMETROS

function crearInstancia(Clase, ...args) {
  return new Clase(...args);
}

class Gato {
  constructor(nombre) {
    this.nombre = nombre;
  }

  maullar() {
    console.log(`${this.nombre} dice: Miau!`);
  }
}

let miGato = crearInstancia(Gato, "Misu");
miGato.maullar(); // "Misu dice: Miau!"




//ES6

// Definición de la clase
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar() {
    console.log(`Hola, soy ${this.nombre} y tengo ${this.edad} años.`);
  }
}

// Crear una instancia (objeto) de la clase

const oscar = new Persona("Oscar", 31);
oscar.saludar(); // "Hola, soy Oscar y tengo 31 años."

console.log(oscar instanceof Persona); // true
console.log(oscar instanceof Object);   // true

console.log(" ".repeat(50));
console.log("=".repeat(50));
console.log(" ".repeat(50));





// METODOS ESTÁTICOS

/* Los métodos estáticos son funciones que pertenecen a la clase en sí, y no a las instancias de la clase. Se utilizan para funcionalidades que no dependen de los datos de una instancia específica. */

class Matematica {
  static sumar(a, b) {
    return a + b;
  }

  static restar(a, b) {
    return a - b;
  }
}

// Llamada a métodos estáticos sin crear una instancia
console.log(Matematica.sumar(5, 3)); // 8
console.log(Matematica.restar(5, 3)); // 2


// Los metodos estáticos usan la palabra reservada "static", y se llaman directamente desde la clase, no desde una instancia de la clase.


class ConstruirPersona{

  constructor(nombre){
    this.nombre = nombre;
  }

  decirNombre(){
    console.log(`Mi nombre es ${this.nombre}`);
  }

  static crear(nombre){
    return new ConstruirPersona(nombre);
  }

}

let yo = ConstruirPersona.crear("Oscar");
console.log(yo);

console.log(" ".repeat(50));
console.log("=".repeat(50));
console.log(" ".repeat(50));




// HERENCIA

/* La herencia permite que una clase hija (o subclase) herede el comportamiento (métodos y propiedades) de una clase padre (o superclase). Esto promueve la reutilización de código y facilita la organización lógica de estructuras complejas. */

// Clase padre
class PersonaTwo {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }
}

// Clase hija que hereda de Persona
class Empleado extends PersonaTwo {
  constructor(nombre, edad, cargo) {
    super(nombre, edad); // Llama al constructor de la clase padre
    this.cargo = cargo;
  }

  trabajar() {
    console.log(`${this.nombre} tiene ${this.edad} años y está trabajando como ${this.cargo}`);
  }
}

// Crear instancia
const oscarTwo = new Empleado("Oscar", 31, "Frontend Developer");
oscarTwo.saludar();   // Heredado de Persona
oscarTwo.trabajar();  // Propio de Empleado


console.log(" ".repeat(50));

class Rectangulo {
  constructor(alto, largo) {
    this.alto = alto;
    this.largo = largo;
  }

  area() {
    return this.alto * this.largo;
  }
}

let rectangulo = new Rectangulo(5, 10);

class Cuadrado extends Rectangulo {
  constructor(alto) {
    super(alto, alto); // Llama al constructor de Rectangulo con base y altura iguales
  }
}

let cuadrado = new Cuadrado(5);

console.log(rectangulo.area()); // 50}
console.log(cuadrado.area()); // 50





