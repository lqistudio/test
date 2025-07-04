
// Simula pantalla de carga e intro
window.onload = () => {
  const loading = document.getElementById("loading");
  const intro = document.getElementById("introText");
  setTimeout(() => {
    loading.style.display = "none";
    intro.classList.remove("hidden");
  }, 2500);

  const playBtn = document.getElementById("playBtn");
  if (playBtn) {
    playBtn.onclick = () => {
      window.location.href = "level1.html";
    };
  }
};
