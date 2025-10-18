/* SETS */

/* Los sets son una lista ordenada de valores sin duplicado */

let items = new Set();

items.add(10);
items.add(14);
items.add(8);
items.add(7);
items.add(7);
items.add(7);
items.add(7);
items.add("7");

console.log( items.size )
console.log( items )


/* Buscar directamente en el set sin FOR */

let itemsTwo = new Set( [ 1,2,3,4,5,6,7,7 ] );
console.log( itemsTwo.has("7") )




/* REMOVER ITEMS DE UN SET */

console.log(" ".repeat(10))
console.log("=".repeat(10))
console.log(" ".repeat(10))

let itemsThree = new Set([1,2,3,4,5]);

console.log("Tamaño del set: " + itemsThree.size )

itemsThree.delete( 3 )

console.log("Nuevo tamaño del set: " +  itemsThree.size )
console.log( itemsThree )

//Borrar todos los item
//itemsThree.clear();




/* FOR EACH EN LOS SETS */

console.log(" ".repeat(10))
console.log("=".repeat(10))
console.log(" ".repeat(10))

let personas = new Set([ "Fernando", "Maria", "Susana" ]);

personas.forEach( function( valor, llave, SetOriginal ){

    console.log( valor, llave, SetOriginal)

})




/* CONVERTIR UN SET EN ARRAY */

console.log(" ".repeat(10))
console.log("=".repeat(10))
console.log(" ".repeat(10))


let numeros = [1,2,3,4,5,6,7,8];

let setNumeros = new Set( numeros );

console.log( setNumeros )

let arrayNumeros = [ ...setNumeros ]

console.log( arrayNumeros )



let numerosTwo = [1,2,3,4,5,6,7,7,7,7,5,5,5,3,3,3,6,1]

let arraNumerosTwo = eliminaDuplicados( numerosTwo );

console.log( arraNumerosTwo )

function eliminaDuplicados( items ){

    let set = new Set(items)
    return [...set];

    //return [ ... new Set(items) ]

}




/* WEAK SETS */

/* ES IGUAL PERO SOLO SE PUEDE ENVIAR OBJETOS */

console.log(" ".repeat(10))
console.log("=".repeat(10))
console.log(" ".repeat(10))


let gente = new Set("fernando");
console.log( gente );


let gente2 = new Set(["fernando","Maria"]);
 
gente2.clear(1);
 
console.log( gente2 );
