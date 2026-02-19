(() => {

    /* En TypeScript, una interfaz (interface) es una forma de definir la estructura que debe tener un objeto o clase, sin implementar su lógica. Sirve para describir el tipo de datos, sus propiedades, y cómo se espera que se comporten. */

    interface Hero {
        name: string;
        age?: number;
        powers: number[];
        getName?: () => string;
    }


    let flash: Hero  = {
        name: 'Barry Allen',
        age: 24,
        powers: [1,2]
    } 

    let superman: Hero  = {
        name: 'Clark Kent',
        age: 60,
        powers: [1],
        getName() {
            return this.name;
        }
    }




})()