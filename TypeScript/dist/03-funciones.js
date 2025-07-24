//Las funciones en typeScript son similares a JavaScript, pero con la ventaja de que se pueden definir tipos de datos para los parámetros y el valor de retorno.
function getNombre(miNombre) {
    if (miNombre === void 0) { miNombre = "Oscar Arias"; }
    return miNombre;
}
console.log(getNombre()); // "Oscar Arias"
// Tambien se puede definir una funcion como una variable
var miFuncion = function (paramaetro) {
    if (paramaetro === void 0) { paramaetro = "Oscar Arias"; }
    return parseInt(paramaetro);
};
miFuncion("11");
