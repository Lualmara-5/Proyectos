const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

// ── DATOS (solo info, sin posición) ────────────────────
const starData = [
  // 0 - T
  {
    label: "La primera vez que hablamos",
    date: "Enero 2021",
    description: "No imaginaba que ese simple mensaje cambiaría todo.",
    image: "assets/images/recuerdo1.jpg",
  },
  // 1
  {
    label: "Cuando me hiciste reír",
    date: "Enero 2021",
    description: "Ahí supe que tenías algo especial.",
    image: "assets/images/recuerdo2.jpg",
  },
  // 2
  {
    label: "Las primeras conversaciones largas",
    date: "Febrero 2021",
    description: "Horas hablando y aún así no era suficiente.",
    image: "assets/images/recuerdo3.jpg",
  },
  // 3
  {
    label: "El inicio de algo bonito",
    date: "Febrero 2021",
    description: "Sin darnos cuenta, ya éramos importantes.",
    image: "assets/images/recuerdo4.jpg",
  },
  // 4 - E
  {
    label: "Nuestra primera cita",
    date: "Febrero 2021",
    description: "Los nervios, las miradas, todo valió la pena.",
    image: "assets/images/recuerdo5.jpg",
  },
  // 5
  {
    label: "Ese día especial",
    date: "Febrero 2021",
    description: "El momento en que todo se sintió diferente.",
    image: "assets/images/recuerdo6.jpg",
  },
  // 6
  {
    label: "Las primeras salidas",
    date: "Marzo 2021",
    description: "Cada momento contigo era único.",
    image: "assets/images/recuerdo8.jpg",
  },
  // 7
  {
    label: "Los pequeños detalles",
    date: "Abril 2021",
    description: "Ahí entendí que el amor está en lo simple.",
    image: "assets/images/recuerdo9.jpg",
  },
  // 8
  {
    label: "Momentos inolvidables",
    date: "Abril 2021",
    description: "Cada día contigo sumaba algo hermoso.",
    image: "assets/images/recuerdo10.jpg",
  },
  // 9 - A
  {
    label: "Nuestro primer viaje",
    date: "Junio 2022",
    description: "Descubriendo lugares… y más de nosotros.",
    image: "assets/images/recuerdo11.jpg",
  },
  // 10
  {
    label: "Ese abrazo especial",
    date: "Junio 2022",
    description: "Sentí que ahí era donde pertenecía.",
    image: "assets/images/recuerdo12.jpg",
  },
  // 11
  {
    label: "Las risas sin control",
    date: "Julio 2022",
    description: "Contigo todo es más divertido.",
    image: "assets/images/recuerdo13.jpg",
  },
  // 12
  {
    label: "Momentos simples",
    date: "Julio 2022",
    description: "Pero contigo, todo se siente grande.",
    image: "assets/images/recuerdo14.jpg",
  },
  // 13
  {
    label: "Miradas que dicen todo",
    date: "Julio 2022",
    description: "A veces no hacen falta palabras.",
    image: "assets/images/recuerdo15.jpg",
  },
  // 14 - M
  {
    label: "Días difíciles",
    date: "2022",
    description: "Pero siempre juntos, siempre fuertes.",
    image: "assets/images/recuerdo16.jpg",
  },
  // 15
  {
    label: "Apoyándonos",
    date: "2022",
    description: "Nunca soltándonos, pase lo que pase.",
    image: "assets/images/recuerdo17.jpg",
  },
  // 16
  {
    label: "Creciendo juntos",
    date: "2022",
    description: "Aprendiendo uno del otro cada día.",
    image: "assets/images/recuerdo18.jpg",
  },
  // 17
  {
    label: "Sueños compartidos",
    date: "2023",
    description: "Pensando en todo lo que vendrá.",
    image: "assets/images/recuerdo19.jpg",
  },
  // 18
  {
    label: "Nuestro camino",
    date: "2023",
    description: "Construyendo algo real y bonito.",
    image: "assets/images/recuerdo20.jpg",
  },
  // 19 - O
  {
    label: "Tu sonrisa",
    date: "Siempre",
    description: "Lo que ilumina incluso mis días grises.",
    image: "assets/images/recuerdo21.jpg",
  },
  // 20
  {
    label: "Tu mirada",
    date: "Siempre",
    description: "Donde me pierdo y me encuentro.",
    image: "assets/images/recuerdo22.jpg",
  },
  // 21
  {
    label: "Tu forma de ser",
    date: "Siempre",
    description: "Eso que te hace única.",
    image: "assets/images/recuerdo23.jpg",
  },
  // 22
  {
    label: "Todo lo que eres",
    date: "Siempre",
    description: "Y todo lo que amo de ti.",
    image: "assets/images/recuerdo24.jpg",
  },
  // 23
  {
    label: "Lo que hemos construido",
    date: "Hoy",
    description: "Cada recuerdo forma este amor.",
    image: "assets/images/recuerdo25.jpg",
  },
  // 24
  {
    label: "Te amo",
    date: "Siempre",
    description: "Y esto es solo el comienzo.",
    image: "assets/images/recuerdo26.jpg",
  },
];

