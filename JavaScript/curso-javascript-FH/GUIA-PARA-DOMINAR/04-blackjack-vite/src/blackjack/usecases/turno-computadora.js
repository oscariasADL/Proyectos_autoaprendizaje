import { pedirCarta } from "./pedir-carta.js";
import { acumularPuntos } from "./acumular-puntos.js"; 
import { crearCarta } from "./crear-carta.js";

//Turno de la computadora
export const turnoComputadora = (puntosMinimos, deck, puntosJugadores, puntosHtml, divCartasJugadores)  => {

    if (!puntosMinimos) throw new Error('Puntos mínimos son necesarios');
    if (!deck) throw new Error('Deck es necesario');

    let puntosComputadora = 0;

    do {
        const carta = pedirCarta(deck);
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1, puntosJugadores, puntosHtml);
        crearCarta(carta, puntosJugadores.length - 1, divCartasJugadores);

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    determinarGanador(puntosMinimos, puntosJugadores);

}

const determinarGanador = (puntosMinimos, puntosJugadores) => {

    const puntosComputadora = puntosJugadores[puntosJugadores.length - 1];

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert("Nadie gana :(");
        } else if (puntosMinimos > 21) {
            alert("Computadora gana");
        } else if (puntosComputadora > 21) {
            alert("Jugador Gana");
        } else {
            alert("Computadora Gana");
        }
    }, 200);
}
