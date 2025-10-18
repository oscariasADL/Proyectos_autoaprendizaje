
//Ahora se puede pasar parametros por defecto como argumentos, puede ser cualquier cosa, objetos funciones etc.
function saludo(mensaje = "Hola mundo desde el parentesis", tiempo = 1500){

    //ES5
    //mensaje = mensaje || "Hola Mundo";
    //tiempo = tiempo || 2000;

    //mensaje = ( mensaje !== undefined) ? mensaje : "Hola mundo two"
    


    setTimeout(function(){
        console.log("=".repeat(20));
        console.log(mensaje);
        console.log("=".repeat(20));
    }, tiempo);


}

saludo();



/*
setTimeout(function(){
    console.log("=".repeat(20));
}, 2000);

*/

function saludarTwo( fn = fnTemporal){

    if( typeof fn === "undefined" ){
        console.error("No es una funcion");
        return;
    }

    fn();
}


function fnTemporal(){
    console.log("Hola mundo desde una funcion temporal");
}


saludarTwo();