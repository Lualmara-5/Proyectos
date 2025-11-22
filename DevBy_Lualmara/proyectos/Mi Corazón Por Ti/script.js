// Fecha en DD/MM/YYYY
let fechaInicio = "22/11/2025";

// Convierte "DD/MM/YYYY" a Date()
function convertirFecha(fechaStr) {
  const [dia, mes, año] = fechaStr.split("/").map(Number);
  return new Date(año, mes - 1, dia);
}

// Fecha actual del dispositivo (PC o CEL)
function ahora() {
  return new Date();
}

// Agrega 0 a la izquierda si el número es menor a 10
function dosDigitos(num) {
  return num < 10 ? "0" + num : num;
}

// Calcula diferencia entre dos fechas
function calcularDiferencia(inicio, fin) {
  const ms = fin - inicio;

  const dias = Math.floor(ms / (1000 * 60 * 60 * 24));
  const horas = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((ms % (1000 * 60)) / 1000);

  return { dias, horas, minutos, segundos };
}

// Renderizar en pantallita
function actualizarTimer() {
  const inicio = convertirFecha(fechaInicio);
  const fin = ahora();
  const dif = calcularDiferencia(inicio, fin);

  document.getElementById("timer").innerHTML = `
    ${dosDigitos(dif.dias)} días, 
    ${dosDigitos(dif.horas)} horas, 
    ${dosDigitos(dif.minutos)} minutos, 
    ${dosDigitos(dif.segundos)} segundos`;
}

// Ejecutar cada 1 segundo
setInterval(actualizarTimer, 1000);
actualizarTimer();

// Mostrar Mensaje
const heart = document.getElementById("heart");
const timer = document.getElementById("timer");
const mensaje = document.getElementById("mensaje");

let activado = false;

function activar() {
  if (activado) return;
  activado = true;

  timer.classList.add("show");
  mensaje.classList.add("show");

  heart.style.cursor = "default";
  timer.style.cursor = "default";
}

heart.addEventListener("click", activar);
timer.addEventListener("click", activar);
