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

      // Esperamos y cargamos la pantalla de logro desde game/
      setTimeout(() => {
        fetch("game/game.html")
          .then(r => r.text())
          .then(html => {
            const container = document.getElementById("levelContainer");
            container.innerHTML = html;
            container.className = "game";

            // Cargar CSS de game solo si no está cargado
            if (!document.getElementById("css-game")) {
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = "game/game.css";
              link.id = "css-game";
              document.head.appendChild(link);
            }

            // Cargar JS de game
            const prevScript = document.getElementById("js-game");
            if (prevScript) prevScript.remove();

            const script = document.createElement("script");
            script.src = "game/game.js";
            script.id = "js-game";
            document.body.appendChild(script);
          });
      }, 1500);

    } else if (username !== validUser) {
      msg.textContent = "⚠️ La contraseña del Nivel 3 es: alma404";
      msg.style.color = "#ff0";
    } else {
      msg.textContent = "❌ Contraseña incorrecta.";
      msg.style.color = "#f00";
    }
  });

  // Botón salir
  if (exitBtn) {
    exitBtn.addEventListener("click", () => {
      const intro = document.getElementById("introText");
      const container = document.getElementById("levelContainer");

      intro.style.display = "block";
      container.innerHTML = "";
      container.style.display = "none";
    });
  }
}

initLevel1(); // Ejecutar al cargar el nivel
