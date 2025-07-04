document.addEventListener('DOMContentLoaded', () => {
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

  // Sonido de error
  const errorSound = new Audio("assets/sfx/error.mp3");

  // Detectar si es celular
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Mostrar advertencia para móvil
    if (mobileWarning) mobileWarning.style.display = "block";
    if (introText) introText.style.display = "none";
  } else {
    // PLAY / PAUSE
    playAudio.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playAudio.textContent = "⏸️";
      } else {
        audio.pause();
        playAudio.textContent = "🔊";
      }
    });

    // CONTROL DE VOLUMEN
    const updateVolumeStyle = (value) => {
      let color = "#0f0"; // verde por defecto
      if (value < 0.34) color = "#f00"; // rojo
      else if (value < 0.67) color = "#ff0"; // amarillo

      volumeControl.style.background = `linear-gradient(90deg, ${color} ${value * 100}%, #333 ${value * 100}%)`;
    };

    // Estilo inicial de la barra
    updateVolumeStyle(audio.volume);

    volumeControl.addEventListener("input", () => {
      const value = parseFloat(volumeControl.value);
      audio.volume = value;
      updateVolumeStyle(value);
    });

    // LOGIN
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
});
