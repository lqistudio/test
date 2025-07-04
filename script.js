window.onload = () => {
  const loading = document.getElementById("loading");
  const intro = document.getElementById("introText");
  const bgMusic = document.getElementById("bgMusic");
  const muteBtn = document.getElementById("muteBtn");
  const volSlider = document.getElementById("volSlider");
  const playBtn = document.getElementById("playBtn");

  // Iniciar en silencio 60%
  volSlider.value = 0.6;
  bgMusic.volume = 0.6;

  setTimeout(() => {
    loading.style.display = "none";
    intro.classList.remove("hidden");
    bgMusic.play().catch(e => console.warn("Auto-play bloqueado", e));
  }, 2500);

  muteBtn.onclick = () => {
    bgMusic.muted = !bgMusic.muted;
    muteBtn.textContent = bgMusic.muted ? "🔇" : "🔊";
  };

  volSlider.oninput = () => {
    bgMusic.volume = volSlider.value;
    bgMusic.muted = false;
    muteBtn.textContent = "🔊";
  };

  playBtn.onclick = () => {
    window.location.href = "level1.html";
  };
};
