//PROGRAMACION ORIENTADA A OBJETOS


//Molde

class Gato { //Las clases siempre inician en mayus

    constructor(){
        //Propiedades o atributos(caracteristicas)
        this.nombre = "Bella";
        this.raza = "Abiusinio";
        this.color = "marron";
    }

    //Metodos (Acciones)
    maullar(){
        console.log(`${this.nombre} dice: miau miau`)
    }

    saltar(){
        console.log(`${this.nombre} ha saltado`)
    }
    
}


//USAR LA CLASE

let miGato = new Gato(); //con new invoco la clase gato y se la asigno a la variable

console.log(miGato.raza)//Se accede igual que un objeto liteal JSON mostrara la raza del gato

miGato.maullar(); // invoca el metodo
miGato.saltar();  // invoca el metodo


//Lo ideal es usar informacion dinamica o que se envia a travez de parametros

class Perro { //Las clases siempre inician en mayus

    constructor(nombrePerro, razaPerro, colorPerro){
        //Propiedades o atributos(caracteristicas)
        this.nombre = nombrePerro;
        this.raza = razaPerro;
        this.color = colorPerro;
    }

    //Metodos (Acciones)
    ladrar(){
        console.log(`${this.nombre} dice: guau guau`)
    }

    correr(){
        console.log(`${this.nombre} ha corrido`)
    }

    set guardarColor(color){
        this.color = color;
    }

    get sacarColor(){
        return this.color
    }

    static saludar(){
        alert("¿Hola amigo que tal estas?")
    }

    
}

let miPerro = new Perro("Baxter", "gordo", "cafe" ); //con new invoco la clase gato y se la asigno a la variable


miPerro.ladrar(); // invoca el metodo
miPerro.correr();  // invoca el metodo

let miPerro2 = new Perro("Hashi", "beagle", "gris" );

miPerro2.ladrar(); // invoca el metodo
miPerro2.correr();  // invoca el metodo

miPerro.guardarColor = "Amarrillito"
console.log (miPerro.sacarColor)

Perro.saludar();



//HERENCIA

class PerroEspecial extends Perro{

    constructor(nombre, raza, color, habilidadEspecial){

        //El constructor debe llamar al constructor de la clase padre con el metodo super

        super(nombre, raza, color);

        this.habilidadEspecial = habilidadEspecial;


    }

}