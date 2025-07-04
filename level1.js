document.addEventListener('DOMContentLoaded', () => {
  // Elementos comunes
  const audio = document.getElementById("bgMusic");
  const playAudio = document.getElementById("playAudio");
  const volumeControl = document.getElementById("volumeControl");
  const mobileWarning = document.getElementById("mobileWarning");
  const introText = document.getElementById("introText");
  const levelContainer = document.getElementById("levelContainer");

  // Sonido de error para login (asegúrate que exista este archivo)
  const errorSound = new Audio("assets/sfx/error.mp3");

  // Detectar si es celular
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    if (mobileWarning) mobileWarning.style.display = "block";
    if (introText) introText.style.display = "none";
    return;
  }

  // Función para actualizar el estilo dinámico del volumen
  function updateVolumeStyle(value) {
    const percent = value * 100;
    const color1 = value < 0.34 ? "#f00" : value < 0.67 ? "#ff0" : "#0f0";
    if(volumeControl) {
      volumeControl.style.background = `linear-gradient(90deg, ${color1} ${percent}%, #111 ${percent}%)`;
    }
  }

  // Configurar audio y volumen
  if (audio && volumeControl) {
    audio.volume = parseFloat(volumeControl.value);
    updateVolumeStyle(audio.volume);
  }

  // Botón de reproducir/pausar música
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

  // Control dinámico del volumen
  if (volumeControl && audio) {
    volumeControl.addEventListener("input", () => {
      const val = parseFloat(volumeControl.value);
      audio.volume = val;
      updateVolumeStyle(val);
    });
  }

  // Función para cargar un nivel dentro del div levelContainer, con script externo
  function loadLevel(htmlUrl, scriptUrl) {
    fetch(htmlUrl)
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar nivel");
        return response.text();
      })
      .then(html => {
        introText.style.display = "none";
        levelContainer.style.display = "block";
        levelContainer.classList.add("level1"); // Aplica la clase level1 para CSS
        levelContainer.innerHTML = html;

        // Cargar el script externo del nivel
        if (scriptUrl) {
          // Eliminar script previo si existe
          const prevScript = document.getElementById('levelScript');
          if (prevScript) prevScript.remove();

          const script = document.createElement('script');
          script.src = scriptUrl;
          script.id = 'levelScript';
          script.onload = () => {
            // Ejecutar la función que inicializa el nivel 1
            if (typeof initLevel1 === "function") {
              initLevel1();
            }
          };
          document.body.appendChild(script);
        } else {
          // Si no hay script externo, igual intentamos llamar la función
          if (typeof initLevel1 === "function") {
            initLevel1();
          }
        }
      })
      .catch(err => {
        alert(err.message);
        introText.style.display = "block";
        levelContainer.style.display = "none";
        levelContainer.innerHTML = "";
        levelContainer.classList.remove("level1");
      });
  }

  // Botón play que carga el nivel 1 dinámicamente (contenido y script)
  const playBtn = document.getElementById("playBtn");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      loadLevel("level1-content.html", "level1.js");
    });
  }

  // Protecciones para evitar copiar, menú derecho, selección y arrastrar
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('selectstart', e => e.preventDefault());
  document.addEventListener('dragstart', e => e.preventDefault());
});
