const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

// ── DATOS (solo info, sin posición) ────────────────────
const starData = [
  // 0
  {
    label: "La primera vez que hablamos",
    date: "Enero 2021",
    description: "No imaginaba que ese simple mensaje cambiaría todo.",
    image: "assets/images/recuerdos/recuerdo1.jpg",
  },
  // 1
  {
    label: "Cuando me hiciste reír",
    date: "Enero 2021",
    description: "Ahí supe que tenías algo especial.",
    image: "assets/images/recuerdos/recuerdo2.jpg",
  },
  // 2
  {
    label: "Las primeras conversaciones largas",
    date: "Febrero 2021",
    description: "Horas hablando y aún así no era suficiente.",
    image: "assets/images/recuerdos/recuerdo3.jpg",
  },
  // 3
  {
    label: "El inicio de algo bonito",
    date: "Febrero 2021",
    description: "Sin darnos cuenta, ya éramos importantes.",
    image: "assets/images/recuerdos/recuerdo4.jpg",
  },
  // 4
  {
    label: "Nuestra primera cita",
    date: "Febrero 2021",
    description: "Los nervios, las miradas, todo valió la pena.",
    image: "assets/images/recuerdos/recuerdo5.jpg",
  },
  // 5
  {
    label: "Ese día especial",
    date: "Febrero 2021",
    description: "El momento en que todo se sintió diferente.",
    image: "assets/images/recuerdos/recuerdo6.jpg",
  },
  // 6
  {
    label: "Las primeras salidas",
    date: "Marzo 2021",
    description: "Cada momento contigo era único.",
    image: "assets/images/recuerdos/recuerdo8.jpg",
  },
  // 7
  {
    label: "Los pequeños detalles",
    date: "Abril 2021",
    description: "Ahí entendí que el amor está en lo simple.",
    image: "assets/images/recuerdos/recuerdo9.jpg",
  },
  // 8
  {
    label: "Momentos inolvidables",
    date: "Abril 2021",
    description: "Cada día contigo sumaba algo hermoso.",
    image: "assets/images/recuerdos/recuerdo10.jpg",
  },
  // 9
  {
    label: "Nuestro primer viaje",
    date: "Junio 2022",
    description: "Descubriendo lugares… y más de nosotros.",
    image: "assets/images/recuerdos/recuerdo11.jpg",
  },
  // 10
  {
    label: "Ese abrazo especial",
    date: "Junio 2022",
    description: "Sentí que ahí era donde pertenecía.",
    image: "assets/images/recuerdos/recuerdo12.jpg",
  },
  // 11
  {
    label: "Las risas sin control",
    date: "Julio 2022",
    description: "Contigo todo es más divertido.",
    image: "assets/images/recuerdos/recuerdo13.jpg",
  },
  // 12
  {
    label: "Momentos simples",
    date: "Julio 2022",
    description: "Pero contigo, todo se siente grande.",
    image: "assets/images/recuerdos/recuerdo14.jpg",
  },
  // 13
  {
    label: "Miradas que dicen todo",
    date: "Julio 2022",
    description: "A veces no hacen falta palabras.",
    image: "assets/images/recuerdos/recuerdo15.jpg",
  },
  // 14
  {
    label: "Días difíciles",
    date: "2022",
    description: "Pero siempre juntos, siempre fuertes.",
    image: "assets/images/recuerdos/recuerdo16.jpg",
  },
  // 15
  {
    label: "Apoyándonos",
    date: "2022",
    description: "Nunca soltándonos, pase lo que pase.",
    image: "assets/images/recuerdos/recuerdo17.jpg",
  },
  // 16
  {
    label: "Creciendo juntos",
    date: "2022",
    description: "Aprendiendo uno del otro cada día.",
    image: "assets/images/recuerdos/recuerdo18.jpg",
  },
  // 17
  {
    label: "Sueños compartidos",
    date: "2023",
    description: "Pensando en todo lo que vendrá.",
    image: "assets/images/recuerdos/recuerdo19.jpg",
  },
  // 18
  {
    label: "Nuestro camino",
    date: "2023",
    description: "Construyendo algo real y bonito.",
    image: "assets/images/recuerdos/recuerdo20.jpg",
  },
  // 19
  {
    label: "Tu sonrisa",
    date: "Siempre",
    description: "Lo que ilumina incluso mis días grises.",
    image: "assets/images/recuerdos/recuerdo21.jpg",
  },
  // 20
  {
    label: "Tu mirada",
    date: "Siempre",
    description: "Donde me pierdo y me encuentro.",
    image: "assets/images/recuerdos/recuerdo22.jpg",
  },
  // 21
  {
    label: "Tu forma de ser",
    date: "Siempre",
    description: "Eso que te hace única.",
    image: "assets/images/recuerdos/recuerdo23.jpg",
  },
  // 22
  {
    label: "Todo lo que eres",
    date: "Siempre",
    description: "Y todo lo que amo de ti.",
    image: "assets/images/recuerdos/recuerdo24.jpg",
  },
  // 23
  {
    label: "Lo que hemos construido",
    date: "Hoy",
    description: "Cada recuerdo forma este amor.",
    image: "assets/images/recuerdos/recuerdo25.jpg",
  },
  // 24
  {
    label: "Te amo",
    date: "Siempre",
    description: "Y esto es solo el comienzo.",
    image: "assets/images/recuerdos/recuerdo26.jpg",
  },
  // 25
  {
    label: "Un día cualquiera contigo",
    date: "2023",
    description: "Incluso lo simple se vuelve especial si es contigo.",
    image: "assets/images/recuerdos/recuerdo25.jpg",
  },
  // 26
  {
    label: "Tus mensajes",
    date: "Siempre",
    description: "Siempre logran sacarme una sonrisa.",
    image: "assets/images/recuerdos/recuerdo26.jpg",
  },
  // 27
  {
    label: "Cuando te extraño",
    date: "Siempre",
    description: "Porque incluso en la distancia estás presente.",
    image: "assets/images/recuerdos/recuerdo27.jpg",
  },
  // 28
  {
    label: "Nuestros silencios",
    date: "Siempre",
    description: "Porque incluso sin hablar, todo se siente bien.",
    image: "assets/images/recuerdos/recuerdo28.jpg",
  },
  // 29
  {
    label: "Tu compañía",
    date: "Siempre",
    description: "Es mi lugar favorito en el mundo.",
    image: "assets/images/recuerdos/recuerdo29.jpg",
  },
  // 30
  {
    label: "Pequeños momentos",
    date: "Siempre",
    description: "Que terminan siendo los más grandes.",
    image: "assets/images/recuerdos/recuerdo30.jpg",
  },
  // 31
  {
    label: "Cuando pienso en ti",
    date: "Siempre",
    description: "Es inevitable sonreír sin razón.",
    image: "assets/images/recuerdos/recuerdo31.jpg",
  },
  // 32
  {
    label: "Nuestro presente",
    date: "Hoy",
    description: "Donde todo lo vivido cobra sentido.",
    image: "assets/images/recuerdos/recuerdo32.jpg",
  },
  // 33
  {
    label: "Lo que viene",
    date: "Futuro",
    description: "Todo lo que aún nos falta por vivir juntos.",
    image: "assets/images/recuerdos/recuerdo33.jpg",
  },
  // 34
  {
    label: "Cada día contigo",
    date: "Siempre",
    description: "Es una nueva razón para agradecer.",
    image: "assets/images/recuerdos/recuerdo34.jpg",
  },
  // 35
  {
    label: "Nuestro amor",
    date: "Siempre",
    description: "No perfecto, pero real y fuerte.",
    image: "assets/images/recuerdos/recuerdo35.jpg",
  },
  // 36
  {
    label: "Para siempre",
    date: "∞",
    description: "Porque esto no tiene final.",
    image: "assets/images/recuerdos/recuerdo36.jpg",
  },
];

