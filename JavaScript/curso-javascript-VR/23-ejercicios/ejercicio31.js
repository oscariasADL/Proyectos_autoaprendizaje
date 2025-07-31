/*
Ejercicio 31:

Crea un semaforo con tres luces (rojo, amarillo y verde) Haz los circulos del semaforo con html y css

Cuando un peaton quiere cruzar la calle debe pulsar un boton
Crea un boton para cambiar el color de las luces del semafoto 
Secuencialmente de rojo a verde pasando por amarillo

Entonces el semaforo siempre empieza en rojo
Cuando haces click en el boton, pasara a amarillo
Al hacer click otra vez, pasa a verde, y asi todo el rato

*/


let boton = document.querySelector('#btnSemaforo');
let luces = document.querySelectorAll('.luz');
let indice = 0;


boton.addEventListener('click', () => {
    
    //Retirar luces activas
    luces.forEach(luz => luz.classList.remove("activa"))

    indice ++;

    if(indice >2){
        indice=0;
    }

    //Encender Luces
    luces[indice].classList.add("activa")

    

})