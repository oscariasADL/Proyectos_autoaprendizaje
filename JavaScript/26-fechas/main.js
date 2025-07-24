//OBJETO DATE

let fechaActual = new Date();

console.log(fechaActual.getFullYear())
console.log(fechaActual.getMonth())//COMO ARRAY DESDE 0
console.log(fechaActual.getDate())
console.log(fechaActual.getHours())
console.log(fechaActual.getMinutes())
console.log(fechaActual.getSeconds())


console.log(`Fecha completa: ${fechaActual.getDate()}/${fechaActual.getMonth()+1}/${fechaActual.getFullYear()}`)