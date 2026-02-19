//Las funciones en typeScript son similares a JavaScript, pero con la ventaja de que se pueden definir tipos de datos para los parámetros y el valor de retorno.

function getNombre(miNombre: string = "Oscar Arias"): string {
    return miNombre;
}
console.log(getNombre()); // "Oscar Arias"


// Tambien se puede definir una funcion como una variable
let miFuncion = (paramaetro: string = "Oscar Arias"): number => {
    return parseInt(paramaetro);
}
miFuncion("11");