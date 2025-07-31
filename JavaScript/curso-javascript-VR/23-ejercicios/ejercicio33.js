/*
Ejercicio 33:

Crea un programa donde tengas un botón que cuente cu´pantas veces lo has pulsado.

Cuando llegues a 17 clics, se muestra un mensaje de "limite alcanzado !"

Si se sobre pasa el contador se resetea y el contador comienza de nuevo

*/

document.addEventListener("DOMContentLoaded", ()=> {
    
    let boton = document.querySelector("#butonAumentar");
    let interfaz = document.querySelector("#mostrar");
    let contador = 0;

    boton.addEventListener("click", ()=>{

        contador ++;
        

        if( contador === 17){
            alert("Limite alcanzado")
            contador = 0;
        }else{
            interfaz.textContent = contador;
        }

    })

});