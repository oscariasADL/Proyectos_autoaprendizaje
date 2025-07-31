//CONDICIONALES


//-----------------------------------
//Condicional SWITCH

let miDesayuno = 8;//"aaaaa"para string

switch (miDesayuno){

    case 1: //case "aaaaa": para string
        console.log("Has elegido café con tostadas")
        //un bloque de instrucciones
        break;

    case 2:
        console.log("Has elegido café con churros")
        //un bloque de instrucciones
        break;

    case 3:
        console.log("Has elegido café con magdalenas")
        //un bloque de instrucciones
        break;
    
    default:
        console.log(" has elegido otro desayuno diferente")
        //un bloque de instrucciones
        break;  
}

//Condicional ternario

let nombre = "Juan";
let edad = 18;

let resultado = (edad >= 18) ? "Es mayor de edad" : "Es menor de edad";
console.log(resultado);



//Diferencia entre var y let (alcance / bloques)

//Las variables declaradas con var tienen un alcance de función
//Las variables declaradas con let tienen un alcance de bloque

let curso = "master en JS";

if( "hola" == "hola"){
    curso = "master en PHP";
};
console.log(curso);