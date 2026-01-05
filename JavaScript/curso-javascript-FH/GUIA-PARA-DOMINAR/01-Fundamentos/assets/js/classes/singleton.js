//Un singleton es una clase que solo puede tener una instancia
class Singleton {
    static instance;
    nombre = 'I am the only instance';

    constructor( nombre='' ) {
        if ( !!Singleton.instance ) {
            return Singleton.instance;
        }
        Singleton.instance = this;
        this.nombre = nombre;
    }
}

const instancia1 = new Singleton('Ironman');
const instancia2 = new Singleton('Spiderman');

console.log(`Nombre en la instancia 1: ${instancia1.nombre}`); // Ironman
console.log(`Nombre en la instancia 2: ${instancia2.nombre}`); // Ironman
console.log(`¿Son la misma instancia?: ${instancia1 === instancia2}`); // true