const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

//
// 1. Mover BTN No aleatoriamente
//
function moveNoButton(strength = 1) {
  const maxX = window.innerWidth - noBtn.offsetWidth - 20;
  const maxY = window.innerHeight - noBtn.offsetHeight - 20;

  // Posiciones siempre dentro de pantalla
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  // Aplicar movimiento
  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // Activar vibración
  vibrateNoButton();
}

//
// 2. Vibrar (Simula Miedo)
//
function vibrateNoButton() {
  noBtn.classList.add("shake");

  setTimeout(() => {
    noBtn.classList.remove("shake");
  }, 1000);
}

//
// 3. Escapar por click
//
noBtn.addEventListener("click", () => moveNoButton());

//
// 4. Escapar si esta cerca
//
document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();

  const distancia = Math.hypot(
    e.clientX - (rect.left + rect.width / 2),
    e.clientY - (rect.top + rect.height / 2)
  );

  if (distancia < 140 && window.innerWidth > 768) {
    moveNoButton(2.2);
  }
});

//
// 5. Modal
//
yesBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

//
// 6. Lluvia de Corazones
//

const heartStyles = ["❤️", "💓", "💖"];

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");

  // Emoji aleatorio
  heart.textContent =
    heartStyles[Math.floor(Math.random() * heartStyles.length)];

  // Posición horizontal aleatoria
  heart.style.left = Math.random() * 100 + "vw";

  // Tamaño aleatorio
  const size = Math.random() * 20 + 20; // entre 20px y 40px
  heart.style.fontSize = size + "px";

  // Duración de caída aleatoria
  const duration = Math.random() * 3 + 3; // entre 3s y 6s
  heart.style.animationDuration = duration + "s";

  document.body.appendChild(heart);

  // Eliminar corazón al terminar
  setTimeout(() => heart.remove(), duration * 1000);
}

// Crear un corazón cada 300ms
setInterval(createHeart, 150);
