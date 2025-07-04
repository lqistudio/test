const loginBtn = document.getElementById("loginBtn");
const username = document.getElementById("username");
const password = document.getElementById("password");
const message = document.getElementById("message");

const errorSound = new Audio("Mechstorm.mp3"); // nombre correcto
errorSound.volume = 0.7; // ajusta el volumen como prefieras

loginBtn.addEventListener("mouseover", () => {
  if (password.value === "" || password.value !== "1234") {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    loginBtn.style.transform = `translate(${x}px, ${y}px)`;
    errorSound.play();
  }
});

loginBtn.addEventListener("click", () => {
  if (password.value === "1234") {
    message.textContent = "¡Bienvenido, hacker!";
    loginBtn.style.transform = "translate(0,0)";
  } else {
    message.textContent = "Contraseña incorrecta. 🤖";
    errorSound.play();
  }
});
