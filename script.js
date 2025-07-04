const loginBtn = document.getElementById("loginBtn");
const username = document.getElementById("username");
const password = document.getElementById("password");
const message = document.getElementById("message");

const audio = new Audio("Mechstorm.mp3");
audio.loop = true;
audio.volume = 0.7;

const playAudio = document.getElementById("playAudio");
const volumeControl = document.getElementById("volumeControl");

playAudio.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playAudio.textContent = "⏸️";
  } else {
    audio.pause();
    playAudio.textContent = "🔊";
  }
});

volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

loginBtn.addEventListener("click", () => {
  if (password.value === "1234") {
    message.textContent = "¡Bienvenido, ##$%324@38!";
    loginBtn.style.transform = "translate(0,0)";
  } else {
    message.textContent = "Contraseña incorrecta. 🤖";
    errorSound.play();
  }
});
