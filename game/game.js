async function initGameBridge() {
  const nextLevelBtn = document.getElementById('nextLevelBtn');
  const exitBtn = document.getElementById('exitBtn');

  // Extraemos el nivel solicitado inicialmente
  const params = new URLSearchParams(window.location.search);
  let requestedLevel = parseInt(params.get('level')) || 1;

  const userLevel = await getUserLevelFromFirebase();

  if (!validateLevelAccess(requestedLevel, userLevel)) {
    showNotification("⛔ Nivel bloqueado. No tienes acceso aún.");
    loadLevel(userLevel);
    requestedLevel = userLevel; // Actualizar para que continúe en nivel permitido
    updateURLLevel(requestedLevel);
    return;
  }

  updateURLLevel(requestedLevel);
  loadLevel(requestedLevel);

  nextLevelBtn?.addEventListener('click', async () => {
    // Aquí actualizamos el nivel actual dinámicamente en vez de usar la variable fija
    // Tomamos el nivel del URL para tenerlo siempre actualizado
    const params = new URLSearchParams(window.location.search);
    let currentLevel = parseInt(params.get('level')) || requestedLevel;

    const nextLevel = currentLevel + 1;

    // Verificar si existe el siguiente nivel
    const contentURL = `levels/level${nextLevel}/level${nextLevel}-content.html`;
    const exists = await fetch(contentURL, { method: 'HEAD' })
      .then(res => res.ok)
      .catch(() => false);

    if (!exists) {
      showNotification("🚧 No se encontró el siguiente nivel.");
      return;
    }

    // Guardar progreso en Firebase
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
