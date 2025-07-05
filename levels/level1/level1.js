function initLevel1() {
  const form = document.getElementById('loginForm');
  const msg = document.getElementById('levelMessage');
  const exitBtn = document.getElementById('exitBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const validUser = "admin";
    const validPass = "contraseña123";

    if (username === validUser && password === validPass) {
      // Redirigir a game.html y pasar nivel actual por query param
      window.location.href = "game.html?level=1";

    } else if (username !== validUser) {
      msg.textContent = "⚠️ La contraseña del Nivel 3 es: alma404";
      msg.style.color = "#ff0";
    } else {
      msg.textContent = "❌ Contraseña incorrecta.";
      msg.style.color = "#f00";
    }
  });

  exitBtn?.addEventListener('click', () => {
    const levelContainer = document.getElementById('levelContainer');
    const introText = document.getElementById('introText');
    
    levelContainer.innerHTML = "";
    levelContainer.style.display = "none";
    introText.style.display = "block";

    msg.textContent = "";
    form.reset();

    const levelScript = document.getElementById('js-level');
    levelScript?.remove();

    const cssLevel = document.getElementById('css-level1');
    cssLevel?.remove();
  });
}
