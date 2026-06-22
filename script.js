const tableroDOM = document.querySelectorAll('.casilla');
const estadoDOM = document.getElementById('estado');
const btnReiniciar = document.getElementById('btn-reiniciar');

let turno = 'X';
let juegoActivo = true;
let estadoJuego = ["", "", "", "", "", "", "", "", ""];

// Combinaciones para ganar (filas, columnas y diagonales)
const combinacionesGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]             // Diagonales
];

function evaluarJugada() {
    let rondaGanada = false;

    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        const [a, b, c] = combinacionesGanadoras[i];
        if (estadoJuego[a] === "" || estadoJuego[b] === "" || estadoJuego[c] === "") {
            continue;
        }
        if (estadoJuego[a] === estadoJuego[b] && estadoJuego[b] === estadoJuego[c]) {
            rondaGanada = true;
            break;
        }
    }

    if (rondaGanada) {
        estadoDOM.textContent = `¡El jugador ${turno} ha ganado!`;
        juegoActivo = false;
        return;
    }

    // Si no hay espacios vacíos y nadie ganó, es un empate
    if (!estadoJuego.includes("")) {
        estadoDOM.textContent = "¡Es un empate!";
        juegoActivo = false;
        return;
    }

    // Cambiar turno
    turno = turno === 'X' ? 'O' : 'X';
    estadoDOM.textContent = `Turno de: ${turno}`;
}

function casillaClickeada(e) {
    const casillaSeleccionada = e.target;
    const indiceCasilla = parseInt(casillaSeleccionada.getAttribute('data-index'));

    // Verificar si la casilla ya está ocupada o el juego terminó
    if (estadoJuego[indiceCasilla] !== "" || !juegoActivo) {
        return;
    }

    // Registrar la jugada en el arreglo y en el HTML
    estadoJuego[indiceCasilla] = turno;
    casillaSeleccionada.textContent = turno;
    casillaSeleccionada.classList.add(turno.toLowerCase());

    evaluarJugada();
}

function reiniciarJuego() {
    turno = 'X';
    juegoActivo = true;
    estadoJuego = ["", "", "", "", "", "", "", "", ""];
    estadoDOM.textContent = `Turno de: ${turno}`;
    
    tableroDOM.forEach(casilla => {
        casilla.textContent = "";
        casilla.classList.remove('x', 'o');
    });
}

// Eventos de escucha
tableroDOM.forEach(casilla => casilla.addEventListener('click', casillaClickeada));
btnReiniciar.addEventListener('click', reiniciarJuego);