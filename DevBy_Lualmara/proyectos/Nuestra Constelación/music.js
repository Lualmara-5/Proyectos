const musicBtn = document.querySelector(".music-btn");
const icon = musicBtn.querySelector("i");

const audio = new Audio("assets/audio/music.mp3");
audio.loop = true;

let isPlaying = false;
let audioStarted = false;

function startAudio() {
  if (audioStarted) return;
  audioStarted = true;

  audio
    .play()
    .then(() => {
      isPlaying = true;
      setIcon(true);
    })
    .catch(() => {
      isPlaying = false;
      audioStarted = false;
    });
}

function setIcon(playing) {
  if (playing) {
    icon.classList.remove("ri-volume-mute-line");
    icon.classList.add("ri-volume-up-line");
  } else {
    icon.classList.remove("ri-volume-up-line");
    icon.classList.add("ri-volume-mute-line");
  }
}

// Estado inicial: mute
setIcon(false);

// Click en el BOTÓN (prioridad total)
musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  if (!audioStarted) {
    startAudio();
    return;
  }

  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    setIcon(false);
  } else {
    audio.play();
    isPlaying = true;
    setIcon(true);
  }
});

// Click en CUALQUIER LUGAR
document.addEventListener("click", () => {
  if (!audioStarted) {
    startAudio();
  }
});
