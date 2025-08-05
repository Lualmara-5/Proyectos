// Fuegos Artificiales

//
// 1. Configuración Inicial
//

// Desactivamos menú (Guardar imagen "click derecho")
window.oncontextmenu = function () {
  return false;
};

// Obtenemos el canvas y su contexto
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Configuramos dimensiones y fotogramas
const tasaFPS = 60.0; //60 frames por segundo
const retardoFotograma = 1000.0 / tasaFPS; // Tiempo entre cada uno 1000ms/60 = 16.6ms

// Ajustamos el tamaño del canvas (Ocupa todo el tamaño de la pantalla del navegador)
const ancho = innerWidth;
const alto = innerHeight;
canvas.width = ancho;
canvas.height = alto;

// Variables que usaremos para controlar los fuegos artificiales
let temporizador = 0;

let fuegos = [];
let particulas = [];
let siguienteDisparo = 0;
let intervaloFuego = 600;

//
// 2. Funciones Auxiliares
//

// Calcular distancia entre 2 puntos (Teorema de Pitágoras)
function obtenerDistancia(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

// Calcular ángulo entre 2 puntos
function obtenerAngulo(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI) + 180;
}

// Generar # aleatorio
function aleatorio(min, max, redondear) {
  const valor = Math.random() * (max - min) + min;
  return redondear ? Math.round(valor) : valor;
}

// Elegir color aleatorio
function obtenerColor() {
  const colores = [
    "#ff0000",
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#0000ff",
    "#ff00ff",
    "#ffac00",
  ];
  return colores[aleatorio(0, colores.length, true)];
}

//
// 3. Lanzar el Fuego Artificial
//

function lanzarFuegoAuto() {
  const fuego = new FuegoAuto();
  fuego.x = fuego.sx = aleatorio(100, ancho - 100);
  fuego.y = fuego.sy = alto;
  fuego.color = obtenerColor();

  fuego.tx = aleatorio(100, ancho - 100);
  fuego.ty = aleatorio(0, alto / 2);

  const angulo = obtenerAngulo(fuego.sx, fuego.sy, fuego.tx, fuego.ty);
  fuego.vx = Math.cos((angulo * Math.PI) / 180.0);
  fuego.vy = Math.sin((angulo * Math.PI) / 180.0);

  fuegos.push(fuego);

  // Reproducir sonido
  //const sonido = new Audio("Sonidos/Fuego.MP3");
  //sonido.play();
}

// Aqui creamos el fuego artificial
// Con esto que vamos a crear a continuación creamos una "bala inteligente" ya que tiene una posición inicial y final, sabe su velocidad, tiene un color, lleva un contador interno y se elimina cuando llega a su destino.

function FuegoAuto() {
  this.x = 0; // Punto Actual
  this.y = 0; // Punto Actual
  this.sx = 0; // Punto De Partida
  this.sy = 0; // Punto De Partida
  this.tx = 0; // Punto De Objetivo
  this.ty = 0; // Punto De Objetivo
  this.vx = 0; // Dirección hacia donde va
  this.vy = 0; // Dirección hacia donde va
  this.color = "#fff";
  this.velocidad = aleatorio(700, 1200); // Velocidad Inicial del disparo
  this.gravedad = 1.5; // Fuerza Gravitacional (Cae el fuego artificial)
  this.ms = 0; // Guardamos el tiempo por fotograma(milisegundos)
  this.contador = 0; // Cronómetro para saber cuándo explota
  this.eliminar = false; // Saber cuándo eliminamos el fuego artificial (osea si ya explotó)

  // Cerebro [Mover, Decidir si explota]
  this.actualizar = function (ms) {
    this.ms = ms / 1000;
    if (this.contador > 2000 / ms) {
      crearParticulas(1, 30, this.x, this.y, this.color);
      this.eliminar = true;
    } else {
      this.velocidad *= 0.98;
      this.x -= this.vx * this.velocidad * this.ms;
      this.y -= this.vy * this.velocidad * this.ms - this.gravedad;
    }
    this.contador++;
  };

  // Cuerpo [Mostrarlo en pantalla]
  this.dibujar = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color; // Color del Fuego Artificial
    ctx.shadowBlur = 8;
    ctx.shadowColor = "000"; // Color del Background
    ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI);
    ctx.fill();
  };
}

