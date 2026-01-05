//Turno: 0 = primer jugador y el último sera la computadora
import { valorCarta } from './valor-carta.js';

export const acumularPuntos = (carta, turno, puntosJugadores, puntosHtml) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHtml[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
}