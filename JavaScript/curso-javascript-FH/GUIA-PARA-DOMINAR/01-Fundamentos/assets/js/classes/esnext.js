class Rectangulo {

    //Propiedades
    //Las propiedades privadas se declaran con #, sirven para que no puedan ser accedidas desde fuera de la clase
    #area = 0;

    //Método especial para crear e inicializar un objeto creado a partir de una clase
    constructor( base = 0, altura = 0 ) {
        this.base = base;
        this.altura = altura;
        this.#area = base * altura;
    }

}

const rect1 = new Rectangulo(10, 15);
console.log(rect1);