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
    constructor(nombre = 'Sin Nombre' , codigo = 'Sin Código', frase = 'Sin Frase') {
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

class Heroe extends PersonaNatural {
    clan = 'Sin Clan';

    constructor( nombre, codigo, frase ) {
        super( nombre, codigo, frase );
        this.clan = 'Los Avengers';
    }
}



//const spiderman = new PersonaNatural('Peter Parker', 'Spiderman', 'Soy tu amigable vecino Spiderman');

const spiderman = new Heroe('Peter Parker', 'Spiderman', 'Soy tu amigable vecino Spiderman');
spiderman.quienSoy();

console.log(spiderman);