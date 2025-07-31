//FETCH (Ajax)
//Un código sincrónico se ejecuta línea por línea, en el orden en que fue escrito. Cada operación bloquea la ejecución hasta que se complete. Es decir, no se pasa a la siguiente línea hasta que la anterior termine.

//El asincronismo permite ejecutar tareas que toman tiempo (como leer archivos, hacer peticiones HTTP, esperar temporizadores), sin bloquear el resto del código. Es clave para tener una interfaz fluida y responsive.
//Un código asincrónico puede iniciar una tarea y continuar ejecutando otras líneas de código mientras espera que esa tarea se complete. Cuando la tarea finaliza, se ejecuta un callback o se resuelve una promesa.


//Sacar datos de manera asincrona GET
let idUser= 2;

fetch("https://reqres.in/api/users/"+idUser, {
    method: "GET",
    headers: {
      "x-api-key": "reqres-free-v1", // Aquí va tu clave
      "Content-Type": "application/json"
    }
})
.then(response => response.json())
.then(usuario => {
  console.log(usuario.data)
  mostrarUsuario(usuario.data);
})
.catch(error => {
  console.error("Error:", error)
});

function mostrarUsuario(user){
  let caja = document.querySelector("#caja");

  caja.innerHTML = `
    <h2>${user.first_name} ${user.last_name}</h2>
    <img src="${user.avatar}"/>
  `
}


//Enviar datos de manera asincrona POST

const usuarioGuardar = {
  name: "Oscar Arias",
  job: "Desarrollador FrontEnd"
}

fetch("https://reqres.in/api/users/", {
    method: "POST",
    headers: {
      "x-api-key": "reqres-free-v1", // Aquí va tu clave
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuarioGuardar)
})
.then(response => response.json())
.then(data => {
  console.log(data)
})
.catch(error => {
  console.log(error)
})


//Sintaxis de promesas con Async y Await

// Función asíncrona para obtener un usuario todo el codigo debe estar dentro de una función asíncrona
//Await espera a que se resuelva la promesa

async function sacarUsuarios(){

  //Try es para probar el código y Catch para capturar errores
  try {
    let response = await fetch("https://reqres.in/api/users?page=2", {
      method: "GET",
      headers: {
        "x-api-key": "reqres-free-v1", // Aquí va tu clave
        "Content-Type": "application/json"
      }
    });
    let data = await response.json();

    data.data.forEach (user => {
      console.log(user);
    })

  } catch (error) {
    console.log(error);
  }

}

sacarUsuarios();