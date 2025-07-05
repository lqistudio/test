document.addEventListener('DOMContentLoaded', () => {
  // Elementos comunes
  const audio = document.getElementById("bgMusic");
  const playAudio = document.getElementById("playAudio");
  const volumeControl = document.getElementById("volumeControl");
  const mobileWarning = document.getElementById("mobileWarning");
  const introText = document.getElementById("introText");
  const levelContainer = document.getElementById("levelContainer");

  const errorSound = new Audio("assets/sfx/error.mp3");

  // Detectar si es móvil
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    if (mobileWarning) mobileWarning.style.display = "block";
    if (introText) introText.style.display = "none";
    return;
  }

  // Volumen visual
  function updateVolumeStyle(value) {
    const percent = value * 100;
    const color1 = value < 0.34 ? "#f00" : value < 0.67 ? "#ff0" : "#0f0";
    if (volumeControl) {
      volumeControl.style.background = `linear-gradient(90deg, ${color1} ${percent}%, #111 ${percent}%)`;
    }
  }

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

  // Cargar nivel (HTML + Script + Clase CSS)
  function loadLevel(htmlUrl, scriptUrl) {
    fetch(htmlUrl)
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar nivel");
        return res.text();
      })
      .then(html => {
        // Limpiar contenedor y mostrar
        levelContainer.innerHTML = "";
        levelContainer.className = ""; // Limpiar clases previas
        levelContainer.classList.add("level1"); // Aplicar clase de nivel

        // Mostrar contenido del nivel
        levelContainer.innerHTML = html;
        introText.style.display = "none";
        levelContainer.style.display = "flex"; // mejor que block para centrado

        // Cargar CSS si no está cargado aún (opcional, si tienes CSS separado)
        if (!document.getElementById('level1CSS')) {
          const link = document.createElement('link');
          link.rel = "stylesheet";
          link.href = "level1.css";
          link.id = "level1CSS";
          document.head.appendChild(link);
        }

        // Cargar script del nivel
        if (scriptUrl) {
          const prevScript = document.getElementById('levelScript');
          if (prevScript) prevScript.remove();

          const script = document.createElement("script");
          script.src = scriptUrl;
          script.id = "levelScript";
          script.onload = () => {
            if (typeof initLevel1 === "function") {
              initLevel1(); // Ejecutar función principal del nivel
            }
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

  // Botón que lanza el primer nivel
  const playBtn = document.getElementById("playBtn");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      loadLevel("level1-content.html", "level1.js");
    });
  }

  // Proteger contenido
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('selectstart', e => e.preventDefault());
  document.addEventListener('dragstart', e => e.preventDefault());
});
