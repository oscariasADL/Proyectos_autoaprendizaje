import _ from 'underscore'
import { crearDeck, pedirCarta, valorCarta, turnoComputadora, acumularPuntos, crearCarta as crearCartaImportada } from './usecases'
/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

const miModulo = ( () => {
    'use strict';

    let deck            = [];
    const tipos         = ['C', 'D', 'H', 'S'],
          especiales    = ['A', 'J', 'Q', 'K'];

    const botonPedir = document.querySelector('#btnPedir'),
          puntosHtml = document.querySelectorAll('small'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');


    let puntosJugadores = [];    

    const divCartasJugadores = document.querySelectorAll('.divCartas');

    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck( tipos, especiales );

        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        
        puntosHtml.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        botonPedir.disabled = false;
        btnDetener.disabled = false;

    }


    

    const crearCartaLocal = (carta, turno) => {
        crearCartaImportada(carta, turno, divCartasJugadores);
    }
    

    botonPedir.addEventListener('click', () => {
        console.log(" ".repeat(20));
        console.log("*".repeat(20));
        console.log(" ".repeat(20));
        console.log("✅ El jugador pide carta");
        const carta = pedirCarta(deck);
        const valor = valorCarta(carta);
        const puntosJugador = acumularPuntos(carta, 0, puntosJugadores, puntosHtml);

        console.log(`🚀 El valor de la carta  es ${valor}`)
        console.log(`🏆 Puntos del jugador: ${puntosJugador}`)

        crearCartaLocal(carta, 0);

        /*Controlar Puntos*/
        if (puntosJugador > 21) {
            console.warn("💥 Lo siento mucho, perdiste");
            botonPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador, deck, puntosJugadores, puntosHtml, divCartasJugadores);
        } else if (puntosJugador === 21) {
            console.warn("21, genial!");
            botonPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador, deck, puntosJugadores, puntosHtml, divCartasJugadores);
        }

    });

    btnDetener.addEventListener('click', () => {
        console.log(" ".repeat(20));
        console.log("*".repeat(20));
        console.log(" ".repeat(20));
        console.log("🛑 El jugador ha decidido detener su turno");
        botonPedir.disabled = true;
        btnDetener.disabled = true;
        const puntosMinimos = puntosJugadores[0];
        turnoComputadora(puntosMinimos, deck, puntosJugadores, puntosHtml, divCartasJugadores);
    });


    btnNuevo.addEventListener('click', () => {
        console.clear();
        console.log("🔄 Nuevo Juego");

        inicializarJuego();

    });


    // Retornar un nuevo juego através de un método público o módulo
    return {
        nuevoJuego: inicializarJuego
    };

}
)();

