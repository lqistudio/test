// Elementos
const loginBtn = document.getElementById("loginBtn");
const username = document.getElementById("username");
const password = document.getElementById("password");
const message = document.getElementById("message");

const audio = document.getElementById("bgMusic");
audio.volume = 0.7;

const playAudio = document.getElementById("playAudio");
const volumeControl = document.getElementById("volumeControl");

const mobileWarning = document.getElementById("mobileWarning");
const introText = document.getElementById("introText");

// Detectar si es celular
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  // Mostrar advertencia para móvil
  if (mobileWarning) mobileWarning.style.display = "block";
  // Ocultar contenido principal (juego)
  if (introText) introText.style.display = "none";
} else {
  // Solo en desktop: activar audio y controles

  playAudio.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playAudio.textContent = "⏸️";
    } else {
      audio.pause();
      playAudio.textContent = "🔊";
    }
  });

  volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
  });

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      if (password.value === "1234") {
        message.textContent = "¡Bienvenido, ##$%324@38!";
        loginBtn.style.transform = "translate(0,0)";
      } else {
        message.textContent = "Contraseña incorrecta. 🤖";
        errorSound.play();
      }
    });
  }
}

// Sonido de error (fuera del if para que esté disponible)
const errorSound = new Audio("assets/sfx/error.mp3");