// ── LAYOUT DESKTOP — T E  A M O (horizontal) ──────────
const layoutDesktop = [
  // ── T mayúscula ──────────────────────────────────
  { x: 7.0, y: 28.0, connections: [1] },
  { x: 11.5, y: 27.5, connections: [2, 3] },
  { x: 16.0, y: 28.0, connections: [] },
  { x: 11.8, y: 46.0, connections: [4] },
  { x: 13.5, y: 57.0, connections: [] },

  // ── e minúscula ─────────────────────────────────
  { x: 20.5, y: 50.0, connections: [10, 11] },
  { x: 19.5, y: 45.0, connections: [5] },
  { x: 21.5, y: 39.0, connections: [6] },
  { x: 24.5, y: 37.0, connections: [7] },
  { x: 26.5, y: 41.0, connections: [8] },
  { x: 23.5, y: 47.0, connections: [9] },
  { x: 22, y: 55.0, connections: [] },
  { x: 25, y: 55.0, connections: [11] },
  { x: 27.5, y: 50.0, connections: [12] },

  // ── a minúscula ────────────────────────────────
  { x: 42.5, y: 36.0, connections: [15] }, //1
  { x: 47.0, y: 30.0, connections: [16] }, //2
  { x: 51.0, y: 36.0, connections: [17] }, //3
  { x: 50.5, y: 42.0, connections: [18] }, //4
  { x: 50.0, y: 54.0, connections: [19, 20] }, //5
  { x: 51.5, y: 56.5, connections: [] }, //6
  { x: 46.0, y: 56.0, connections: [21] }, //7
  { x: 43.0, y: 49.0, connections: [22] }, //8
  { x: 46.0, y: 42.0, connections: [17] }, //9

  // ── m minúscula ────────────────────────────────
  { x: 55.0, y: 33.0, connections: [24, 25] },
  { x: 55.2, y: 49.0, connections: [] },
  { x: 59.5, y: 30.5, connections: [26] },
  { x: 63.0, y: 34.5, connections: [27, 28] },
  { x: 63.2, y: 49.5, connections: [] },
  { x: 67.0, y: 30.0, connections: [29] },
  { x: 70.5, y: 35.0, connections: [30] },
  { x: 70.8, y: 49.5, connections: [] },

  // ── o minúscula ────────────────────────────────
  { x: 77.0, y: 31.5, connections: [32, 36] },
  { x: 82.0, y: 28.5, connections: [33] },
  { x: 85.5, y: 36.0, connections: [34] },
  { x: 84.5, y: 47.5, connections: [35] },
  { x: 79.5, y: 52.0, connections: [36] },
  { x: 75.5, y: 44.5, connections: [] },
];

