function initLevel1() {
  const input = document.getElementById('passwordInput');
  const feedback = document.getElementById('feedback');

  window.checkPassword = function () {
    const correct = "hackme"; // cambia esta clave si quieres
    if (input.value.toLowerCase().trim() === correct) {
      feedback.textContent = "✅ ¡Acceso concedido!";
      feedback.style.color = "#0f0";
      setTimeout(() => {
        alert("Nivel completado. (Aquí puedes cargar el siguiente nivel)");
        // Ejemplo: loadLevel(2);
      }, 1000);
    } else {
      feedback.textContent = "❌ Contraseña incorrecta.";
      feedback.style.color = "#f55";
    }
  };
}

