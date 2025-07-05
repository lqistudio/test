function initLevel1() {
  const form = document.getElementById('loginForm');
  const msg = document.getElementById('levelMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Contraseña y usuario correctos
    const validUser = "admin";
    const validPass = "contraseña123";

    if (username === validUser && password === validPass) {
      msg.textContent = "✅ Acceso concedido. ¡Nivel completado!";
      msg.style.color = "#0f0";

      // Aquí puedes hacer avanzar al siguiente nivel si quieres:
      // setTimeout(() => {
      //   loadLevel(2, "levels/level2/level2-content.html", "levels/level2/level2.js", "levels/level2/level2.css");
      // }, 2000);
    } else {
      msg.textContent = "❌ Usuario o contraseña incorrectos.";
      msg.style.color = "#f00";
    }
  });
}