// ── LAYOUT MÓVIL — TE (arriba) / AMO (abajo) ──────────
const layoutMobile = [
  // ── T (0-4) — fila 1 izquierda
  { x: 8, y: 10, connections: [1] },
  { x: 18, y: 9.5, connections: [2, 3] },
  { x: 28, y: 10, connections: [] },
  { x: 18, y: 22, connections: [4] },
  { x: 22, y: 30, connections: [] },

  // ── e (5-13) — fila 1 derecha
  { x: 38, y: 28, connections: [10, 11] }, //1
  { x: 36, y: 24, connections: [5] }, //2
  { x: 38, y: 20, connections: [6] }, //3
  { x: 51, y: 18, connections: [7] }, //4
  { x: 56.5, y: 22, connections: [8] }, //5
  { x: 49, y: 26, connections: [9] }, //6
  { x: 40, y: 32, connections: [] }, //7
  { x: 52, y: 32, connections: [11] }, //8
  { x: 60, y: 28, connections: [12] }, //9

  // ── a (14-22) — fila 2 izquierda
  { x: 17, y: 50, connections: [15] },
  { x: 23, y: 48, connections: [16] },
  { x: 29, y: 52, connections: [17] },
  { x: 28, y: 58, connections: [18] },
  { x: 27, y: 65, connections: [19, 20] },
  { x: 31, y: 68, connections: [] },
  { x: 20, y: 70, connections: [21] },
  { x: 13, y: 66, connections: [22] },
  { x: 15, y: 58, connections: [17] },
  //48 - 65

  // ── m (23-30) — fila 2 centro
  { x: 43, y: 50, connections: [24, 25] },
  { x: 43, y: 65, connections: [] },
  { x: 48, y: 48, connections: [26] },
  { x: 53, y: 52, connections: [27, 28] },
  { x: 53, y: 65, connections: [] },
  { x: 58, y: 48, connections: [29] },
  { x: 63, y: 52, connections: [30] },
  { x: 63, y: 65, connections: [] },

  // ── o (31-36) — fila 2 derecha
  { x: 74, y: 50, connections: [32, 36] },
  { x: 83, y: 47, connections: [33] },
  { x: 90, y: 52, connections: [34] },
  { x: 89, y: 62, connections: [35] },
  { x: 81, y: 64, connections: [36] },
  { x: 73, y: 59, connections: [] },
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
