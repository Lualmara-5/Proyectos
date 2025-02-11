const mensajes = [
  { texto: "Claro, me encantaría", tipo: "sent" },
  { texto: "¿Recuerdas nuestro primer beso? 💋", tipo: "received" },
  { texto: "¡Sí, claro! Fue un día tan especial para mí.", tipo: "sent" },
  {
    texto:
      "¡Qué lindo! Fue el 9 de junio de 2023, un beso que selló nuestra conexión. ¡Nunca lo olvidaré! 💖",
    tipo: "received",
  },
  {
    texto: "¿Qué te parece si seguimos recordando otros momentos especiales?",
    tipo: "received",
  },
  { texto: "Sí, me encantaría. ¿Qué más recuerdas?", tipo: "sent" },
  {
    texto:
      "Recuerdo nuestro primer viaje juntos. Fue el 12 de noviembre de 2023, un recuerdo para toda la vida. 🌍✈️",
    tipo: "received",
    imagen: "Imagenes/Viaje.jpg",
  },
  {
    texto:
      "¡Qué increíble! Fue un viaje muy especial. ¿Cómo olvidar esa experiencia?",
    tipo: "sent",
  },
  {
    texto:
      "¡Me alegra que te haya gustado! ¿Recuerdas cuándo te dije 'te amo' por primera vez?",
    tipo: "received",
  },
  {
    texto:
      "Sí, fue el 25 de diciembre de 2023, y fue un momento mágico para mí. 🎄❤️",
    tipo: "sent",
  },
  {
    texto:
      "¡Qué lindo! Esos momentos son los que siempre llevo en mi corazón. 💖",
    tipo: "received",
  },
  {
    texto: "A mí también, amor. Cada día contigo es especial. 💕",
    tipo: "sent",
  },
  { texto: "¡Recuerdos completados! 😊", tipo: "received" },
];

let indiceMensaje = 0;

const chatBox = document.getElementById("chat-box");
const nextButton = document.getElementById("next-button");

nextButton.addEventListener("click", () => {
  if (indiceMensaje < mensajes.length) {
    const mensaje = mensajes[indiceMensaje];
    agregarMensaje(mensaje.texto, mensaje.tipo, mensaje.imagen);
    indiceMensaje++;
  } else {
    nextButton.disabled = true;
  }
});

function agregarMensaje(texto, tipo, imagen = null) {
  let mensaje = document.createElement("div");
  mensaje.classList.add("message", tipo);
  mensaje.textContent = texto;

  if (imagen) {
    let img = document.createElement("img");
    img.src = imagen;
    img.alt = "Recuerdo especial";
    img.style.maxWidth = "100%";
  }

  chatBox.appendChild(mensaje);
  chatBox.scrollTop = chatBox.scrollHeight;
}
