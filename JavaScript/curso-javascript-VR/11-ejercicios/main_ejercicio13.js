/*
Ejercicio 13

Tengo un kanguro que salta 3 metros cada vez.

Haz un programa que me diga cuantos saltos ha dado el kanguro...

y cuale es la distancia total que ha recorrido tras 17 saltos.

*/


let distancia = 3;
let saltos = 17;   

let distanciaRecorrida = 0;

for (let i = 1  ; i <= saltos; i++) {
    distanciaRecorrida += distancia;

    console.log(`Salto ${i} - Distancia recorrida: ${distanciaRecorrida} metros`);
}