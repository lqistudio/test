document.addEventListener('DOMContentLoaded', () => {
  const nextLevelBtn = document.getElementById('nextLevelBtn');
  const exitBtn = document.getElementById('exitBtn'); // ← corregido: este es el ID que usas en game.html

  // Obtener el número del nivel actual desde URL (query param ?level=1)
  const params = new URLSearchParams(window.location.search);
  const currentLevel = parseInt(params.get('level')) || 1;

  // Botón SIGUIENTE NIVEL
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
      alert('⚠️ No se pudo cargar el siguiente nivel. Función global no encontrada.');
    }
  });

  // Botón SALIR AL MENÚ
  exitBtn?.addEventListener('click', () => {
    if (window.showIntro) {
      window.showIntro();
    } else {
      console.warn('⚠️ No se encontró la función showIntro. Recargando...');
      window.location.reload();
    }
  });
});
