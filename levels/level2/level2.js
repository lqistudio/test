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

      // 🔐 Guardar progreso del usuario (nivel 3)
      if (typeof window.guardarProgreso === "function") {
        try {
          await window.guardarProgreso(3);
          console.log("✅ Progreso guardado: Nivel 3");
        } catch (err) {
          console.error("❌ Error al guardar progreso:", err);
        }
      }

      // Ir a la pantalla de logro (game.html)
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

            // Ocultar menú si es necesario
            const intro = document.getElementById("introText");
            if (intro) intro.style.display = "none";

            // Cargar CSS
            if (!document.getElementById("css-game")) {
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = "game/game.css";
              link.id = "css-game";
              document.head.appendChild(link);
            }

            // Cargar JS
            const prevScript = document.getElementById("js-game");
            if (prevScript) prevScript.remove();

            const script = document.createElement("script");
            script.src = "game/game.js";
            script.id = "js-game";
            document.body.appendChild(script);
          })
          .catch(err => {
            console.error("❌ Error al cargar game.html:", err);
            msg.textContent = "❌ No se pudo cargar el siguiente nivel.";
            msg.style.color = "#f00";
          });
      }, 1500);

    } else {
      msg.textContent = "❌ Datos incorrectos.";
      msg.style.color = "#f00";
    }
  });

  // Botón salir
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
