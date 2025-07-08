async function getUserLevelFromFirebase() {
  if (!window.auth?.currentUser || !window.db) {
    console.warn("⚠️ Firebase no está disponible.");
    return null;
  }

  try {
    const ref = window.db.collection("usuarios").doc(window.auth.currentUser.uid);
    const doc = await ref.get();
    return doc.data()?.nivel ?? 1;
  } catch (err) {
    console.warn("❌ Error al obtener nivel desde Firebase:", err);
    return 1;
  }
}

function updateURLLevel(level) {
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set("level", level);
  window.history.replaceState({}, '', newUrl);
}

function validateLevelAccess(requestedLevel, userLevel) {
  return requestedLevel <= userLevel;
}

function loadLevel(level) {
  const content = `levels/level${level}/level${level}-content.html`;
  const js = `levels/level${level}/level${level}.js`;
  const css = `levels/level${level}/level${level}.css`;

  fetch(content)
    .then(r => r.text())
    .then(html => {
      const container = document.getElementById("levelContainer");
      container.innerHTML = html;
      container.className = `level${level}`;

      // Cargar CSS si no está ya cargado
      if (!document.getElementById(`css-level${level}`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = css;
        link.id = `css-level${level}`;
        document.head.appendChild(link);
      }

      // Quitar JS anterior si hay
      const prevScript = document.getElementById("js-level");
      if (prevScript) prevScript.remove();

      // Cargar JS nuevo
      const script = document.createElement("script");
      script.src = js;
      script.id = "js-level";
      script.onload = () => {
        // ✅ Inicializar botones del game después que todo cargue
        initGameBridge(level);
      };
      document.body.appendChild(script);
    })
    .catch(() => {
      alert("⚠️ No se pudo cargar el nivel.");
    });
}

function showNotification(message, duration = 3000) {
  const box = document.getElementById('notification');
  if (!box) return;
  box.textContent = message;
  box.style.display = 'block';

  setTimeout(() => {
    box.style.display = 'none';
  }, duration);
}

async function initGameBridge(currentLevel) {
  const nextLevelBtn = document.getElementById('nextLevelBtn');
  const exitBtn = document.getElementById('exitBtn');

  // 🔘 Botón siguiente nivel
  nextLevelBtn?.addEventListener('click', async () => {
    const nextLevel = currentLevel + 1;

    // Verificar si el nivel existe
    const exists = await fetch(`levels/level${nextLevel}/level${nextLevel}-content.html`, { method: 'HEAD' })
      .then(res => res.ok)
      .catch(() => false);

    if (!exists) {
      showNotification("🚧 No se encontró el siguiente nivel.");
      return;
    }

    // Guardar en Firebase
    if (window.auth?.currentUser && window.db) {
      try {
        const ref = window.db.collection("usuarios").doc(window.auth.currentUser.uid);
        await ref.set({ nivel: nextLevel }, { merge: true });
        console.log(`✅ Nivel ${nextLevel} guardado en Firebase.`);
      } catch (err) {
        console.warn("❌ Error al guardar progreso en Firebase:", err);
      }
    }

    updateURLLevel(nextLevel);
    loadLevel(nextLevel);
  });

  // 🔙 Botón salir
  exitBtn?.addEventListener('click', () => {
    if (typeof window.exitLevel === "function") {
      window.exitLevel();
    } else {
      window.location.reload();
    }
  });
}

async function startGameLoader() {
  const params = new URLSearchParams(window.location.search);
  let requestedLevel = parseInt(params.get('level')) || 1;

  const userLevel = await getUserLevelFromFirebase();

  if (!validateLevelAccess(requestedLevel, userLevel)) {
    showNotification("⛔ Nivel bloqueado. No tienes acceso aún.");
    requestedLevel = userLevel;
  }

  updateURLLevel(requestedLevel);
  loadLevel(requestedLevel);
}

// 🚀 Inicia todo al cargar el archivo
startGameLoader();