// ── LAYOUT DESKTOP — T E  A M O (horizontal) ──────────
const layoutDesktop = [
  // ── T (índices 0-3)
  { x: 10, y: 25, connections: [1] },
  { x: 15, y: 25, connections: [2] },
  { x: 20, y: 25, connections: [] },
  { x: 15, y: 55, connections: [1] },
  // ── E (índices 4-8)
  { x: 25, y: 25, connections: [6] },
  { x: 33, y: 25, connections: [4] },
  { x: 31, y: 40, connections: [7] },
  { x: 25, y: 55, connections: [8] },
  { x: 33, y: 55, connections: [] },
  // ── A (índices 9-13)
  { x: 45, y: 55, connections: [10] },
  { x: 50, y: 25, connections: [11] },
  { x: 55, y: 55, connections: [] },
  { x: 47, y: 42, connections: [13] },
  { x: 53, y: 42, connections: [] },
  // ── M (índices 14-18)
  { x: 60, y: 55, connections: [15] },
  { x: 60, y: 25, connections: [16] },
  { x: 65, y: 40, connections: [17] },
  { x: 70, y: 25, connections: [18] },
  { x: 70, y: 55, connections: [] },
  // ── O (índices 19-24)
  { x: 75, y: 30, connections: [20] },
  { x: 80, y: 25, connections: [21] },
  { x: 85, y: 30, connections: [22] },
  { x: 85, y: 50, connections: [23] },
  { x: 80, y: 55, connections: [24] },
  { x: 75, y: 50, connections: [19] },
];

// ── LAYOUT MÓVIL — TE (arriba) / AMO (abajo) ──────────
//    Canvas portrait ~400×700px aprox
//    Fila 1 (TE): y entre 15% y 45%
//    Fila 2 (AMO): y entre 58% y 88%
const layoutMobile = [
  // ── T (índices 0-3) — fila 1, lado izquierdo
  { x: 12, y: 15, connections: [1] }, // 0 top-left
  { x: 22, y: 15, connections: [2] }, // 1 top-mid
  { x: 32, y: 15, connections: [] }, // 2 top-right
  { x: 22, y: 35, connections: [1] }, // 3 bottom (pata vertical)
  // ── E (índices 4-8) — fila 1, lado derecho
  { x: 42, y: 15, connections: [6] }, // 4 top-left de E
  { x: 57, y: 15, connections: [4] }, // 5 top-right de E
  { x: 54, y: 25, connections: [7] }, // 6 mid-right de E
  { x: 42, y: 35, connections: [8] }, // 7 bot-left de E
  { x: 57, y: 35, connections: [] }, // 8 bot-right de E

  // ── A (índices 9-13) — fila 2, izquierda
  { x: 8, y: 76, connections: [10] }, // 9  bot-left
  { x: 20, y: 46, connections: [11] }, // 10 top (punta A)
  { x: 32, y: 76, connections: [] }, // 11 bot-right
  { x: 13, y: 63, connections: [13] }, // 12 mid-left (travesaño)
  { x: 27, y: 63, connections: [] }, // 13 mid-right (travesaño)
  // ── M (índices 14-18) — fila 2, centro
  { x: 40, y: 76, connections: [15] }, // 14 bot-left
  { x: 40, y: 46, connections: [16] }, // 15 top-left
  { x: 52, y: 61, connections: [17] }, // 16 mid-center (pico M)
  { x: 64, y: 46, connections: [18] }, // 17 top-right
  { x: 64, y: 76, connections: [] }, // 18 bot-right
  // ── O (índices 19-24) — fila 2, derecha
  { x: 74, y: 53, connections: [20] }, // 19 top-left
  { x: 84, y: 46, connections: [21] }, // 20 top-center
  { x: 94, y: 53, connections: [22] }, // 21 top-right
  { x: 94, y: 68, connections: [23] }, // 22 bot-right
  { x: 84, y: 76, connections: [24] }, // 23 bot-center
  { x: 74, y: 68, connections: [19] }, // 24 bot-left → cierra la O
];

