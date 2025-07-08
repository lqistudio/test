async function getUserLevelFromFirebase() {
  if (!window.auth?.currentUser || !window.db) {
    console.warn("⚠️ Firebase no está disponible.");
    return null;
  }

  try {
    const ref = window.db.collection("usuarios").doc(window.auth.currentUser.uid);
    const doc = await ref.get();
    const data = doc.data();

    return data?.nivel ?? 1;
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

  if (typeof window.loadLevel === "function") {
    window.loadLevel(level, content, js, css);
  } else {
    alert('⚠️ No se pudo cargar el nivel.');
  }
}

async function initGameBridge() {
  const nextLevelBtn = document.getElementById('nextLevelBtn');
  const exitBtn = document.getElementById('exitBtn');

  const params = new URLSearchParams(window.location.search);
  const requestedLevel = parseInt(params.get('level')) || 1;

  const userLevel = await getUserLevelFromFirebase();

  if (!validateLevelAccess(requestedLevel, userLevel)) {
    alert("⚠️ No tienes acceso a este nivel todavía.");
    loadLevel(userLevel);
    return;
  }

  updateURLLevel(requestedLevel);
  loadLevel(requestedLevel);

  nextLevelBtn?.addEventListener('click', async () => {
    const nextLevel = requestedLevel + 1;

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

initGameBridge();
