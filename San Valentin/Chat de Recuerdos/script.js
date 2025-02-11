const respuestas = {
  // Fechas especiales
  "primera cena":
    "El 17 de marzo de 2023, nuestra primera cena juntos, ¡una noche mágica! 🍝✨",
  "primer beso":
    "El 9 de junio de 2023, un beso que selló nuestra conexión 💋💖",
  "primera pelea":
    "El 22 de agosto de 2023, el día en que discutimos por primera vez, pero aprendimos mucho 💬💑",
  "primer viaje":
    "El 12 de noviembre de 2023, nuestro primer viaje juntos, ¡un recuerdo para toda la vida! 🌍✈️",
  "primer 'te amo'":
    "El 25 de diciembre de 2023, ese momento tan especial cuando te dije por primera vez 'te amo' 🎄❤️",
  "primer te amo":
    "El 25 de diciembre de 2023, ese momento tan especial cuando te dije por primera vez 'te amo' 🎄❤️",
  "primera sorpresa":
    "El 30 de enero de 2024, la primera vez que te sorprendí con algo especial 🎁💐",

  // Frases románticas
  "te amo más": "NO, yo te amo más, mi amor 💖😾",
  "te amo": "Yo te amo más, mi amor 💖🥰",
  "me extrañas": "Siempre te extraño cuando no estamos juntos 💞",
  "me quieres": "Más de lo que las palabras pueden expresar 💓",
  "te gusto": "Obvio, eres lo mejor que me ha pasado 😘",
  "me haces feliz": "Tu felicidad es mi mayor alegría 💖",

  // Saludo
  holaa: "¡Holaaa, mi cielo! ¿Cómo va tu día? ☀️",
  hola: "¡Hola, amor! ¿Cómo está mi persona favorita? 😍",
  "hola amor": "¡Hola, mi vida! Te extrañé 💕",
  "buenos días": "¡Buenos días, mi amor! Que tengas un día hermoso 🌞",
  "buenas tardes": "Buenas tardes, corazón. ¿Cómo te ha ido? 💕",
  "buenas noches": "Dulces sueños, mi vida 😘✨",

  // Conversación

  como: "Bien amor, y tú?",
  cómo: "Bien amor, y tú?😊",
  bien: "Me alegro mucho 💖",

  // Despedidas (Detecta "chao" con o sin muchas 'o')
  chaoo: "¡Chaooo, mi cielo! Nos hablamos pronto 💖",
  chao: "¡Chao, mi amor! Cuídate mucho 💞",
  "adiós amor": "No me gusta decir adiós, mejor un hasta luego 😘",
  "nos vemos": "Nos vemos pronto, amorcito 💕",
  "te extraño": "Yo también te extraño, mi amor 😭💖",

  // Respuestas aleatorias cuando no reconoce el mensaje
  pregunta_aleatoria: [
    "¿Ya comiste, amor? 🍽️💖",
    "¿Cómo ha estado tu día, mi vida? 😊",
    "¿Sabías que te amo muchísimo? 💕",
    "¡Dime algo bonito! 💌",
    "Si tuvieras que describirme en una palabra, ¿cuál sería? 😘",
    "Si pudiéramos viajar ahora mismo, ¿a dónde iríamos? ✈️💖",
  ],
};

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", () => {
  let mensaje = userInput.value.trim();
  if (mensaje === "") return;

  agregarMensaje(mensaje, "sent");

  let respuesta = obtenerRespuesta(mensaje);
  setTimeout(() => {
    if (respuesta) {
      agregarMensaje(respuesta, "received");
    } else {
      // Elegir un mensaje aleatorio de la lista de preguntas aleatorias
      let mensajesAleatorios = respuestas["pregunta_aleatoria"];
      let mensajeAleatorio =
        mensajesAleatorios[
          Math.floor(Math.random() * mensajesAleatorios.length)
        ];
      agregarMensaje(mensajeAleatorio, "received");
    }
  }, 1000);

  userInput.value = "";
});

function agregarMensaje(texto, clase) {
  let mensaje = document.createElement("div");
  mensaje.classList.add("message", clase);
  mensaje.textContent = texto;
  chatBox.appendChild(mensaje);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function obtenerRespuesta(mensaje) {
  for (let clave in respuestas) {
    if (mensaje.toLowerCase().includes(clave)) {
      return respuestas[clave];
    }
  }
  return null;
}
