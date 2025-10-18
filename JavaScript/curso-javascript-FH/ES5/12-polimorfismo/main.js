/* POLIMORFISMO */
/* El polimorfismo es un concepto de la programación orientada a objetos (OOP), pero también se aplica en el desarrollo frontend, especialmente cuando trabajas con JavaScript, TypeScript, o frameworks como React, Vue, etc. */

function determinaDato( valor ){

    if( valor === undefined ){
        console.log("Valor es undefined")
    }
    
    if(typeof valor === "number"){
        console.log("Valor es un numero y puede hacer operaciones")
    }

    if(typeof valor === "string"){
        console.log("Valor es un texto y puede hacer operaciones")
    }

    if(typeof valor === "object"){
        console.log("Valor es un objeto... pero puede ser cualquier cosa")

        if( valor instanceof Number ){
            console.log("A es un objeto numerico...")
        }

    }    

}

var b = new Number(3);

console.log(b)

determinaDato(b);