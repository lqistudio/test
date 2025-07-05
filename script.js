document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById("bgMusic");
  const playAudio = document.getElementById("playAudio");
  const volumeControl = document.getElementById("volumeControl");
  const mobileWarning = document.getElementById("mobileWarning");
  const introText = document.getElementById("introText");
  const levelContainer = document.getElementById("levelContainer");
  const errorSound = new Audio("assets/sfx/error.mp3");

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    if (mobileWarning) mobileWarning.style.display = "block";
    if (introText) introText.style.display = "none";
    return;
  }

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

  // ✅ NUEVO: Cargar cualquier nivel
  function loadLevel(n) {
    const basePath = `levels/level${n}/`;
    const htmlUrl = `${basePath}level${n}-content.html`;
    const scriptUrl = `${basePath}level${n}.js`;
    const cssUrl = `${basePath}level${n}.css`;
    const initFunction = `initLevel${n}`;

    fetch(htmlUrl)
      .then(res => res.ok ? res.text() : Promise.reject("Nivel no encontrado"))
      .then(html => {
        levelContainer.innerHTML = html;
        levelContainer.className = `level${n}`;
        levelContainer.style.display = "flex";
        introText.style.display = "none";

        if (!document.getElementById(`level${n}CSS`)) {
          const link = document.createElement('link');
          link.rel = "stylesheet";
          link.href = cssUrl;
          link.id = `level${n}CSS`;
          document.head.appendChild(link);
        }

        const existingScript = document.getElementById('levelScript');
        if (existingScript) existingScript.remove();

        const script = document.createElement("script");
        script.src = scriptUrl;
        script.id = "levelScript";
        script.onload = () => {
          if (typeof window[initFunction] === "function") {
            window[initFunction]();
          }
        };
        document.body.appendChild(script);
      })
      .catch(err => {
        alert(err);
        introText.style.display = "block";
        levelContainer.style.display = "none";
      });
  }

  // ▶️ Botón de JUGAR carga el nivel 1
  const playBtn = document.getElementById("playBtn");
  if (playBtn) {
    playBtn.addEventListener("click", () => loadLevel(1));
  }

  // Protección básica
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('selectstart', e => e.preventDefault());
  document.addEventListener('dragstart', e => e.preventDefault());
});
