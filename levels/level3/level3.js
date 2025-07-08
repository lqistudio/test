function initLevel3() {
  const form = document.getElementById("level3Form");
  const msg = document.getElementById("level3Message");
  const exitBtn = document.getElementById("exitBtn");

  const paisCorrecto = "reino_de_loquilandia";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const selected = document.getElementById("countrySelect").value;

    if (selected === paisCorrecto) {
      msg.textContent = "✅ ¡Bienvenido, ciudadano honorable de Loquilandia!";
      msg.style.color = "#0f0";

      if (typeof window.guardarProgreso === "function") {
        try {
          await window.guardarProgreso(4);
        } catch (err) {
          console.warn("Error al guardar progreso del Nivel 4:", err);
        }
      }

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
      msg.textContent = "❌ Ese lugar no existe… o al menos no en tu mente.";
      msg.style.color = "#f00";
    }
  });

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

initLevel3();
