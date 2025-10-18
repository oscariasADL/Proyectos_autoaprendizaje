/* FUNCIONES ANONIMAS */

( function(){

var a = 10;

console.log(a)

function cambiarA() {

    a = 20;

}

cambiarA();

console.log(a)

})();




/* OTROS TIPOS DE FUNCIONES ANONIMNAS */

function ejecutarFuncion(fn) {
    
    if (fn() === 1) {
        
        console.log('Funcion ejecutada correctamente')
        
    } else {
        
        console.log('Funcion ejecutada con error')
        
    }
    
}

ejecutarFuncion( function() {
    console.log('Funcion ejecutada');
    return 1;
});