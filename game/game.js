function initGameBridge() {
  const nextLevelBtn = document.getElementById('nextLevelBtn');
  const exitBtn = document.getElementById('exitBtn');

  const params = new URLSearchParams(window.location.search);
  const currentLevel = parseInt(params.get('level')) || 1;

  nextLevelBtn?.addEventListener('click', async () => {
    const nextLevel = currentLevel + 1;

    // Usamos las referencias globales auth y db expuestas en index.html
    if (window.auth?.currentUser && typeof window.db !== "undefined") {
      try {
        const ref = window.db.collection("usuarios").doc(window.auth.currentUser.uid);
        await ref.set({ nivel: nextLevel }, { merge: true });
        console.log(`✅ Nivel ${nextLevel} guardado en Firebase.`);
      } catch (err) {
        console.warn("❌ Error al guardar progreso en Firebase:", err);
      }
    } else {
      console.warn("⚠️ Firebase no está disponible.");
    }

    // Cargar siguiente nivel
    if (typeof window.loadLevel === "function") {
      window.loadLevel(
        nextLevel,
        `levels/level${nextLevel}/level${nextLevel}-content.html`,
        `levels/level${nextLevel}/level${nextLevel}.js`,
        `levels/level${nextLevel}/level${nextLevel}.css`
      );
    } else {
      alert('⚠️ No se pudo cargar el siguiente nivel.');
    }
  });

  exitBtn?.addEventListener('click', () => {
    if (typeof window.exitLevel === "function") {
      window.exitLevel();
    } else {
      console.warn("⚠️ No se encontró exitLevel(), recargando...");
      window.location.reload();
    }
  });
}

// Ejecutar al iniciar
initGameBridge();
