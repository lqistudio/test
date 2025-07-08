function initLevel2() {
  const form = document.getElementById("level2Form");
  const msg = document.getElementById("level2Message");
  const exitBtn = document.getElementById("exitBtn");

  const validUser = "admin";
  const validPass = "alm4sombr4";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === validUser && password === validPass) {
      msg.textContent = "✅ ¡Nivel 2 completado!";
      msg.style.color = "#0f0";

      // ✅ Guardar progreso al nivel 3
      if (typeof window.guardarProgreso === "function") {
        try {
          await window.guardarProgreso(3);
          console.log("Nivel 3 guardado correctamente.");
        } catch (err) {
          console.warn("Error al guardar progreso del Nivel 3:", err);
        }
      }

      // Cargar la pantalla de transición
      setTimeout(() => {
        fetch("game/game.html")
          .then(r => r.text())
          .then(html => {
            const container = document.getElementById("levelContainer");
            container.innerHTML = html;
            container.className = "game";

            if (!document.getElementById("css-game")) {
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = "game/game.css";
              link.id = "css-game";
              document.head.appendChild(link);
            }

            const prevScript = document.getElementById("js-game");
            if (prevScript) prevScript.remove();

            const script = document.createElement("script");
            script.src = "game/game.js";
            script.id = "js-game";
            document.body.appendChild(script);
          });
      }, 1500);
    } else {
      msg.textContent = "❌ Datos incorrectos.";
      msg.style.color = "#f00";
    }
  });

  // Salir
  if (exitBtn) {
    exitBtn.addEventListener("click", () => {
      if (typeof window.exitLevel === "function") {
        window.exitLevel();
      } else {
        window.location.reload();
      }
    });
  }
}

initLevel2();
