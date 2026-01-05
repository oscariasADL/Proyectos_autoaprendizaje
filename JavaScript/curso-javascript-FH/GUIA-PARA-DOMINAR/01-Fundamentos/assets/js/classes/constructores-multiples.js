class Persona {

    //Usamos un método estático para crear una nueva instancia a partir de un objeto, y desestructurarlo para asignar sus valores
    static porObjeto({ nombre, apellido, pais }) {
        return new Persona( nombre, apellido, pais );
    }

    constructor(nombre, apellido, pais) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.pais = pais;
    }

    getInfo() {
        return `info: ${this.nombre} ${this.apellido} de ${this.pais}`;
    }

}

const nombre1 = 'Tony';
const apellido1 = 'Stark';
const pais1 = 'USA';

const nombre2 = {
    nombre: 'Peter',
    apellido: 'Parker',
    pais: 'CALIFORNIA'
}

const persona1 = new Persona(nombre1, apellido1, pais1);
//const persona2 = new Persona(nombre2.nombre, nombre2.apellido, nombre2.pais);
const persona2 = Persona.porObjeto( nombre2 );

console.log(persona1.getInfo());
console.log(persona2.getInfo());