
var saludo = "Hola Mundo!"

console.log( saludo.substr(0,1) === "H" ) //Devuelve true

//ES6

console.log( saludo.startsWith("H") ); //Devuelve true
console.log( saludo.endsWith("!") ); //Devuelve true
console.log( saludo.includes("Mundo") ); //Devuelve true -> Antes indexOF


//console.log( saludo.startsWith("Mu",5) ) Retorna true pues inicializa en el 5


//REPEAT

let texto  = "Hola";
console.log( texto.repeat(2) )
console.log( "=".repeat(10) )

const ESPACIOS = 12;

let nombres = [ "Oscar", "Eduardo", "Arias" ];
let telefonos = [ "999999999", "888888888", "777777777" ];

for( i in nombres ){

    let dif = ESPACIOS - nombres[i].length;
    
    console.log( nombres[i] + " ".repeat(dif) + "|" + telefonos[i] );
}