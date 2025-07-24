//PROGRAMACION ORIENTADA A OBJETOS
//Molde
var Gato = /** @class */ (function () {
    function Gato() {
        //Propiedades o atributos(caracteristicas)
        this.nombre = "Bella";
        this.raza = "Abiusinio";
        this.color = "marron";
    }
    //Metodos (Acciones)
    Gato.prototype.maullar = function () {
        console.log("".concat(this.nombre, " dice: miau miau"));
    };
    Gato.prototype.saltar = function () {
        console.log("".concat(this.nombre, " ha saltado"));
    };
    return Gato;
}());
