document.addEventListener('DOMContentLoaded', () => {
  // Elementos
  const loginBtn = document.getElementById("loginBtn");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const message = document.getElementById("message");

  const audio = document.getElementById("bgMusic");
  const playAudio = document.getElementById("playAudio");
  const volumeControl = document.getElementById("volumeControl");
  const mobileWarning = document.getElementById("mobileWarning");
  const introText = document.getElementById("introText");

  // Sonido de error
  const errorSound = new Audio("assets/sfx/error.mp3");

  // Función para actualizar el estilo dinámico del volumen
  const updateVolumeStyle = (value) => {
    const percent = value * 100;
    const color1 = value < 0.34 ? "#f00" : value < 0.67 ? "#ff0" : "#0f0";
    volumeControl.style.background = `linear-gradient(90deg, ${color1} ${percent}%, #111 ${percent}%)`;
  };

  // Detectar si es celular
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    if (mobileWarning) mobileWarning.style.display = "block";
    if (introText) introText.style.display = "none";
    return;
  }

  // Configurar audio solo para desktop
  if (audio) {
    audio.volume = parseFloat(volumeControl.value);
    updateVolumeStyle(audio.volume);
  }

  // Botón de reproducir/pausar música
  if (playAudio) {
    playAudio.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playAudio.textContent = "⏸️";
        playAudio.title = "Pausar música";
      } else {
        audio.pause();
        playAudio.textContent = "▶️";
        playAudio.title = "Reproducir música";
      }
    });
  }

  // Barra de volumen dinámica
  if (volumeControl) {
    volumeControl.addEventListener("input", () => {
      const val = parseFloat(volumeControl.value);
      audio.volume = val;
      updateVolumeStyle(val);
    });
  }

  // Validación simple del login
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      if (password.value === "1234") {
        message.textContent = "¡Bienvenido, ##$%324@38!";
      } else {
        message.textContent = "Contraseña incorrecta. 🤖";
        errorSound.play();
      }
    });
  }
});
