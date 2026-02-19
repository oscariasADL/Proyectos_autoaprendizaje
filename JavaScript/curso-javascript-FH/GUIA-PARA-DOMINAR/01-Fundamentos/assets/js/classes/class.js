class PersonaNatural {

    //Los metodos estaticos son aquellos que no necesitan instanciar la clase para ser usados
    static _conteo = 0;
    static get conteoDesdeGet() {
        return PersonaNatural._conteo + ' instancias';
    }
    static mensaje() {
        console.log('Hola a todos, soy un método estático');
    }

    //Estas son las propiedades de la clase, se definen dentro de la clase pero fuera del constructor
    nombre='';
    codigo='';
    frase='';
    comida='';

    //El constructor es un método especial para crear e inicializar un objeto creado a partir de una clase
    constructor(nombre, codigo, frase) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.frase = frase;

        PersonaNatural._conteo++;
    }

    //Los setters y getters son métodos especiales para establecer y obtener valores de las propiedades de la clase
    //El set es para asignar valores
    set setComidaFavorita( comida ) {
        this.comida = comida.toUpperCase();
    }

    //El get es para obtener valores
    get getComidaFavorita() {
        return `La comida favorita de ${ this.nombre } es ${ this.comida }`;
    }

    //Los métodos son funciones que se definen dentro de la clase, y pueden usar las propiedades de la clase
    quienSoy() {
        console.log(`Soy ${ this.nombre } y mi identidad es ${ this.codigo }`);
    }

    miFrase() {
        this.quienSoy();
        console.log(`${ this.codigo } dice: ${ this.frase }`);
    }
}

const spiderman = new PersonaNatural('Peter Parker', 'Spiderman', 'Soy tu amigable vecino Spiderman');
const ironman = new PersonaNatural('Tony Stark', 'Ironman', 'Yo soy Ironman');
const blackpanther = new PersonaNatural('TChalla', 'BlackPanther', 'Soy el rey de Wakanda');

console.log( spiderman );
console.log( ironman );

spiderman.miFrase();

spiderman.setComidaFavorita = 'El pie de cereza de la tía May';
console.log( spiderman );
console.log( spiderman.getComidaFavorita );

console.log("*".repeat(20));
console.log("Conteo statico: ", PersonaNatural._conteo );
console.log( PersonaNatural.conteoDesdeGet );
PersonaNatural.mensaje();




