// ------------------------
// VARIABLES PRINCIPALES
// ------------------------
let time = 0;
let timerInterval = null;
let movimientos = 0;
let parejas = 0;
let primeraCarta = null;
let segundaCarta = null;
let bloqueo = false;

// 🖼 Tus imágenes (8 parejas — debes cambiarlas por tus rutas)
const imagenes = [
  "imagenes/1.jpg",
  "imagenes/2.jpg",
  "imagenes/3.jpg",
  "imagenes/4.jpg",
  "imagenes/5.jpg",
  "imagenes/6.jpg",
  "imagenes/7.jpg",
  "imagenes/8.jpg",
];

// Duplicamos y mezclamos
let cartas = [...imagenes, ...imagenes].sort(() => Math.random() - 0.5);

// ------------------------
// INICIALIZACIÓN
// ------------------------
window.onload = () => {
  asignarImagenes();
  document
    .getElementById("reiniciar")
    .addEventListener("click", reiniciarJuego);
};

// Pone cada imagen en su ".back"
function asignarImagenes() {
  const backs = document.querySelectorAll(".card .back");
  backs.forEach((back, i) => {
    back.style.backgroundImage = `url(${cartas[i]})`;
  });
}

// ------------------------
// FUNCIÓN PARA DESTAPAR
// ------------------------
function Uncover(id) {
  if (bloqueo) return;
  const card = document.querySelectorAll(".card")[id];

  // Inicia el tiempo en la primera jugada
  if (movimientos === 0 && parejas === 0 && !timerInterval) iniciarTiempo();

  // Evita clickear la misma dos veces
  if (card.classList.contains("active")) return;

  card.classList.add("active");

  // Primera carta
  if (!primeraCarta) {
    primeraCarta = { id, element: card };
    return;
  }

  // Segunda carta
  segundaCarta = { id, element: card };
  bloquearClicks();

  movimientos++;
  document.getElementById("movimientos").textContent = movimientos;

  compararCartas();
}

// ------------------------
// COMPARACIÓN DE CARTAS
// ------------------------
function compararCartas() {
  const img1 = cartas[primeraCarta.id];
  const img2 = cartas[segundaCarta.id];

  if (img1 === img2) {
    parejas++;
    document.getElementById("parejas").textContent = `${parejas} / 8`;

    resetSeleccion();

    if (parejas === 8) ganarJuego();
  } else {
    // No coinciden → girarlas otra vez
    setTimeout(() => {
      primeraCarta.element.classList.remove("active");
      segundaCarta.element.classList.remove("active");
      resetSeleccion();
    }, 800);
  }
}

// Limpieza después de comparar
function resetSeleccion() {
  primeraCarta = null;
  segundaCarta = null;
  desbloquearClicks();
}

// ------------------------
// BLOQUEOS
// ------------------------
function bloquearClicks() {
  bloqueo = true;
}

function desbloquearClicks() {
  bloqueo = false;
}

// ------------------------
// TIEMPO
// ------------------------
function iniciarTiempo() {
  timerInterval = setInterval(() => {
    time++;
    mostrarTiempo();
  }, 1000);
}

function mostrarTiempo() {
  const min = String(Math.floor(time / 60)).padStart(2, "0");
  const sec = String(time % 60).padStart(2, "0");
  document.getElementById("tiempo").textContent = `${min}:${sec}`;
}

// ------------------------
// GANAR
// ------------------------
// ------------------------
// GANAR → Mostrar pantalla final
// ------------------------
function ganarJuego() {
  clearInterval(timerInterval);
  timerInterval = null;

  // Ocultar interfaz normal
  document.querySelector(".board").classList.add("hidden");
  document.querySelector(".info-panel").classList.add("hidden");
  document.getElementById("reiniciar").classList.add("hidden");

  // Insertar datos en la pantalla final
  document.querySelector(".result-time").textContent =
    "Tiempo: " + document.getElementById("tiempo").textContent;

  document.querySelector(".result-moves").textContent =
    "Movimientos: " + movimientos;

  // Mostrar pantalla final
  document.querySelector(".win-screen").classList.remove("hidden");
}

// Botón "jugar de nuevo"
document.getElementById("btn-restart-win").addEventListener("click", () => {
  location.reload();
});

// ------------------------
// REINICIAR
// ------------------------
function reiniciarJuego() {
  clearInterval(timerInterval);
  timerInterval = null;
  time = 0;
  movimientos = 0;
  parejas = 0;
  primeraCarta = null;
  segundaCarta = null;

  document.getElementById("tiempo").textContent = "00:00";
  document.getElementById("movimientos").textContent = 0;
  document.getElementById("parejas").textContent = "0 / 8";

  // Reset de cartas
  const cards = document.querySelectorAll(".card");
  cards.forEach((c) => c.classList.remove("active"));

  // Nueva mezcla
  cartas = [...imagenes, ...imagenes].sort(() => Math.random() - 0.5);
  asignarImagenes();
}
