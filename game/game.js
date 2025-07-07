function initGameBridge() {
  const nextLevelBtn = document.getElementById('nextLevelBtn');
  const exitBtn = document.getElementById('exitBtn');

  const params = new URLSearchParams(window.location.search);
  const currentLevel = parseInt(params.get('level')) || 1;

  nextLevelBtn?.addEventListener('click', () => {
    const nextLevel = currentLevel + 1;
    if (window.loadLevel) {
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

// Ejecutar directamente porque ya estás en el DOM
initGameBridge();
