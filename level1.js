function initLevel1() {
  const loginBtn = document.getElementById("loginBtn");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const message = document.getElementById("message");

  let accessGranted = false;

  // Efecto botón que se mueve cuando no se ha ingresado la clave o es incorrecta
  loginBtn.addEventListener("mouseover", () => {
    if (accessGranted) return;

    if (password.value === "" || password.value !== "1234") {
      const maxMove = 120;
      const x = Math.random() * maxMove * 2 - maxMove;
      const y = Math.random() * maxMove * 2 - maxMove;

      loginBtn.style.transition = "transform 0.15s ease";
      loginBtn.style.transform = `translate(${x}px, ${y}px)`;

      message.textContent = "⚠️ Intento no autorizado...";
      message.style.color = "#ff0055";
      message.style.textShadow = "0 0 8px #ff0055";

      message.animate(
        [
          { opacity: 1 },
          { opacity: 0.3 },
          { opacity: 1 }
        ],
        { duration: 300, iterations: 2 }
      );
    }
  });

  // Validar contraseña al hacer click
  loginBtn.addEventListener("click", () => {
    if (password.value === "1234") {
      accessGranted = true;
      message.textContent = `✅ Bienvenido, ${username.value || "hacker"}.`;
      message.style.color = "#00ffcc";
      message.style.textShadow = "0 0 8px #00ffcc";
      loginBtn.style.transform = "translate(0, 0)";
    } else {
      message.textContent = "❌ Contraseña incorrecta.";
      message.style.color = "#ff66c4";
      message.style.textShadow = "0 0 6px #ff66c4";

      loginBtn.style.transition = "transform 0.2s ease";
      loginBtn.style.transform = "translate(0, 0)";
    }
  });

  // Botón salir para volver al menú principal
  const exitBtn = document.getElementById("exitBtn");
  if (exitBtn) {
    exitBtn.addEventListener("click", () => {
      const introText = document.getElementById("introText");
      const levelContainer = document.getElementById("levelContainer");
      if (introText && levelContainer) {
        levelContainer.innerHTML = "";
        levelContainer.style.display = "none";
        levelContainer.classList.remove("level1");
        introText.style.display = "block";
      }
    });
  }
}
