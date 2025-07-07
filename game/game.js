document.addEventListener('DOMContentLoaded', () => {
  const nextLevelBtn = document.getElementById('nextLevelBtn');
  const exitBtn = document.getElementById('exitBtn'); // ← usa el mismo ID que en game.html

  // Obtener el número del nivel actual desde la URL (por si usas ?level=2)
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
      alert('⚠️ No se pudo cargar el siguiente nivel.');
    }
  });

  // Botón SALIR AL MENÚ (misma lógica del nivel)
  exitBtn?.addEventListener('click', () => {
    const intro = document.getElementById("introText");
    const container = document.getElementById("levelContainer");

    if (intro && container) {
      intro.style.display = "flex"; // se mantiene centrado
      container.innerHTML = "";
      container.className = "";
      container.style.display = "none";
    } else {
      window.location.reload();
    }
  });
});
