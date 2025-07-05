function initLevel1() {
  const form = document.getElementById('loginForm');
  const msg = document.getElementById('levelMessage');
  const exitBtn = document.getElementById('exitBtn');

  const validUser = "admin";
  const validPass = "contraseña123";

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === validUser && password === validPass) {
      msg.textContent = "✅ Acceso concedido. ¡Nivel completado!";
      msg.style.color = "#0f0";

      // Esperamos un poco y luego pasamos a la pantalla de logro (game.html)
      setTimeout(() => {
        if (typeof loadLevel === "function") {
          loadLevel(
            0,
            "game/game.html",
            "game/game.js",
            "game/game.css"
          );
        } else {
          console.error("No se puede cargar game.html: función loadLevel no disponible.");
        }
      }, 1500);
    } else if (username !== validUser) {
      msg.textContent = "⚠️ La contraseña del Nivel 3 es: alma404";
      msg.style.color = "#ff0";
    } else {
      msg.textContent = "❌ Contraseña incorrecta.";
      msg.style.color = "#f00";
    }
  });

  // Botón salir (funciona siempre)
  if (exitBtn) {
    exitBtn.addEventListener("click", () => {
      if (typeof showIntro === "function") {
        showIntro();
      } else {
        window.location.reload(); // fallback si showIntro no está disponible
      }
    });
  }
}
