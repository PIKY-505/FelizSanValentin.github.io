function closeIntro() {
  document.querySelector(".intro-overlay").style.display = "none";
  document.querySelector(".video-container").style.display = "block";
  document.querySelector(".audio-player").style.position = "absolute";
  document.querySelector(".clikcbait").style.display = "block";
}
let coinCount = 0;
let gameActive = false;

let coinSound = new Audio("dase.mp3");
coinSound.volume = 1; // Asegurar volumen máximo

function addShinyCoin(coin) {
  coinCount += 4;
  document.getElementById("coinCount").textContent = coinCount;

  // Intentar reproducir el sonido y capturar errores
  coinSound
    .play()
    .catch((error) => console.log("Error reproduciendo sonido:", error));

  coin.style.display = "none";
  setTimeout(spawnShinyCoin, 15000);
}

function spawnShinyCoin() {
  if (!gameActive) return;
  const shinyCoin = document.getElementById("shinyCoin");
  if (!shinyCoin) return;

  const maxX = window.innerWidth - 100;
  const maxY = window.innerHeight - 100;
  shinyCoin.style.left = `${Math.random() * maxX}px`;
  shinyCoin.style.top = `${Math.random() * maxY}px`;
  shinyCoin.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  const shinyCoin = document.getElementById("shinyCoin");
  if (shinyCoin) {
    shinyCoin.addEventListener("click", function () {
      addShinyCoin(this);
    });
  } else {
    console.error("El elemento shinyCoin no existe en el DOM.");
  }

  setTimeout(spawnShinyCoin, 15000);
});

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



document.addEventListener("DOMContentLoaded", function () {
  const coins = document.querySelectorAll(".coin");
  const speed = 3; // Velocidad base

  coins.forEach((coin) => {
    // Posición y velocidad inicial aleatoria
    let x = Math.random() * (window.innerWidth - 50);
    let y = Math.random() * (window.innerHeight - 50);
    let dx = (Math.random() - 0.5) * speed * 1.5;
    let dy = (Math.random() - 0.5) * speed * 1.5;

    function moveCoin() {
      x += dx;
      y += dy;

      // Rebotar en los bordes
      if (x <= 0 || x >= window.innerWidth - 50) dx *= -1;
      if (y <= 0 || y >= window.innerHeight - 50) dy *= -1;

      coin.style.left = `${x}px`;
      coin.style.top = `${y}px`;

      requestAnimationFrame(moveCoin);
    }

    moveCoin(); // Iniciar animación
  });
});

function toggleGame() {
  gameActive = !gameActive;
  document.querySelectorAll(".coin").forEach((coin) => {
    if (gameActive) {
      coin.style.display = "block";
      respawnCoin(coin);
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

function toggleTrailShop() {
  let shop = document.querySelector(".trail-shop");
  shop.classList.toggle("active");
}

let purchasedCursors = {};
let currentCursor = "";

function buyCursor(cursor, element) {
  if (!purchasedCursors[cursor]) {
    if (coinCount >= 5) {
      coinCount -= 5;
      document.getElementById("coinCount").textContent = coinCount;
      purchasedCursors[cursor] = true;
      element.style.opacity = "0.5";
    } else {
      alert("No tienes suficientes monedas!");
      return;
    }
  }
  currentCursor = cursor;
  document.body.style.cursor = `url(${cursor}) 32 32, auto`;
}

const songs = [
  
  {
    title: "From The Start (Sped Up) - Laufey",
    src: "From The Start (Sped Up) - Laufey.mp3",
  },
  {
    title: "una manera perfecta de morir - INTERROGACIÓN AMOR",
    src: "una manera perfecta de morir - INTERROGACIÓN AMOR.mp3",
  },
  { title: "La cena - Las Petunias", src: "La cena - Las Petunias.mp3" },
  { title: "You and I - d4vd ", src: "You and I - d4vd .mp3" },
  { title: "Tek It - Cafuné", src: "Tek It - Cafuné.mp3" },
  {
    title: "I Really Want to Stay At Your House - Rosa Walton",
    src: "I Really Want to Stay At Your House - Rosa Walton.mp3",
  },
  { title: "gourmet - rickyedit", src: "gourmet - rickyedit.mp3" },
  {
    title: "For You I'll Die - JAY SAV",
    src: "For You I'll Die - JAY SAV.mp3",
  },
  {
    title: "Let You Down - Dawid Podsiadło",
    src: "Let You Down - Dawid Podsiadło.mp3",
  },
  
];

let ownedTrails = [];
let activeTrail = null;
let trailElement = null;

function buyTrail(trailSrc, element) {
  if (ownedTrails.includes(trailSrc)) {
    setTrail(trailSrc);
    return;
  }

  if (coinCount >= 10) {
    coinCount -= 10;
    document.getElementById("coinCount").textContent = coinCount;
    ownedTrails.push(trailSrc);
    setTrail(trailSrc);
    element.style.opacity = "0.5";
  } else {
    alert("No tienes suficientes monedas.");
  }
}

function setTrail(trailSrc) {
  activeTrail = trailSrc;

  if (trailElement) {
    trailElement.remove();
  }

  trailElement = document.createElement("img");
  trailElement.src = activeTrail;
  trailElement.classList.add("trail");
  trailElement.style.position = "absolute";
  trailElement.style.width = "50px";
  trailElement.style.pointerEvents = "none";
  document.body.appendChild(trailElement);
}

let mouseX = 0,
  mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

function updateTrail() {
  if (trailElement) {
    let dx = mouseX - trailElement.offsetLeft;
    let dy = mouseY - trailElement.offsetTop;
    trailElement.style.left = `${trailElement.offsetLeft + dx * 0.01}px`;
    trailElement.style.top = `${trailElement.offsetTop + dy * 0.01}px`;
  }
  requestAnimationFrame(updateTrail);
}

updateTrail();

let currentSongIndex = 1;
const audioPlayer = document.getElementById("audio-player");
const songTitle = document.getElementById("song-title");

function loadSong(index) {
  audioPlayer.src = songs[index].src;
  songTitle.textContent = songs[index].title;
  audioPlayer.play();
}

function togglePlay() {
  if (audioPlayer.paused) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
}

function loadSong(index) {
  const audioPlayer = document.getElementById("audio-player");
  const songTitle = document.getElementById("song-title");

  audioPlayer.src = songs[index].src; // Establece la fuente de la canción
  songTitle.textContent = songs[index].title;

  audioPlayer.load(); // Cargar la nueva canción
  audioPlayer
    .play()
    .catch((error) => console.log("Error reproduciendo:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audio-player");

  audioPlayer.addEventListener("ended", function () {
    nextSong(); // Llama a nextSong() cuando la canción termine
  });

  audioPlayer.volume = 0.5;
  loadSong(currentSongIndex); // Cargar la primera canción al inicio
});

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
}

function changeVolume(volume) {
  const audioPlayer = document.getElementById("audio-player");
  audioPlayer.volume = volume;
}

document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audio-player");
  audioPlayer.volume = 0.5;
});
