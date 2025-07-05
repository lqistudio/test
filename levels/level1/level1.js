function initLevel1() {
  const form = document.getElementById('loginForm');
  const msg = document.getElementById('levelMessage');
  const exitBtn = document.getElementById('exitBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const validUser = "admin";
    const validPass = "contraseña123";

    if (username === validUser && password === validPass) {
      msg.textContent = "✅ Acceso concedido. ¡Nivel completado!";
      msg.style.color = "#0f0";

      // Aquí puedes agregar la carga del siguiente nivel si quieres
      // setTimeout(() => {
      //   loadLevel(2, "levels/level2/level2-content.html", "levels/level2/level2.js", "levels/level2/level2.css");
      // }, 2000);

    } else if (username !== validUser) {
      msg.textContent = "⚠️ La contraseña del Nivel 3 es: alma404";
      msg.style.color = "#ff0";
    } else {
      msg.textContent = "❌ Contraseña incorrecta.";
      msg.style.color = "#f00";
    }
  });

  // Botón para salir al menú inicial
  exitBtn?.addEventListener('click', () => {
    const levelContainer = document.getElementById('levelContainer');
    const introText = document.getElementById('introText');
    
    // Limpiar contenido nivel
    levelContainer.innerHTML = "";
    levelContainer.style.display = "none";
    introText.style.display = "block";

    // Limpiar mensajes y formulario
    msg.textContent = "";
    form.reset();

    // Remover script nivel si aplica (opcional)
    const levelScript = document.getElementById('js-level');
    levelScript?.remove();

    // (Opcional) Remover CSS nivel
    const cssLevel = document.getElementById('css-level1');
    cssLevel?.remove();
  });
}
