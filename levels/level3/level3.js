function initLevel3() {
  const form = document.getElementById("level3Form");
  const msg = document.getElementById("level3Message");
  const exitBtn = document.getElementById("exitBtn");

  const claveCorrecta = "alma404"; // misma clave que dimos como pista en el nivel 1

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const clave = document.getElementById("clave").value.trim();

    if (clave === claveCorrecta) {
      msg.textContent = "✅ ¡Nivel 3 superado! Felicidades, desbloqueaste el final.";
      msg.style.color = "#0f0";

      if (typeof window.guardarProgreso === "function") {
        try {
          await window.guardarProgreso(4); // podría haber un nivel 4 o final
        } catch (err) {
          console.error("❌ Error al guardar el progreso:", err);
        }
      }

      // Cargar pantalla final o de victoria
      setTimeout(() => {
        fetch("game/final.html")
          .then(r => r.text())
          .then(html => {
            const container = document.getElementById("levelContainer");
            container.innerHTML = html;
            container.className = "final";
            container.style.display = "flex";

            // Cargar CSS si existe
            if (!document.getElementById("css-final")) {
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = "game/final.css";
              link.id = "css-final";
              document.head.appendChild(link);
            }
          });
      }, 1500);

    } else {
      msg.textContent = "❌ Clave incorrecta.";
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

initLevel3();

