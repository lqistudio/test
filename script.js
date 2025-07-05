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
    mobileWarning.style.display = "block";
    introText.style.display = "none";
    return;
  }

  function updateVolumeStyle(v) {
    const pct = v * 100;
    const col = v < 0.34 ? "#f00" : v < 0.67 ? "#ff0" : "#0f0";
    if (volumeControl) {
      volumeControl.style.background = `linear-gradient(90deg, ${col} ${pct}%, #111 ${pct}%)`;
    }
  }

  if (audio && volumeControl) {
    audio.volume = +volumeControl.value;
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
      const v = +volumeControl.value;
      audio.volume = v;
      updateVolumeStyle(v);
    });
  }

  function loadLevel(htmlURL, jsURL, cssURL) {
    fetch(htmlURL)
      .then(r => { if (!r.ok) throw new Error("Nivel no cargado"); return r.text(); })
      .then(html => {
        introText.classList.add("hidden");
        levelContainer.innerHTML = html;
        levelContainer.style.display = "flex";
        levelContainer.className = "";
        levelContainer.classList.add("level1");

        if (cssURL && !document.getElementById("lvlCSS")) {
          const lnk = document.createElement("link");
          lnk.rel = "stylesheet";
          lnk.href = cssURL;
          lnk.id = "lvlCSS";
          document.head.appendChild(lnk);
        }

        if (jsURL) {
          const old = document.getElementById("lvlScript");
          if (old) old.remove();

          const s = document.createElement("script");
          s.src = jsURL;
          s.id = "lvlScript";
          document.body.appendChild(s);
        }
      })
      .catch(e => {
        alert(e.message);
        introText.classList.remove("hidden");
        levelContainer.innerHTML = "";
        levelContainer.style.display = "none";
      });
  }

  document.getElementById("playBtn")?.addEventListener("click", () => {
    loadLevel("level1-content.html", "level1.js", "level1.css");
  });

  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('selectstart', e => e.preventDefault());
  document.addEventListener('dragstart', e => e.preventDefault());
});