// ── MERGE posición + datos ──────────────────────────────
function getStars() {
  const isMobile = window.innerWidth < 768;
  const layout = isMobile ? layoutMobile : layoutDesktop;
  return layout.map((pos, i) => ({ ...pos, ...starData[i] }));
}

// ── TAMAÑO DEL CANVAS ──────────────────────────────────
function resize() {
  const parent = canvas.parentElement;
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
  draw();
}

// ── HELPER: % a px ─────────────────────────────────────
function toPixel(star) {
  return {
    px: (star.x / 100) * canvas.width,
    py: (star.y / 100) * canvas.height,
  };
}

// ── ÍCONOS DE ESTRELLAS ────────────────────────────────
function renderStarIcons(stars) {
  document.querySelectorAll(".star-icon").forEach((el) => el.remove());

  stars.forEach((star) => {
    const { px, py } = toPixel(star);

    const icon = document.createElement("i");
    icon.className = "ri-star-fill star-icon";
    icon.style.left = px + "px";
    icon.style.top = py + "px";

    icon.addEventListener("click", () => showModal(star));
    canvas.parentElement.appendChild(icon);
  });
}

// ── LÍNEA CON GLOW ─────────────────────────────────────
function drawGlowLine(x1, y1, x2, y2) {
  ctx.save();

  ctx.shadowColor = "rgba(180, 210, 255, 0.6)";
  ctx.shadowBlur = 12;
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  ctx.shadowColor = "rgba(220, 235, 255, 0.9)";
  ctx.shadowBlur = 6;
  ctx.strokeStyle = "rgba(255,255,255,0.75)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  ctx.restore();
}

// ── DIBUJO ─────────────────────────────────────────────
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const stars = getStars();

  stars.forEach((star) => {
    const { px, py } = toPixel(star);
    star.connections.forEach((targetIndex) => {
      const { px: tx, py: ty } = toPixel(stars[targetIndex]);
      drawGlowLine(px, py, tx, ty);
    });
  });

  renderStarIcons(stars);
}

// ── MODAL ──────────────────────────────────────────────
function showModal(star) {
  document.querySelector(".star-modal")?.remove();

  const modal = document.createElement("div");
  modal.className = "star-modal";
  modal.innerHTML = `
    <button class="modal-close"><i class="ri-close-line"></i></button>
    <div class="modal-header">
      <span class="modal-star-icon">★</span>
      <h3 class="modal-title">${star.label}</h3>
    </div>
    ${star.image ? `<img class="modal-img" src="${star.image}" alt="${star.label}" />` : ""}
    <p class="modal-desc">${star.description}</p>
    <span class="modal-date">${star.date}</span>
  `;

  document.body.appendChild(modal);
  modal
    .querySelector(".modal-close")
    .addEventListener("click", () => modal.remove());
}

// ── INIT ───────────────────────────────────────────────
window.addEventListener("resize", resize);
resize();
