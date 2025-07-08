document.addEventListener('DOMContentLoaded', () => {
  // Elementos principales
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
    mobileWarning?.style?.display = "block";
    introText?.style?.display = "none";
    return;
  }

  // Estilo dinámico del volumen
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

  // Botón música
  playAudio?.addEventListener("click", () => {
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

  // Mostrar menú principal
  function showIntro() {
    introText.style.display = "flex";
    levelContainer.style.display = "none";
    levelContainer.innerHTML = "";
    levelContainer.className = "";
  }

  function exitLevel() {
    showIntro();
  }

  // Cargar niveles dinámicamente
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

        // Cargar CSS (si no está ya)
        if (!document.getElementById(`css-level${n}`)) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = cssfile;
          link.id = `css-level${n}`;
          document.head.appendChild(link);
        }

        // Reemplazar JS anterior
        const prevScript = document.getElementById("js-level");
        if (prevScript) prevScript.remove();

        const script = document.createElement("script");
        script.id = "js-level";
        script.src = jsfile;
        script.defer = true;
        document.body.appendChild(script);

        // NO guardamos progreso aquí directamente
      })
      .catch(err => {
        alert(err.message);
        showIntro();
      });
  }

  // Exponer funciones globales
  window.loadLevel = loadLevel;
  window.showIntro = showIntro;
  window.exitLevel = exitLevel;

  // Botón PLAY
  const playBtn = document.getElementById("playBtn");
  playBtn?.addEventListener("click", () => {
    loadLevel(
      1,
      "levels/level1/level1-content.html",
      "levels/level1/level1.js",
      "levels/level1/level1.css"
    );
  });

  // Botón INSTRUCCIONES
  const instructionsBtn = document.getElementById("instructionsBtn");
  instructionsBtn?.addEventListener("click", () => {
    window.open("instruciones/instrucciones.html", "_blank");
  });

  // Firebase → Mostrar CONTINUAR si el usuario tiene progreso
  if (typeof firebase !== "undefined" && firebase.auth && firebase.firestore) {
    const auth = firebase.auth();
    const db = firebase.firestore();

    auth.onAuthStateChanged(async user => {
      if (user) {
        try {
          const ref = db.collection("usuarios").doc(user.uid);
          const doc = await ref.get();
          if (doc.exists && doc.data().nivel > 1) {
            // Evitar duplicado
            if (!document.getElementById("continueBtn")) {
              const continuarBtn = document.createElement("button");
              continuarBtn.textContent = "⏭️ CONTINUAR";
              continuarBtn.id = "continueBtn";
              continuarBtn.onclick = () => {
                const n = doc.data().nivel;
                loadLevel(
                  n,
                  `levels/level${n}/level${n}-content.html`,
                  `levels/level${n}/level${n}.js`,
                  `levels/level${n}/level${n}.css`
                );
              };
              document.querySelector(".intro").appendChild(continuarBtn);
            }
          }
        } catch (e) {
          console.error("Error al cargar progreso del usuario:", e);
        }
      }
    });
  }

  // Proteger interfaz: evitar clic derecho, selección, arrastre
  ["contextmenu", "selectstart", "dragstart"].forEach(eventType =>
    document.addEventListener(eventType, ev => ev.preventDefault())
  );
});
