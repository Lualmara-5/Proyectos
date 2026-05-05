const musicBtn = document.querySelector(".music-btn");
const icon = musicBtn.querySelector("i");

// Crear audio
const audio = new Audio("assets/audio/music.mp3");
audio.loop = true;

let isPlaying = false;

// Intentar autoplay después de 2 segundos
setTimeout(() => {
  audio
    .play()
    .then(() => {
      isPlaying = true;
    })
    .catch(() => {
      // Si el navegador bloquea autoplay, no pasa nada
      isPlaying = false;
    });
}, 2000);

// Evento del botón
musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    // Pausar
    audio.pause();
    audio.currentTime = 0;
    isPlaying = false;

    icon.classList.remove("ri-volume-up-line");
    icon.classList.add("ri-volume-mute-line");
  } else {
    // Reproducir desde 0
    audio.currentTime = 0;
    audio.play();
    isPlaying = true;

    icon.classList.remove("ri-volume-mute-line");
    icon.classList.add("ri-volume-up-line");
  }
});
