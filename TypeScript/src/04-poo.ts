//PROGRAMACION ORIENTADA A OBJETOS


//Molde

class Gato { //Las clases siempre inician en mayus

    private nombre: string; //Propiedad privada, solo accesible dentro de la clase
    private raza: string; //Propiedad privada
    private color: string; //Propiedad privada

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