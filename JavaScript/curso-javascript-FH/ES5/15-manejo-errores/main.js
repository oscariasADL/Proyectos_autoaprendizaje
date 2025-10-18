/* MANEJO DE ERRORES EN JAVASCRIPT */

try{

    var a = 103;
    
    if( a === 103 ){
        throw 'Que mal';
    }else{
        throw 'oh oh';
    }
    
}
catch(e){

    if( e === "Que mal" ){
        console.log("Error tipo 1")
    }

    if( e === "oh oh" ){
        console.log("Error tipo 2")
    }

}
finally{

    console.log("Finalmente")

}

/* ⚠️ ¿Qué detalles o "errores" hay?
1. throw lanza un string, no un objeto Error
Aunque lanzar un string es válido, no es una buena práctica. Lo ideal es lanzar un objeto Error para tener más contexto (como stack trace).*/




/*🧩 Versión mejorada (buena práctica):*/

console.log("******")
try {
    var b = 100;

    if (b === 103) {
        throw new Error("Que mal");
    } else {
        throw new Error("oh oh");
    }

    console.log("El valor de a:", a); // No se ejecuta porque esta despues del throw

} catch (e) {
    if (e.message === "Que mal") {
        console.log("Error tipo 1");
    }

    if (e.message === "oh oh") {
        console.log("Error tipo 2");
    }

} finally {
    console.log("Finalmente");
}



/* El throw tambi en es capaz de almacenar un objeto o funcion */

console.log(" ")
console.log("******")
console.log(" ")
try{

    throw{
        nombrerror: "Error de objeto",
        accion: "salir corriendo",
        code: 1
    }

}
catch( e ){

    console.log(e);
    console.log(e.nombrerror);
    console.log(e.accion);
    console.log(e.code);

} finally {

     console.log("Finalmente");
    
}