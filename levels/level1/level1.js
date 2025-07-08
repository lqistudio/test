function initLevel1() {
  const form = document.getElementById('loginForm');
  const msg = document.getElementById('levelMessage');
  const exitBtn = document.getElementById('exitBtn');

  const validUser = "admin";
  const validPass = "contraseña123";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === validUser && password === validPass) {
      msg.textContent = "✅ Acceso concedido. ¡Nivel completado!";
      msg.style.color = "#0f0";

      // Guardar progreso del usuario (nivel 2)
      if (typeof window.guardarProgreso === "function") {
        try {
          await window.guardarProgreso(2);
        } catch (err) {
          console.error("❌ Error al guardar progreso:", err);
        }
      }

      // Esperar y cargar pantalla de logro desde game/
      setTimeout(() => {
        fetch("game/game.html")
          .then(r => {
            if (!r.ok) throw new Error("No se pudo cargar game.html");
            return r.text();
          })
          .then(html => {
            const container = document.getElementById("levelContainer");
            container.innerHTML = html;
            container.className = "game";
            container.style.display = "flex";

            // Ocultar menú
            const intro = document.getElementById("introText");
            if (intro) intro.style.display = "none";

            // Cargar CSS si no está presente
            if (!document.getElementById("css-game")) {
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = "game/game.css";
              link.id = "css-game";
              document.head.appendChild(link);
            }

            // Cargar JS (elimina si ya estaba)
            const prevScript = document.getElementById("js-game");
            if (prevScript) prevScript.remove();

            const script = document.createElement("script");
            script.src = "game/game.js";
            script.id = "js-game";
            document.body.appendChild(script);
          })
          .catch(err => {
            console.error("❌ Error al cargar pantalla de logro:", err);
            msg.textContent = "❌ Error al cargar pantalla de logro.";
            msg.style.color = "#f00";
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

      intro.style.display = "flex";
      container.style.display = "none";
      container.innerHTML = "";
      container.className = "";
    });
  }
}

initLevel1(); // Ejecutar al cargar el nivel
