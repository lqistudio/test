document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById("bgMusic");
  const playAudio = document.getElementById("playAudio");
  const volumeControl = document.getElementById("volumeControl");
  const mobileWarning = document.getElementById("mobileWarning");
  const introText = document.getElementById("introText");
  const levelContainer = document.getElementById("levelContainer");

  const levels = Array.from({ length: 10 }, (_, i) => ({
    html: `levels/level${i + 1}/level${i + 1}-content.html`,
    js: `levels/level${i + 1}/level${i + 1}.js`,
    css: `levels/level${i + 1}/level${i + 1}.css`,
    init: `initLevel${i + 1}`
  }));

  let currentLevel = 0;

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

  function loadLevelByIndex(index) {
    const level = levels[index];
    if (!level) {
      alert("🏁 ¡Completaste todos los niveles!");
      return;
    }

    fetch(level.html)
      .then(res => res.text())
      .then(html => {
        levelContainer.innerHTML = html;
        levelContainer.style.display = "flex";
        introText.style.display = "none";

        const oldCss = document.getElementById("levelCSS");
        if (oldCss) oldCss.remove();

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = level.css;
        link.id = "levelCSS";
        document.head.appendChild(link);

        const prevScript = document.getElementById("levelScript");
        if (prevScript) prevScript.remove();

        const script = document.createElement("script");
        script.src = level.js;
        script.id = "levelScript";
        script.onload = () => {
          if (typeof window[level.init] === "function") {
            window[level.init]();
          }
        };
        document.body.appendChild(script);
      });
  }

  window.nextLevel = function () {
    currentLevel++;
    loadLevelByIndex(currentLevel);
  };

  const playBtn = document.getElementById("playBtn");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      currentLevel = 0;
      loadLevelByIndex(currentLevel);
    });
  }

  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('selectstart', e => e.preventDefault());
  document.addEventListener('dragstart', e => e.preventDefault());
});
