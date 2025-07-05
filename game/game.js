
document.addEventListener('DOMContentLoaded', () => {
  const nextLevelBtn = document.getElementById('nextLevelBtn');
  const exitGameBtn = document.getElementById('exitGameBtn');

  // Obtener el número del nivel actual desde URL (query param ?level=1)
  const params = new URLSearchParams(window.location.search);
  const currentLevel = parseInt(params.get('level')) || 1;

  nextLevelBtn?.addEventListener('click', () => {
    const nextLevel = currentLevel + 1;
    // Cargar el siguiente nivel en el contenedor, desde el script general
    // Aquí asumimos que tienes una función global loadLevel definida en script.js
    if (window.loadLevel) {
      window.loadLevel(
        nextLevel,
        `levels/level${nextLevel}/level${nextLevel}-content.html`,
        `levels/level${nextLevel}/level${nextLevel}.js`,
        `levels/level${nextLevel}/level${nextLevel}.css`
      );
    } else {
      alert('Función para cargar niveles no disponible');
    }
  });

  exitGameBtn?.addEventListener('click', () => {
    // Volver al menú inicial
    // Aquí asumimos que tu script general tiene una función para mostrar intro
    if (window.showIntro) {
      window.showIntro();
    } else {
      // Si no, recarga la página para mostrar menú inicial
      window.location.reload();
    }
  });
});
