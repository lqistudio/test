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

function showNotification(message, duration = 3000) {
  const box = document.getElementById('notification');
  if (!box) return;
  box.textContent = message;
  box.style.display = 'block';

  setTimeout(() => {
    box.style.display = 'none';
  }, duration);
}

async function levelExists(level) {
  const url = `levels/level${level}/level${level}-content.html`;
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}

function loadLevel(level) {
  const content = `levels/level${level}/level${level}-content.html`;
  const js = `levels/level${level}/level${level}.js`;
  const css = `levels/level${level}/level${level}.css`;

  fetch(content)
    .then(r => {
      if (!r.ok) throw new Error("Nivel no encontrado");
      return r.text();
    })
    .then(html => {
      const container = document.getElementById("levelContainer");
      container.innerHTML = html;
      container.className = `level${level}`;

      if (!document.getElementById(`css-level${level}`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = css;
        link.id = `css-level${level}`;
        document.head.appendChild(link);
      }

      const prevScript = document.getElementById("js-level");
      if (prevScript) prevScript.remove();

      const script = document.createElement("script");
      script.src = js;
      script.id = "js-level";
      script.onload = () => {
        initGameBridge(level);
      };
      document.body.appendChild(script);
    })
    .catch(() => {
      showNotification("🚧 No se pudo cargar el nivel.");
    });
}

async function initGameBridge(currentLevel) {
  const nextLevelBtn = document.getElementById('nextLevelBtn');
  const exitBtn = document.getElementById('exitBtn');

  nextLevelBtn?.addEventListener('click', async () => {
    const nextLevel = currentLevel + 1;

    const exists = await levelExists(nextLevel);
    if (!exists) {
      showNotification("🚧 No se encontró el siguiente nivel.");
      return;
    }

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
  const requestedLevel = parseInt(params.get('level')) || 1;

  const userLevel = await getUserLevelFromFirebase();

  if (!(await levelExists(requestedLevel))) {
    showNotification("🚧 El nivel solicitado no existe.");
    return;
  }

  if (!validateLevelAccess(requestedLevel, userLevel)) {
    showNotification("⛔ Nivel bloqueado. No tienes acceso aún.");
    return;
  }

  updateURLLevel(requestedLevel);
  loadLevel(requestedLevel);
}

// 🚀 Iniciar
startGameLoader();
