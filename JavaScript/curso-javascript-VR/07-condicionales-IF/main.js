//CONDICIONALES


//-----------------------------------
//Condicional IF
//Si A es igual a B entonces hacer algo


//Ejemplo1:

let estaLLoviendo = true;

if(estaLLoviendo){// es igual que decir esta lloviendo == true, por defecto evaluara si es true

    console.log("Llevar paraguas");
} else {
    console.log("No llevar paraguas");
}


//Ejemplo2:

let cebolla = false

if(!cebolla){// es igual que decir cebolla === false, por defecto evaluara si es false o es igual que decir cebolla != true
    console.log("Tu hamburguesa NO llevara cebolla");
} else {
    console.log("Tu hamburguesa Llevara cebolla");
}


//Ejemplo3:

let nombre = "Juan Perez";
let edad = 69;

if(edad >= 18){

    console.log(nombre + " es mayor de edad");

    //Para Ejecutar este bloque de condiciones se debe cumplir la principal es decir edad >= 18
    if(edad <= 20){
        console.log("Es un adolescente");
    }else if(edad >=55){
        console.log("Es un adulto mayor");
    }
    else{
        console.log("Es un adulto joven");
    }

} else {
    console.log(nombre + " es menor de edad");
}


//Ejemplo4:

let buenTiempo = true;

if(!buenTiempo){
    console.warn("NO Vamos al parque");
}


//Ejemplo5:

let year = 2087;

if(year >= 2000 && year <= 2030){
    console.log("Estamos en la era moderna");
} else if(year > 2030){
    console.log("Estamos en la era POST moderna");
}else{
    console.log("Estamos en la era antigua");
}


//Ejemplo6:

if(year == 2007 || year == 2017 || year == 2027 || year == 2037){
    console.log("El año termina en 7");
} else{
    console.log("El año NO termina en 7");
}














//-----------------------------------
