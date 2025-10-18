/* CAMBIAR EL PROTOTIPO DE UN OBJETO */

let gato = {

    sonido(){
        console.log("¡MIAU!")
    },

    chillido(){
        console.log("¡MIAUUUU!")
    }

}

let perro = {

    sonido(){
        console.log("¡GUAU!")
    },

}

let angora = Object.create( gato )
console.log( Object.getPrototypeOf(angora ) === gato )

angora.sonido();
angora.chillido();
console.log("=".repeat(50))

Object.setPrototypeOf( angora, perro );

console.log( Object.getPrototypeOf(angora ) === gato )
angora.sonido();
//angora.chillido();
console.log("=".repeat(50));



/ ACCESO AL PROTOTIPO REFERENCIA "SUPER" /

let persona = {

    saludar(){
        return "HOLA, ";
    }

}

let amigo = {

    saludar(){
        //ES5
        //return Object.getPrototypeOf(this).saludar.call(this) + "Care guama";

        //ES6
        return super.saludar() + "Care papa";
    }

}

Object.setPrototypeOf( amigo, persona)
console.log( amigo.saludar() )