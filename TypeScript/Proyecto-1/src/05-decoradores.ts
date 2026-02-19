//Los decoradores son funciones que se pueden aplicar a clases, métodos, propiedades o parámetros
//para modificar su comportamiento o añadirles funcionalidades adicionales.



//Decorador basico
function DecoradorTurbo(target:any){
    console.log("Decorador Turbo aplicado", target.name);
}
//@DecoradorTurbo


//Decorador con parametros
function DecoradorConParametros(parametro: string) {
    return function(target: any) {
        console.log(`Decorador con parametro: ${parametro}`, target.name);
    }
}
//@DecoradorConParametros("Mi Decorador Personalizado")


//Decorador de metodo
// Es un decorador que se aplica a un método de una clase
function agretarMetodo(target:any){
    target.prototype.acelerar = function() {
        console.log("Acelerando el coche desde un metodo decorado");
    }
}

interface Coche {
    acelerar: () => void;
}

@agretarMetodo


class Coche {
    constructor(){
        console.log("Coche creado");
    }
}

let miCoche = new Coche(); // Al crear una instancia de Coche, se ejecuta el decorador y muestra "Coche creado"
miCoche.acelerar(); // Marca error al no existir el método acelerar en la instancia de Coche, se corrige con una interfaz extendida por el decorador

//Otra manera de corregir el error es:
//(miCoche as any).acelerar()
//let miCoche:any = new Coche();

