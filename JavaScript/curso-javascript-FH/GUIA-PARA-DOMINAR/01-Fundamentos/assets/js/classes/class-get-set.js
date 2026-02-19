//Ejemplo de clase
class Coche {

    marca='';
    modelo= '';
    anio=0;

    constructor(marca, modelo, anio){
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
    }

    mostrarInfo(){
        console.log(`El coche es de la marca ${ this.marca }, modelo ${ this.modelo }, año ${ this.anio }`);
    }

}


class ElectricoTwo extends Coche {
    constructor(marca, modelo, anio, autonomia) {
        super(marca, modelo, anio);
        this._autonomia = autonomia;
    }

    get autonomia() {
        return `${this._autonomia} km`;
    }

    set autonomia(valor) {
        if (typeof valor !== "number" || valor <= 0) {
            console.log("La autonomía debe ser un número positivo.");
            return;
        }
        this._autonomia = valor;
    }

    get anio() {
        return `Año: ${this._anio}`;
    }

    set anio(valor) {
        if (typeof valor !== "number" || valor < 1886) {
            console.log("El año debe ser un número válido mayor o igual a 1886.");
            return;
        }
        this._anio = valor;
        //Asignar el valor a la clase padre
        // super.anio = valor; // Asignamos al padre
    }

}

const teslaTwo = new ElectricoTwo("Tesla", "Model S", 2022, 600);
console.log(teslaTwo.autonomia); // "600 km"
console.log(teslaTwo.anio);      // "Año: 2022"
teslaTwo.anio = 1800;            // El año debe ser un número válido mayor o igual a 1886.
teslaTwo.anio = 2023;
console.log(teslaTwo.anio);      // "Año: 2023"
teslaTwo.autonomia = -100;       // La autonomía debe ser un número positivo.
teslaTwo.autonomia = 700;
console.log(teslaTwo.autonomia); // "700 km"
