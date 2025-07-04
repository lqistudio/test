const loginBtn = document.getElementById("loginBtn");
const username = document.getElementById("username");
const password = document.getElementById("password");
const message = document.getElementById("message");

let accessGranted = false;

loginBtn.addEventListener("mouseover", () => {
  if (accessGranted) return;

  if (password.value === "" || password.value !== "1234") {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    loginBtn.style.transition = "transform 0.2s ease";
    loginBtn.style.transform = `translate(${x}px, ${y}px)`;

    // Glitch visual al fallar
    message.innerHTML = "⚠️ Intento no autorizado...";
    message.style.color = "#ff0055";
    message.style.textShadow = "0 0 6px #ff0055";
  }
});

loginBtn.addEventListener("click", () => {
  if (password.value === "1234") {
    accessGranted = true;
    message.textContent = `✅ Bienvenido, ${username.value || "hacker"}.`;
    message.style.color = "#00ffcc";
    message.style.textShadow = "0 0 6px #00ffcc";
    loginBtn.style.transform = "translate(0, 0)";
  } else {
    message.textContent = "❌ Contraseña incorrecta.";
    message.style.color = "#ff66c4";
  }
});
