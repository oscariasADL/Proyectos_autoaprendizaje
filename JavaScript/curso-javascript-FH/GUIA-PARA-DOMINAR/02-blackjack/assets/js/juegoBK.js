/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

(() => {
    'use strict';

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    const botonPedir = document.querySelector('#btnPedir');
    const puntosHtml = document.querySelectorAll('small');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');

    let puntosJugador = 0;
    const divCartasJugador = document.querySelector('#jugador-cartas');

    let puntosComputadora = 0;
    const divCartasComputadora = document.querySelector('#computadora-cartas');


    const crearDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }

        }
        //console.log(deck);
        deck = _.shuffle(deck);
        console.log("🔥 Deck mezclado");
        console.log(deck);
    }

    crearDeck();

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        const carta = deck.pop();
        console.log(`La carta asignada es ${carta}`);
        console.log("📌 Deck Luego de quitarle una carta");
        console.log(deck);
        console.log(" ");
        return carta;
    }

    //pedirCarta();


    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;


        /*
        let puntos = 0;
        if( isNaN( valor ) ){
            puntos = ( valor === 'A' ) ? 11 : 10;
        } else{
            puntos = valor * 1;
        }
        console.log( `🚀 El valor de la carta  es ${puntos}` )
        */

    }

    /*
    const valor = valorCarta( pedirCarta() );
    console.log( `🚀 El valor de la carta  es ${valor}` )
    */


    //Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        do {
            const carta = pedirCarta();
            const valor = valorCarta(carta);
            puntosComputadora = puntosComputadora + valor;
            puntosHtml[1].innerText = puntosComputadora;
            console.log(`La computadora pide carta y obtiene ${carta}`);

            const imgCarta = document.createElement('img')
            imgCarta.src = `assets/cartas/${carta}.png`
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }


        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

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

    botonPedir.addEventListener('click', () => {
        console.log(" ".repeat(20));
        console.log("*".repeat(20));
        console.log(" ".repeat(20));
        console.log("✅ El jugador pide carta");
        const carta = pedirCarta();
        const valor = valorCarta(carta);
        puntosJugador = puntosJugador + valor;
        console.log(`🚀 El valor de la carta  es ${valor}`)
        console.log(`🏆 Puntos del jugador: ${puntosJugador}`)
        puntosHtml[0].innerText = puntosJugador;


        /*Pedir cartas*/
        // <img class="carta" src="assets/cartas/2C.png">
        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);

        /*Controlar Puntos*/
        if (puntosJugador > 21) {
            console.warn("💥 Lo siento mucho, perdiste");
            botonPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn("21, genial!");
            botonPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });


    btnDetener.addEventListener('click', () => {
        console.log(" ".repeat(20));
        console.log("*".repeat(20));
        console.log(" ".repeat(20));
        console.log("🛑 El jugador ha decidido detener su turno");
        botonPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    });


    btnNuevo.addEventListener('click', () => {
        console.clear();
        console.log("🔄 Nuevo Juego");
        deck = [];
        crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        botonPedir.disabled = false;
        btnDetener.disabled = false;

    });

}
)();

