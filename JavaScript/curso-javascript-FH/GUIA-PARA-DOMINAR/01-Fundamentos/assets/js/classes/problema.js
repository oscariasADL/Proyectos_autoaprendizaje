const fher = {
    nombre: 'Fernando',
    edad: 35,
    saludar() {
        console.log( `Hola, me llamo ${ this.nombre } y tengo ${ this.edad } años` );
    }
}

const Pedro = {
    nombre: 'Pedro',
    edad: 15,
    saludar() {
        console.log( `Hola, me llamo ${ this.nombre } y tengo ${ this.edad } años` );
    }
}

fher.saludar();
Pedro.saludar();

/* ES5 */
function Persona( nombre, edad ) {
    this.nombre = nombre;
    this.edad = edad;

    this.saludar = function() {
        console.log( `Hola, me llamo ${ this.nombre } y tengo ${ this.edad } años` );
    }
}

const maria = new Persona( 'María', 18 );
maria.saludar();
