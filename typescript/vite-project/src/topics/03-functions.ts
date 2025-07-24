
/*
function addNumbers( a: number, b:number ){
    return a + b;
}

const addNumbersArrow = (a: number, b: number ):string => {
    return `${ a + b }`;
}

function multiplyNumbers( firsNumber: number, secondNumber?: number, base: number = 2){
    return firsNumber * base;
}
*/
/*
const result: number = addNumbers(2, 10);
const result2: string = addNumbersArrow(5, 10);
const multiplyResult: number = multiplyNumbers(6, 3, 3);
console.log(`The result is: ${result} and the result2 is: ${result2} and the multiplyResult is: ${multiplyResult}`);
*/



//FUNCIONES CON OBJETOS COMO PARÁMETROS

interface Personaje {
    name: string;
    hp: number;
    showHp: () => void;
}

const saludPersonaje = ( personaje: Personaje, cantidad: number ) => {

    personaje.hp += amount;

}

const trancos: Personaje = {
    name: 'Aragorn',
    hp: 100,
    showHp() {
        console.log(`Puntos de vida: ${this.hp}`);
    }
}

export{};