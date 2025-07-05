function initLevel1() {
  console.log("Nivel 1 cargado");
}

function checkPassword() {
  const input = document.getElementById("passwordInput").value.trim().toLowerCase();
  const feedback = document.getElementById("feedback");
  if (input === "acceso") {
    feedback.textContent = "✅ ¡Correcto!";
    feedback.style.color = "lime";
  } else {
    feedback.textContent = "❌ Contraseña incorrecta.";
    feedback.style.color = "red";
  }
}
