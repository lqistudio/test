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
    mobileWarning.style.display = "block";
    introText.style.display = "none";
    return;
  }

  // Volumen dinámico
  function updateVolumeStyle(v) {
    const pct = v * 100;
    const c = v < .34 ? "#f00" : v < .67 ? "#ff0" : "#0f0";
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
  playAudio?.addEventListener("click", () => {
    if (audio.paused) { audio.play(); playAudio.textContent = "⏸️"; }
    else { audio.pause(); playAudio.textContent = "▶️"; }
  });

  // Cargar nivel dinámico
  function loadLevel(n, htm, jsfile, cssfile) {
    fetch(htm)
      .then(r => r.ok ? r.text() : Promise.reject("Nivel no encontrado"))
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
        const prev = document.getElementById("js-level");
        prev?.remove();
        const s = document.createElement("script");
        s.id = "js-level";
        s.src = jsfile;
        document.body.appendChild(s);
      })
      .catch(err => {
        alert(err);
        introText.style.display = "block";
        levelContainer.style.display = "none";
      });
  }

  // Ejemplo: cargar nivel 1
  document.getElementById("playBtn")?.addEventListener("click", () => {
    loadLevel(
      1,
      "levels/level1-content.html",
      "js/level1.js",
      "css/level1.css"
    );
  });

  // Protecciones de interfaz
  ["contextmenu","selectstart","dragstart"].forEach(e => 
    document.addEventListener(e, ev => ev.preventDefault())
  );
});
