document.addEventListener('DOMContentLoaded', () => {
  // Elementos principales
  const audio = document.getElementById("bgMusic");
  const playAudio = document.getElementById("playAudio");
  const volumeControl = document.getElementById("volumeControl");
  const mobileWarning = document.getElementById("mobileWarning");
  const introText = document.getElementById("introText");
  const levelContainer = document.getElementById("levelContainer");
  const errorSound = new Audio("assets/sfx/error.mp3");

  // Detección móvil
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    if (mobileWarning) mobileWarning.style.display = "block";
    if (introText) introText.style.display = "none";
    return;
  }

  // Volumen dinámico
  function updateVolumeStyle(v) {
    const pct = v * 100;
    const c = v < 0.34 ? "#f00" : v < 0.67 ? "#ff0" : "#0f0";
    volumeControl.style.background = `linear-gradient(90deg, ${c} ${pct}%, #111 ${pct}%)`;
  }

  if (audio && volumeControl) {
    audio.volume = +volumeControl.value;
    updateVolumeStyle(audio.volume);
    volumeControl.oninput = () => {
      audio.volume = +volumeControl.value;
      updateVolumeStyle(audio.volume);
    };
  }

  if (playAudio && audio) {
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

  // Función para cargar niveles
  function loadLevel(n, htm, jsfile, cssfile) {
    fetch(htm)
      .then(r => {
        if (!r.ok) throw new Error("Nivel no encontrado");
        return r.text();
      })
      .then(html => {
        levelContainer.innerHTML = html;
        levelContainer.className = `level${n}`;
        introText.style.display = "none";
        levelContainer.style.display = "flex";

        // Carga CSS del nivel
        if (!document.getElementById(`css-level${n}`)) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = cssfile;
          link.id = `css-level${n}`;
          document.head.appendChild(link);
        }

        // Carga JS del nivel
        const prevScript = document.getElementById("js-level");
        if (prevScript) prevScript.remove();

        const script = document.createElement("script");
        script.id = "js-level";
        script.src = jsfile;
        document.body.appendChild(script);
      })
      .catch(err => {
        alert(err.message);
        showIntro(); // usa la función que ahora limpia y muestra bien
      });
  }

  // Función para mostrar menú inicial correctamente
  function showIntro() {
    introText.style.display = "flex"; // muy importante para mantener el flex
    levelContainer.style.display = "none";
    levelContainer.innerHTML = "";
    levelContainer.className = "";
  }

  // Función para salir del nivel y volver al menú
  function exitLevel() {
    showIntro();
  }

  // Exponer funciones globalmente para game.js y otros
  window.loadLevel = loadLevel;
  window.showIntro = showIntro;
  window.exitLevel = exitLevel;

  // Botón PLAY → Nivel 1
  const playBtn = document.getElementById("playBtn");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      loadLevel(
        1,
        "levels/level1/level1-content.html",
        "levels/level1/level1.js",
        "levels/level1/level1.css"
      );
    });
  }

  // Botón INSTRUCCIONES → Abre la guía en otra pestaña
  const instructionsBtn = document.getElementById("instructionsBtn");
  if (instructionsBtn) {
    instructionsBtn.addEventListener("click", () => {
      window.open("instruciones/instrucciones.html", "_blank");
    });
  }

  // Proteger la interfaz (evitar clic derecho y selección)
  ["contextmenu", "selectstart", "dragstart"].forEach(eventType =>
    document.addEventListener(eventType, ev => ev.preventDefault())
  );
});
