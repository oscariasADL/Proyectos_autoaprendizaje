/* PROMESAS */

/* Una promesa es un objeto que representa la eventual finalización (o falla) de una operación asíncrona y su valor resultante. Las promesas son una forma de manejar operaciones asíncronas en JavaScript, permitiendo un código más limpio y fácil de entender. */

/* Ejemplo básico de una promesa */

/* ES5 */

function tareaAsincrona() {

  setTimeout(function(){
    console.log('Tarea asincrona terminada');
    resolve();
  },1300);

}

tareaAsincrona();

console.log('Código síncrono');

function resolve(){
  console.log('Promesa resuelta');
}

function reject(){
  console.log('Promesa rechazada');
}





/* ES6 */

function tareaAsincrona2() {

  let promesa = new Promise( (resolve, reject) => {

    setTimeout(function(){
      console.log(" ".repeat(50));
      console.log("=".repeat(50));
      console.log(" ".repeat(50));
      console.log("Tarea asincrona2 terminada");
      resolve();
    },1300);

  });

  return promesa;

}

tareaAsincrona2().then( function(){
  console.log("Promesa2 resuelta");
}, function(){
  console.log("Promesa2 rechazada");
} );