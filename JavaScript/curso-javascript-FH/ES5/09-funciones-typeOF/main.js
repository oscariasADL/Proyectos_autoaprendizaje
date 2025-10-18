/* FUNCIONES TYPE OF */

function identifica( param ){

    if( typeof param == "function" ){
        param();
    }else{
        console.log( param )
    }

    /*Comparar dos objetos, si el objeto es de x tipo*/
    console.log("*************")
    console.log( typeof param )
    console.log( param instanceof Persona)

}

function Persona(){

    this.nombre = "Oscar"
    this.edad = 31;

}

var oscar = new Persona();

identifica( oscar );