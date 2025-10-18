/* QUE ES ASYNC O COMO FUNCIONAN */

/* En JavaScript, la palabra clave async se usa para declarar una función asíncrona, lo que significa que puede contener operaciones que no se ejecutan de inmediato, como llamadas a APIs, temporizadores, o cualquier tarea que tome tiempo. */

/* Una función marcada con async siempre devuelve una promesa. Dentro de esa función puedes usar await para esperar el resultado de una operación asincrónica sin bloquear el resto del código. */

const getNombre = async () => {

    return new Promise((resolve, reject) => {
       
        setTimeout(() => {
            resolve("Juan Pérez");
        }, 2000);

    });

};

const saludo = async () => {

    let nombre = await getNombre();
    return `Hola, ${nombre}`;

};

saludo().then( mensaje => {

    console.log(mensaje);

});


/*
async function obtenerDatos() {
  try {
    let res = await fetch("https://reqres.in/api/users?page=2");
    let data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
}

obtenerDatos();
*/