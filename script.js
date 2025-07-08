document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById("bgMusic");
  const playAudio = document.getElementById("playAudio");
  const volumeControl = document.getElementById("volumeControl");
  const mobileWarning = document.getElementById("mobileWarning");
  const introText = document.getElementById("introText");
  const levelContainer = document.getElementById("levelContainer");
  const errorSound = new Audio("assets/sfx/error.mp3");

  let currentLevel = 1;

  // Detectar móvil
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

  // Mostrar menú principal
  function showIntro() {
    introText.style.display = "flex";
    levelContainer.style.display = "none";
    levelContainer.innerHTML = "";
    levelContainer.className = "";
  }

  // Salir de nivel
  function exitLevel() {
    showIntro();
  }

  // Cargar nivel
  function loadLevel(n, htm, jsfile, cssfile) {
    currentLevel = n;

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

        // Carga CSS
        if (!document.getElementById(`css-level${n}`)) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = cssfile;
          link.id = `css-level${n}`;
          document.head.appendChild(link);
        }

        // Carga JS
        const prevScript = document.getElementById("js-level");
        if (prevScript) prevScript.remove();

        const script = document.createElement("script");
        script.id = "js-level";
        script.src = jsfile;
        document.body.appendChild(script);

        // NOTA: Guarda progreso desde el nivel individual cuando el usuario realmente termine el nivel
      })
      .catch(err => {
        alert(err.message);
        showIntro();
      });
  }

  // Exponer funciones para niveles y otros scripts
  window.loadLevel = loadLevel;
  window.showIntro = showIntro;
  window.exitLevel = exitLevel;

  // Botón PLAY
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

  // Botón INSTRUCCIONES
  const instructionsBtn = document.getElementById("instructionsBtn");
  if (instructionsBtn) {
    instructionsBtn.addEventListener("click", () => {
      window.open("instruciones/instrucciones.html", "_blank");
    });
  }

  // Protección UI (evitar clic derecho, selección, drag)
  ["contextmenu", "selectstart", "dragstart"].forEach(eventType =>
    document.addEventListener(eventType, ev => ev.preventDefault())
  );
});
