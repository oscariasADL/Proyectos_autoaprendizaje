//FUNCIONES
//Serie de instrucciones que se ejecutan al ser llamadas cuando la necesitemos
// Agrupacion reutilizable de un conjunto de instrucciones


//RETURN es un valor que devuelve cuando se ejecuta la funcion
//Se puede guardar en una variable
/*
function nombreFuncion(){
    console.log("Hola, Abuela");
    console.log("Como estas?");
    console.log("Me pasas la receta de la torta de chocolate?");

    return "Abuela saludada correctamente";
};

nombreFuncion();

var resultado = nombreFuncion(); //Captura el valor que devuelve la funcion (Return)
//Si usas miFuncion() con paréntesis, almacenas el resultado del return.
//Si usas miFuncion sin paréntesis, almacenas la función misma (sin ejecutarla).

console.log(resultado);
*/





//PARAMETROS
//Son valores que se le pasan a la funcion para que esta los utilice
/*
function saludoDos(nombre, receta){
    console.log("Hola abuela, " + nombre);
    console.log("Como estas?");
    console.log("Me pasas la receta de tu " + receta + "?");

    return "abuela "+nombre+" saludada correctamente";
}

var resultado = saludoDos("Maria", "torta de chocolate");
console.log(resultado);
saludoDos("Ana", "torta de limon");
*/





//PARAMETROS OPCIONALES
//Se pueden definir valores por defecto en los parametros de la funcion
/*
function saludoDos(nombre = "Antonia", receta = "torta de vainilla"){//Si no se le pasa un valor, toma el valor por defecto
    console.log("Hola abuela, " + nombre);
    console.log("Como estas?");
    console.log("Me pasas la receta de tu " + receta + "?");
    console.log("------------------------------------------------");
    return "abuela "+nombre+" saludada correctamente";

    //console.log("ESTO NUNCA SE EJECUTA PORQUE RETURN CORTA LA FUNCION");
}

let resultado = saludoDos();
console.log(resultado);

saludoDos("Ana", "torta de limon");
*/





//FUNCIONES DENTRO DE OTRAS FUNCIONES
/*
function operaciones(numero1, numero2){
    //Aquí se declara una variable tipo objeto (resultados) con cuatro propiedades. Cada propiedad contiene el 
    //resultado de una operación matemática usando los parámetros de entrada.
    let resultados ={
        "suma": numero1 + numero2,
        "resta": numero1 - numero2, 
        "multiplicacion": numero1 * numero2,
        "division": numero1 / numero2
    };
    return resultados;
}



function porConsola(numero1, numero2){

    let resultadosOperaciones = operaciones(numero1, numero2);

    console.log("Suma: " + resultadosOperaciones.suma);
    console.log("Resta: " + resultadosOperaciones.resta);
    console.log("Multiplicacion: " + resultadosOperaciones.multiplicacion);
    console.log("Division: " + resultadosOperaciones.division);
    console.log("------------------------------------------------");

    return true;
}

function porPantalla(numero1, numero2){

    let resultadosOperaciones = operaciones(numero1, numero2);

    //documen.write escribe en el documento HTML
    document.write("<h3>"+"Suma: " + resultadosOperaciones.suma + "<br></h3>");
    document.write("Resta: " + resultadosOperaciones.resta + "<br>");
    document.write("Multiplicacion: " + resultadosOperaciones.multiplicacion + "<br>");
    document.write("Division: " + resultadosOperaciones.division + "<br>");
    document.write("------------------------------------------------");
    return true;
}



function calculadora(numero1, numero2, mostrar){
    if(mostrar == false){
        porConsola(numero1, numero2);
    } else{
        porPantalla(numero1, numero2);
    }
    
    return true;
}

//calculadora(7, 9);
calculadora(7, 12, true);
*/



//Reto tecnico

function calculosAvanzados(numero1, numero2){

    let objetoCalculos ={
        "potencia" : numero1 ** numero2,
        "raizCuadrada" : Math.sqrt(numero1),
        "raizCubica" : Math.cbrt(numero2),
    }

    return objetoCalculos;

};

function imprimirResultado(numero1, numero2){

    let resultado = calculosAvanzados(numero1, numero2);

    console.log(`La potencia de ${numero1} elevado a ${numero2} es: ${resultado.potencia}`);
    console.log(`La raíz cuadrada de ${numero1} es: ${resultado.raizCuadrada}`);
    console.log(`La raíz cúbica de ${numero2} es: ${resultado.raizCubica}`);

};

imprimirResultado(9, 3);