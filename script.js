document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById("bgMusic");
  const playAudio = document.getElementById("playAudio");
  const volumeControl = document.getElementById("volumeControl");
  const mobileWarning = document.getElementById("mobileWarning");
  const introText = document.getElementById("introText");
  const levelContainer = document.getElementById("levelContainer");

  const errorSound = new Audio("assets/sfx/error.mp3");

  // Detectar móvil
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    if (mobileWarning) mobileWarning.style.display = "block";
    if (introText) introText.style.display = "none";
    return;
  }

  // Actualizar estilo del volumen
  function updateVolumeStyle(value) {
    const percent = value * 100;
    const color = value < 0.34 ? "#f00" : value < 0.67 ? "#ff0" : "#0f0";
    if (volumeControl) {
      volumeControl.style.background = `linear-gradient(90deg, ${color} ${percent}%, #111 ${percent}%)`;
    }
  }

  // Configurar audio y controles
  if (audio && volumeControl) {
    audio.volume = parseFloat(volumeControl.value);
    updateVolumeStyle(audio.volume);
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

  if (volumeControl && audio) {
    volumeControl.addEventListener("input", () => {
      const val = parseFloat(volumeControl.value);
      audio.volume = val;
      updateVolumeStyle(val);
    });
  }

  // Cargar un nivel HTML + JS + CSS
  function loadLevel(htmlUrl, scriptUrl, cssUrl, cssId = "levelCSS") {
    fetch(htmlUrl)
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar nivel");
        return res.text();
      })
      .then(html => {
        levelContainer.innerHTML = "";
        levelContainer.className = ""; // limpiar clases
        levelContainer.classList.add("level1"); // aplicar clase si se desea

        // Mostrar contenido
        levelContainer.innerHTML = html;
        introText.style.display = "none";
        levelContainer.style.display = "flex";

        // Inyectar CSS solo si no está cargado
        if (cssUrl && !document.getElementById(cssId)) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = cssUrl;
          link.id = cssId;
          document.head.appendChild(link);
        }

        // Eliminar script anterior si existe
        const oldScript = document.getElementById("levelScript");
        if (oldScript) oldScript.remove();

        // Cargar script JS del nivel
        if (scriptUrl) {
          const script = document.createElement("script");
          script.src = scriptUrl;
          script.id = "levelScript";
          script.onload = () => {
            if (typeof initLevel1 === "function") initLevel1();
          };
          document.body.appendChild(script);
        }
      })
      .catch(err => {
        alert(err.message);
        introText.style.display = "block";
        levelContainer.style.display = "none";
        levelContainer.innerHTML = "";
        levelContainer.className = "";
      });
  }

  // Botón para cargar nivel 1
  const playBtn = document.getElementById("playBtn");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      loadLevel("level1-content.html", "level1.js", "level1.css");
    });
  }

  // Evitar copiar y clic derecho
  document.addEventListener("contextmenu", e => e.preventDefault());
  document.addEventListener("selectstart", e => e.preventDefault());
  document.addEventListener("dragstart", e => e.preventDefault());
});
