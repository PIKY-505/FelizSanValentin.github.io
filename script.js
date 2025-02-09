function closeIntro() {
  document.querySelector(".intro-overlay").style.display = "none";
  document.querySelector(".video-container").style.display = "block"; // Muestra el video
}

let coinCount = 0;
let gameActive = false;

function addCoin(coin) {
  coinCount++;
  document.getElementById("coinCount").textContent = coinCount;
  coin.style.display = "none";
  setTimeout(() => respawnCoin(coin), 5000);
}

function respawnCoin(coin) {
  if (!gameActive) return;
  const maxX = window.innerWidth - 100;
  const maxY = window.innerHeight - 100;
  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;
  coin.style.left = `${newX}px`;
  coin.style.top = `${newY}px`;
  coin.style.display = "block";
}

function toggleGame() {
  gameActive = !gameActive;
  document.querySelectorAll(".coin").forEach((coin) => {
    if (gameActive) {
      coin.style.display = "block";
      respawnCoin(coin); // Asegura que las monedas aparezcan en una posición aleatoria al activar el juego.
    } else {
      coin.style.display = "none";
    }
  });
  document.querySelector(".coin-counter").style.display = gameActive
    ? "block"
    : "none";
}

function toggleShop() {
  document.querySelector(".cursor-shop").classList.toggle("active");
}

let purchasedCursors = {}; // Guarda los cursores comprados
let currentCursor = ""; // Guarda el cursor actual

function buyCursor(cursor, element) {
  if (!purchasedCursors[cursor]) {
    if (coinCount >= 5) {
      coinCount -= 5;
      document.getElementById("coinCount").textContent = coinCount;
      purchasedCursors[cursor] = true; // Marcar cursor como comprado
      element.style.opacity = "0.5"; // Indicar que fue comprado
    } else {
      alert("No tienes suficientes monedas!");
      return;
    }
  }

  // Aplicar el cursor seleccionado en toda la página
  currentCursor = cursor;
  document.body.style.cursor = `url(${cursor}) 32 32, auto`; // Tamaño ajustado
}
