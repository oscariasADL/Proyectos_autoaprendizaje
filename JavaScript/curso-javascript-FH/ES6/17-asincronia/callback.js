/* CALLBACKS */

/* Un callback es una función que se pasa como argumento a otra función y que se ejecuta después de que se completa una operación, generalmente asíncrona. Los callbacks permiten manejar la asincronía en JavaScript, aunque pueden llevar a código difícil de mantener si se anidan demasiado (callback hell). */

/* Ejemplo básico de un callback */

/* ES6*/

function saludar(nombre, callback) {
  console.log('Hola ' + nombre);
  callback();
}

function despedir() {
  console.log('Adiós!');
}

saludar('Oscar', despedir);


/* Ejemplo 2 */

console.log(" ".repeat(10));
console.log("=".repeat(10));
console.log(" ".repeat(10));

const getUsuarioById = (id, callback) => {

  const usuario = {
    nombre: 'Oscar',
    id
  };

  if( id === 20 ){
    callback(`El usuario con id ${id}, no existe en la base de datos`);
  } else{
    callback( null, usuario );
  }

  

};

getUsuarioById(1, (err, user) => { 

  if( err ){
    return console.log(err);
  }

  console.log('Usuario de base de datos', user);

});

console.log(" ".repeat(10));
console.log("=".repeat(10));
console.log(" ".repeat(10));