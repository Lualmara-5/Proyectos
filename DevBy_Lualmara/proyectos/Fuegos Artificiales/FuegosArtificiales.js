// Fuegos Artificiales

//
// 1. Configuración Inicial
//
window.oncontextmenu = function () {
  return false;
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let ancho = (canvas.width = window.innerWidth);
let alto = (canvas.height = window.innerHeight);

const minParticulas = 700;
const maxParticulas = 1000;

let temporizador = 0;
let fuegos = [];
let particulas = [];
let siguienteDisparo = 0;
let intervaloFuego = 600; 

// Paleta De Colores
const paletaColores = [
  ["rgba(179,255,129,", "rgba(0,255,0,"], // verde - blanco
  ["rgba(0,0,255,", "rgba(100,217,255,"], // azul - cian
  ["rgba(255,0,0,", "rgba(255,255,0,"], // rojo - amarillo
  ["rgba(145,0,213,", "rgba(251,144,204,"], // morado - rosa
  ["rgba(255,128,0,", "rgba(255,255,153,"], // naranja - amarillo pálido
  ["rgba(255,0,127,", "rgba(255,182,193,"], // fucsia - rosa claro
  ["rgba(173,216,230,", "rgba(0,191,255,"], // celeste - azul intenso
  ["rgba(255,215,0,", "rgba(255,255,255,"], // dorado - blanco
  ["rgba(64,224,208,", "rgba(0,255,255,"], // turquesa - cian brillante
  ["rgba(255,69,0,", "rgba(255,165,0,"], // rojo anaranjado - naranja
];

//
// 2. Funciones Auxiliares
//
function obtenerDistancia(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

function aleatorio(min, max, redondear) {
  const valor = Math.random() * (max - min) + min;
  return redondear ? Math.round(valor) : valor;
}

//
// 3. Lanzar Fuego Automático
//
function lanzarFuegoAuto() {
  const fuego = new FuegoAuto();
  fuegos.push(fuego);

  // Reproducir sonido
  //const sonido = new Audio("Sonidos/Fuego.MP3");
  //sonido.play();
}

function FuegoAuto() {
  // Posición Inicial Del Fuego Artificial
  this.x = this.sx = aleatorio(100, ancho - 100);
  this.y = this.sy = alto;

  // Objetivo Del Fuego Artificial
  this.tx = aleatorio(100, ancho - 100); // this.tx = this.sx (Para Que Sea Solo Vertical)
  this.ty = aleatorio(alto * 0.1, alto * 0.7);

  // Disparar En Cualquier Dirección
  const angulo = Math.atan2(this.ty - this.sy, this.tx - this.sx);

  // Proyectil Sube Exactamente En La Dirección Del Objetivo
  this.velocidad = aleatorio(8, 12); // Cuantos Píxeles Avanza Por Frame
  this.vx = Math.cos(angulo) * this.velocidad;
  this.vy = Math.sin(angulo) * this.velocidad;

  // Color Del Fuego Artificial
  this.paleta = paletaColores[Math.floor(Math.random() * paletaColores.length)];
  this.colorProyectil = this.paleta[0] + "0.8)";

  // Dibujar Estela -|- Eliminar Fuego Artificial
  this.posicionesPrevias = [];
  this.eliminar = false;

  this.actualizar = function () {
    // Dibujar Estela
    this.posicionesPrevias.push({ x: this.x, y: this.y });
    if (this.posicionesPrevias.length > 1) this.posicionesPrevias.shift(); //Si Tengo Más De 1 Posición Guardada, Elimino La Más Vieja

    this.x += this.vx;
    this.y += this.vy;

    // Eliminar Fuego Artificial
    if (obtenerDistancia(this.x, this.y, this.tx, this.ty) < this.velocidad) {
      const cantidad = aleatorio(minParticulas, maxParticulas, true);
      crearParticulas(cantidad, this.x, this.y, this.paleta);
      this.eliminar = true;
    }
  };

  this.dibujar = function () {
    let ultimaPos = this.posicionesPrevias[0] ?? { x: this.x, y: this.y };

    ctx.beginPath();
    ctx.moveTo(ultimaPos.x, ultimaPos.y); // Punto Inicial (Posición Anterior)
    ctx.lineTo(this.x, this.y); // Línea Hasta La Posición Actual (Crea La Estela)
    ctx.arc(this.x, this.y, 1.5, 0, 2 * Math.PI); // Dibujamos Bola (Punta Del Proyectil)
    ctx.strokeStyle = this.colorProyectil;
    ctx.stroke();
  };
}

//
// 3.1 Lanzar Fuego con Click
//
function lanzarFuegoClick(x, y) {
  const fuego = new FuegoClick(x, y);
  fuegos.push(fuego);

  // Reproducir sonido
  //const sonido = new Audio("Sonidos/Fuego.MP3");
  //sonido.play();
}

function FuegoClick(tx, ty) {
  // Posición Inicial Del Fuego Artificial
  this.x = this.sx = aleatorio(100, ancho - 100);
  this.y = this.sy = alto;

  // Objetivo Del Fuego Artificial
  this.tx = tx;
  this.ty = ty;

  // Disparar En Cualquier Dirección (Ángulo En RAD)
  const angulo = Math.atan2(this.ty - this.sy, this.tx - this.sx);

  // Proyectil Sube Exactamente En La Dirección Del Objetivo
  this.velocidad = aleatorio(8, 12); // Cuantos Píxeles Avanza Por Frame
  this.vx = Math.cos(angulo) * this.velocidad;
  this.vy = Math.sin(angulo) * this.velocidad;

  // Color Del Fuego Artificial
  this.paleta = paletaColores[Math.floor(Math.random() * paletaColores.length)];
  this.colorProyectil = this.paleta[0] + "0.8)";

  // Dibujar Estela -|- Eliminar Fuego Artificial
  this.posicionesPrevias = [];
  this.eliminar = false;

  this.actualizar = function () {
    // Dibujar Estela
    this.posicionesPrevias.push({ x: this.x, y: this.y });
    if (this.posicionesPrevias.length > 1) this.posicionesPrevias.shift();

    this.x += this.vx;
    this.y += this.vy;

    // Eliminar Fuego Artificial
    if (obtenerDistancia(this.x, this.y, this.tx, this.ty) < this.velocidad) {
      const cantidad = aleatorio(minParticulas, maxParticulas, true);
      crearParticulas(cantidad, this.x, this.y, this.paleta);
      this.eliminar = true;
    }
  };

  this.dibujar = function () {
    let ultimaPos = this.posicionesPrevias[0] ?? { x: this.x, y: this.y };

    ctx.beginPath();
    ctx.moveTo(ultimaPos.x, ultimaPos.y); // Punto Inicial (Posición Anterior)
    ctx.lineTo(this.x, this.y); // Línea Hasta La Posición Actual (Crea La Estela)
    ctx.arc(this.x, this.y, 1.5, 0, 2 * Math.PI); // Dibujamos Bola (Punta Del Proyectil)
    ctx.strokeStyle = this.colorProyectil;
    ctx.stroke();
  };
}

//
// 4. Crear Partículas
//
function crearParticulas(cantidad, x, y, colores) {
  for (let i = 0; i < cantidad; i++) {
    particulas.push(new Particula(x, y, colores));
  }

  // Reproducir sonido
  //const sonido = new Audio("Sonidos/Particula.MP3");
  //sonido.play();
}

function Particula(x, y, colores) {
  this.x = x;
  this.y = y;
  this.velocidad = Math.random() * 6 + 2; // Velocidad Inicial Aleatoria (2–8 PX/Frame)
  this.angulo = Math.random() * (Math.PI * 2); // Dirección Aleatoria (0–360° En Radianes)
  this.facilidad = 0.2; // Reducción De Velocidad Por Frame (Simula Fricción)
  this.gravedad = Math.random() * 3 + 0.1; // Gravedad inicial
  this.alpha = 0.9; // Opacidad Inicial
  this.color = Math.random() < 0.7 ? colores[0] : colores[1];
  this.posicionesPrevias = [];

  this.actualizar = function () {
    if (this.alpha <= 0) return; // Si Ya Es Invisible, No Seguimos

    // Guardar Posición Actual Para Dibujar Estela
    this.posicionesPrevias.push({ x: this.x, y: this.y });
    if (this.posicionesPrevias.length > 2) this.posicionesPrevias.shift();

    // Frenar La Partícula Poco A Poco
    if (this.velocidad > 1) this.velocidad -= this.facilidad;

    // Desvanecer Lentamente
    this.alpha -= 0.01;

    // Incrementar Gravedad Para Que Caiga Más Rápido Con El Tiempo
    this.gravedad += 0.01;

    // Actualizar Posición Usando Trigonometría (Ángulo En Movimiento Horizontal y Vertical)
    this.x += Math.cos(this.angulo) * this.velocidad;
    this.y += Math.sin(this.angulo) * this.velocidad + this.gravedad;
  };

  this.dibujar = function () {
    if (this.alpha <= 0) return; // No Dibujamos Partículas Invisibles

    let ultimaPos = this.posicionesPrevias[0] ?? { x: this.x, y: this.y };

    ctx.beginPath();
    ctx.moveTo(ultimaPos.x, ultimaPos.y);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color + this.alpha + ")";
    ctx.stroke();
  };
}

//
// 5. Evento Mouse
//
canvas.addEventListener("mousedown", function (evt) {
  if (evt.button === 0) {
    lanzarFuegoClick(evt.clientX, evt.clientY);
  }
});

//
// 6. Animar
//
function animar() {
  requestAnimationFrame(animar);

  // Dibujar Fondo
  ctx.fillRect(0, 0, ancho, alto);

  // Ver Si Toca Lanzar Un Fuego Automático
  if (temporizador > siguienteDisparo) {
    lanzarFuegoAuto();
    siguienteDisparo = temporizador + intervaloFuego / 60;
  }

  // Actualizar y Dibujar Todos Los Proyectiles
  for (let i = fuegos.length - 1; i >= 0; i--) {
    fuegos[i].actualizar();
    fuegos[i].dibujar();
    if (fuegos[i].eliminar) fuegos.splice(i, 1);
  }

  // Actualizar y Dibujar Todas Las Particulas
  for (let i = particulas.length - 1; i >= 0; i--) {
    particulas[i].actualizar();
    particulas[i].dibujar();
    if (particulas[i].alpha <= 0) particulas.splice(i, 1);
  }

  temporizador++;
}

animar();