//
// 3.1 Función y Clase para tirar el fuego artificial y que explote justo donde damos click (OPCIONAL)
//

function lanzarFuegoClick(x, y) {
  const fuego = new FuegoClick(x, y);
  fuegos.push(fuego);

  // Reproducir sonido
  //const sonido = new Audio("Sonidos/Fuego.MP3");
  //sonido.play();
}

function FuegoClick(tx, ty) {
  this.x = aleatorio(100, ancho - 100);
  this.y = alto;
  this.tx = tx;
  this.ty = ty;
  this.color = obtenerColor();
  this.velocidad = 5;
  this.eliminar = false;

  this.actualizar = function () {
    const dx = this.tx - this.x;
    const dy = this.ty - this.y;
    const distancia = Math.sqrt(dx * dx + dy * dy);

    if (distancia < 3) {
      crearParticulas(1, 30, this.x, this.y, this.color);
      this.eliminar = true;
      return;
    }

    this.x += (dx / distancia) * this.velocidad;
    this.y += (dy / distancia) * this.velocidad;
  };

  this.dibujar = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#000";
    ctx.arc(this.x, this.y, 1.5, 0, 2 * Math.PI);
    ctx.fill();
  };
}

//
// 4. Crear las partículas
//

function crearParticulas(tipo, cantidad, x, y, color) {
  // Reproducir sonido
  //const sonido = new Audio("Sonidos/Particula.MP3");
  //sonido.play();

  for (let i = 0; i < cantidad; i++) {
    const p = new Particula();
    p.tipo = tipo;
    p.color = color;
    p.x = x;
    p.y = y;
    const angulo = aleatorio(0, 360);
    p.vx = Math.cos((angulo * Math.PI) / 180.0);
    p.vy = Math.sin((angulo * Math.PI) / 180.0);
    p.velocidad = aleatorio(150, 600); // Velocidad inicial personalizada
    particulas.push(p);
  }
}

// Aqui creamos las particulas
function Particula() {
  this.x = 0; // Posición Actual
  this.y = 0; // Posición Actual
  this.vx = 0; // Dirección
  this.vy = 0; // Dirección
  this.velocidad = aleatorio(200, 500); // Que tan rápido se mueve
  this.gravedad = 1; // Gravedad (Caiga con el tiempo)
  this.viento = 0; // Viento (Desvíe a los lados [No caiga e n línea recta])
  this.tipo = 1; // Tipo de fuego artificial (1)
  this.opacidad = 1; // Transparencia (Baja con el tiempo)
  this.contador = 0; // Cronómetro de vida
  this.escala = 1;
  this.color = "#fff"; // Color

  this.actualizar = function (ms) {
    this.ms = ms / 1000;
    if (this.contador > 900 / ms) {
      this.opacidad = Math.max(0, this.opacidad - 0.05);
    }
    if (this.tipo === 1) {
      this.viento = Math.sin(this.contador / 10) * 0.5;
      this.velocidad *= 0.96;
      this.x -= this.vx * this.velocidad * this.ms + this.viento;
      this.y -= this.vy * this.velocidad * this.ms - this.gravedad;
    }
    this.contador++;
  };

  this.dibujar = function () {
    ctx.save();
    ctx.globalAlpha = this.opacidad;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 6;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1.5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  };
}

//
// 5. Evento del Mouse
//

canvas.addEventListener("mousedown", function (evt) {
  const boton = evt.which || evt.button;
  if (boton === 1) {
    lanzarFuegoClick(evt.clientX, evt.clientY);
  }
});

//
// 6. Funcion Animar
//

function animar() {
  requestAnimationFrame(animar);

  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.fillRect(0, 0, ancho, alto);

  if (temporizador > siguienteDisparo) {
    lanzarFuegoAuto();
    siguienteDisparo = temporizador + intervaloFuego / tasaFPS;
  }

  for (let i = fuegos.length - 1; i >= 0; i--) {
    if (fuegos[i].eliminar) {
      fuegos.splice(i, 1);
    } else {
      fuegos[i].actualizar(retardoFotograma);
      fuegos[i].dibujar();
    }
  }

  for (let i = particulas.length - 1; i >= 0; i--) {
    if (particulas[i].opacidad === 0) {
      particulas.splice(i, 1);
    } else {
      particulas[i].actualizar(retardoFotograma);
      particulas[i].dibujar();
    }
  }

  temporizador++;
}

animar();
