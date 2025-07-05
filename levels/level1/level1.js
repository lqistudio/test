function initLevel1() {
  const form = document.getElementById('loginForm');
  const msg = document.getElementById('levelMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const validUser = "admin";
    const validPass = "contraseña123";

    // Si el usuario y contraseña son correctos
    if (username === validUser && password === validPass) {
      msg.textContent = "✅ Acceso concedido. ¡Nivel completado!";
      msg.style.color = "#0f0";

      // Puedes pasar al siguiente nivel si quieres
      // setTimeout(() => {
      //   loadLevel(2, "levels/level2/level2-content.html", "levels/level2/level2.js", "levels/level2/level2.css");
      // }, 2000);

    } else if (username !== validUser) {
      // Si el usuario es incorrecto, mostramos pista falsa o verdadera
      msg.textContent = "⚠️ La contraseña del Nivel 3 es: alma404";
      msg.style.color = "#ff0";
    } else {
      // Si el usuario es correcto pero la contraseña no
      msg.textContent = "❌ Contraseña incorrecta.";
      msg.style.color = "#f00";
    }
  });
}
