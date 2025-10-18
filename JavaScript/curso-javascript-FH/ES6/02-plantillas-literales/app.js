
function etiqueta (literales, ...substituciones){

    let resultado = ""

    console.log(literales)
    console.log(substituciones)

for (let i = 0; i < substituciones.length; i++) {

    resultado += literales[i];
    resultado += substituciones[i]

}

    return resultado

} 

let unidades = 5,
    costo_unitario = 10;

let mensaje = etiqueta` ${unidades} lapices cuesta ${unidades * costo_unitario} pesos`
console.log(mensaje)



// VALORES CRUDOS O VALORES RAW

console.log( "=".repeat(10) )

let mensaje1 = `Hola \nMundo\\`,
    mensaje2 = String.raw`Hola \nMundo\\`

console.log(mensaje1)
console.log(mensaje2)