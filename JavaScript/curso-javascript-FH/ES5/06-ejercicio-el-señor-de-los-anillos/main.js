/* DECLARAR JUGADORES*/

function Jugador( nombre ){

    this.nombre = nombre;
    this.pv = 100;
    this.sp = 100;

    this.curar = function ( jugadorObjetivo ) {

        if( this.sp >= 40 ){
            this.sp -= 40;
            jugadorObjetivo.pv = jugadorObjetivo.pv + 20;
        }else{
            console.warn( this.nombre + " no tiene sp" );
        }
        this.estado( jugadorObjetivo )

    }

    this.tirarFlecha = function( jugadorObjetivo ){

        if(jugadorObjetivo.pv > 40){
            jugadorObjetivo.pv -= 40;
        }else{
            jugadorObjetivo.pv = 0;
            console.error ( jugadorObjetivo.nombre + " ha muerto !!!!")
        }
        this.estado( jugadorObjetivo );

    }

    this.estado = function( jugadorObjetivo ){
        console.info( this );
        console.info( jugadorObjetivo );
    }
       
}

var gandalf = new Jugador("Gandalf")
var legolas = new Jugador("Legolas")
var aragorn = new Jugador("Aragorn")

console.log(gandalf);
console.log(legolas);
console.log(aragorn);
console.log(" ")
console.log("***************")
console.log(" ")

