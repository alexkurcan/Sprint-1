// ======================
// CANVAS SETUP
// ======================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startScreen = document.getElementById("startScreen");
const endScreen = document.getElementById("endScreen");
const endScore = document.getElementById("endScore");

let gameStarted = false;
let paused = false;

// ======================
// BACKGROUND REMOVAL UTILITY
// ======================
/**
 * Loads an image from a URL, removes its background (white/light or solid color),
 * and returns a new Image with a transparent background.
 * @param {string} src - URL of the image
 * @param {object} options - Optional config: { tolerance: 0-255, targetColor: [r,g,b] }
 * @returns {Promise<HTMLImageElement>}
 */
function loadImageNoBg(src, options = {}) {
  const tolerance = options.tolerance ?? 40;
  const targetColor = options.targetColor ?? null; // null = auto-detect from corners

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const offCanvas = document.createElement("canvas");
      offCanvas.width = img.width;
      offCanvas.height = img.height;
      const offCtx = offCanvas.getContext("2d");
      offCtx.drawImage(img, 0, 0);

      const imageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
      const data = imageData.data;
      const w = offCanvas.width;
      const h = offCanvas.height;

      // Auto-detect background color from the four corners
      function getPixel(x, y) {
        const idx = (y * w + x) * 4;
        return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
      }

      let bgColor;
      if (targetColor) {
        bgColor = targetColor;
      } else {
        // Average the four corners to determine the background color
        const corners = [
          getPixel(0, 0),
          getPixel(w - 1, 0),
          getPixel(0, h - 1),
          getPixel(w - 1, h - 1),
        ];
        bgColor = [
          Math.round(corners.reduce((s, c) => s + c[0], 0) / 4),
          Math.round(corners.reduce((s, c) => s + c[1], 0) / 4),
          Math.round(corners.reduce((s, c) => s + c[2], 0) / 4),
        ];
      }

      // Flood-fill approach: remove pixels that are "close" to the background color
      function colorDistance(r1, g1, b1, r2, g2, b2) {
        return Math.sqrt(
          (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2
        );
      }

      // Use flood fill from all edges to only remove connected background pixels
      const visited = new Uint8Array(w * h);
      const queue = [];

      function enqueue(x, y) {
        const idx = y * w + x;
        if (x < 0 || x >= w || y < 0 || y >= h || visited[idx]) return;
        const pIdx = idx * 4;
        const [r, g, b, a] = [data[pIdx], data[pIdx+1], data[pIdx+2], data[pIdx+3]];
        if (a < 10) { // already transparent
          visited[idx] = 1;
          return;
        }
        if (colorDistance(r, g, b, bgColor[0], bgColor[1], bgColor[2]) <= tolerance) {
          visited[idx] = 1;
          queue.push([x, y]);
        }
      }

      // Seed from all border pixels
      for (let x = 0; x < w; x++) { enqueue(x, 0); enqueue(x, h - 1); }
      for (let y = 0; y < h; y++) { enqueue(0, y); enqueue(w - 1, y); }

      // BFS flood fill
      while (queue.length > 0) {
        const [x, y] = queue.pop();
        const pIdx = (y * w + x) * 4;
        data[pIdx + 3] = 0; // make transparent
        enqueue(x + 1, y);
        enqueue(x - 1, y);
        enqueue(x, y + 1);
        enqueue(x, y - 1);
      }

      offCtx.putImageData(imageData, 0, 0);

      const result = new Image();
      result.onload = () => resolve(result);
      result.src = offCanvas.toDataURL();
    };

    img.onerror = () => {
      // Fall back to original image if load fails
      const fallback = new Image();
      fallback.src = src;
      resolve(fallback);
    };

    img.src = src;
  });
}

// ======================
// IMAGES (loaded with background removal)
// ======================
let playerImg, pickleImg, strongPickleImg, bossPickleImg, explosionImg;
let imagesReady = false;

async function loadImages() {
  [playerImg, pickleImg, strongPickleImg, bossPickleImg, explosionImg] = await Promise.all([
    loadImageNoBg(
      "https://png.pngtree.com/png-vector/20241016/ourlarge/pngtree-vampire-cartoon-png-image_14089958.png",
      { tolerance: 50 }
    ),
    loadImageNoBg(
      "https://www.clipartmax.com/png/middle/15-153390_image-result-for-pickle-clipart-food-prints-family-transparent-background-pickle-clipart.png",
      { tolerance: 50 }
    ),
    loadImageNoBg(
      "https://img.freepik.com/premium-psd/png-pickled-cucumber-transparent-background_53876-497988.jpg",
      { tolerance: 50 }
    ),
    loadImageNoBg(
      "https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-cartoon-pickle-character-with-big-eyes-png-image_12526411.png",
      { tolerance: 50 }
    ),
    loadImageNoBg(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5MsJ_CSDz6qeaC3vBwG8ETNKHBaMeefEO2g&s",
      { tolerance: 60 }
    ),
  ]);
  imagesReady = true;
}

// ======================
// GAME STATE
// ======================
let score, lives, gameOver, fireCooldown, fireRate, wave, flashTimer;
let bossActive = false;
let bossDefeated = false;

// ======================
// PLAYER
// ======================
const player = {
  width: 60,
  height: 35,
  speed: 6,
  x: 0,
  y: 0
};

// ======================
// INPUT
// ======================
const keys = {};

document.addEventListener("keydown", e => {
  keys[e.key.toLowerCase()] = true;
  if (e.code === "Space") e.preventDefault();

  if (e.key === "Escape" && gameStarted && !gameOver) {
    paused = !paused;
  }

  if (e.key.toLowerCase() === "r" && gameOver) {
    resetGame();
  }
});

document.addEventListener("keyup", e => {
  keys[e.key.toLowerCase()] = false;
});

// ======================
// OBJECTS
// ======================
let bullets = [];
let enemyBullets = [];
let explosions = [];
let enemies = [];

// ======================
// SPAWN WAVES
// ======================
function spawnWave() {
  enemies = [];
  const rows = 3 + wave;
  const cols = 6;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const strong = Math.random() < 0.2;

      enemies.push({
        x: 80 + c * 70,
        y: 60 + r * 50,
        width: 40,
        height: 30,
        dx: 1 + wave * 0.3,
        hp: strong ? 3 : 1,
        img: strong ? strongPickleImg : pickleImg,
        wobble: Math.random() * 10,
        boss: false
      });
    }
  }
}

// ======================
// BOSS SPAWN
// ======================
function spawnBoss() {
  enemies = [];
  bossActive = true;

  enemies.push({
    x: canvas.width / 2 - 80,
    y: 80,
    width: 160,
    height: 120,
    dx: 2,
    hp: 50,
    img: bossPickleImg,
    wobble: 0,
    boss: true,
    shootRate: 0.03
  });
}

// ======================
// RESET GAME
// ======================
function resetGame() {
  score = 0;
  lives = 3;
  fireRate = 20;
  fireCooldown = 0;
  wave = 1;
  gameOver = false;
  paused = false;
  flashTimer = 0;
  bossActive = false;
  bossDefeated = false;

  bullets = [];
  enemyBullets = [];
  explosions = [];

  player.x = canvas.width / 2 - player.width / 2;
  player.y = canvas.height - 80;

  endScreen.style.display = "none";
  startScreen.style.display = "none";

  spawnWave();
}

// ======================
// START GAME
// ======================
startScreen.addEventListener("click", async () => {
  if (gameStarted) return;
  gameStarted = true;

  // Show a loading indicator while images process
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ff66";
  ctx.font = "20px monospace";
  ctx.textAlign = "center";
  ctx.fillText("Loading...", canvas.width / 2, canvas.height / 2);
  ctx.textAlign = "left";

  await loadImages();
  resetGame();
  loop();
});

// ======================
// COLLISION
// ======================
function hit(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// ======================
// UPDATE
// ======================
function update() {
  if (!gameStarted || gameOver || paused) return;

  // Player movement
  if (keys["a"] && player.x > 0) player.x -= player.speed;
  if (keys["d"] && player.x < canvas.width - player.width)
    player.x += player.speed;

  // Shooting
  if (keys[" "] && fireCooldown <= 0) {
    bullets.push({
      x: player.x + player.width / 2 - 2,
      y: player.y,
      width: 4,
      height: 10
    });
    fireCooldown = fireRate;
  }
  fireCooldown--;

  // Upgrade
  if (keys["p"] && score >= 100) {
    fireRate = Math.max(5, fireRate - 5);
    score -= 100;
    keys["p"] = false;
  }

  bullets.forEach(b => (b.y -= 10));
  enemyBullets.forEach(b => (b.y += 6));

  // Enemy behavior
  enemies.forEach(e => {
    e.x += e.dx;
    e.wobble += 0.1;

    if (e.boss) {
      if (e.x <= 0 || e.x >= canvas.width - e.width) e.dx *= -1;

      if (Math.random() < e.shootRate) {
        enemyBullets.push({
          x: e.x + e.width / 2 - 3,
          y: e.y + e.height,
          width: 6,
          height: 14
        });
      }
    } else {
      if (Math.random() < 0.002 * wave) {
        enemyBullets.push({
          x: e.x + e.width / 2 - 2,
          y: e.y + e.height,
          width: 4,
          height: 10
        });
      }
    }
  });

  // Bounce normal enemies
  if (
    enemies.some(e => !e.boss && (e.x < 0 || e.x > canvas.width - e.width))
  ) {
    enemies.forEach(e => {
      if (!e.boss) {
        e.dx *= -1;
        e.y += 10;
      }
    });
  }

  // Bullet collisions
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = enemies.length - 1; j >= 0; j--) {
      if (hit(bullets[i], enemies[j])) {
        bullets.splice(i, 1);
        enemies[j].hp--;

        if (enemies[j].hp <= 0) {
          explosions.push({ x: enemies[j].x, y: enemies[j].y, timer: 20 });

          if (enemies[j].boss) {
            score += 500;
            bossDefeated = true;
            gameOver = true;
          } else {
            score += 10;
          }

          enemies.splice(j, 1);
        }
        break;
      }
    }
  }

  // Player hit
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    if (hit(enemyBullets[i], player)) {
      enemyBullets.splice(i, 1);
      lives--;
      flashTimer = 10;
      if (lives <= 0) gameOver = true;
    }
  }

  // Explosions
  explosions.forEach((ex, i) => {
    ex.timer--;
    if (ex.timer <= 0) explosions.splice(i, 1);
  });

  if (flashTimer > 0) flashTimer--;

  // Next wave / boss
  if (enemies.length === 0 && !bossActive) {
    wave++;
    if (wave === 4) {
      spawnBoss();
    } else {
      spawnWave();
    }
  }

  // End screen
  if (gameOver) {
    endScreen.style.display = "flex";
    endScore.textContent = `Score: ${score}`;
  }
}

// ======================
// DRAW
// ======================
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // UI
  ctx.font = "16px monospace";
  ctx.fillStyle = "#00ff66";
  ctx.fillText(`Score: ${score}`, 10, 20);
  ctx.fillText(`Lives: ${lives}`, 10, 40);
  ctx.fillText(`Wave: ${wave}`, 10, 60);

  if (paused) {
    ctx.font = "30px monospace";
    ctx.textAlign = "center";
    ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
    ctx.textAlign = "left";
    return;
  }

  // Player
  if (flashTimer % 2 === 0) {
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
  }

  // Bullets
  ctx.fillStyle = "yellow";
  bullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));

  ctx.fillStyle = "red";
  enemyBullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));

  // Enemies
  enemies.forEach(e => {
    const wobbleY = Math.sin(e.wobble) * 3;
    ctx.drawImage(e.img, e.x, e.y + wobbleY, e.width, e.height);
  });

  // Explosions
  explosions.forEach(ex => {
    ctx.drawImage(explosionImg, ex.x, ex.y, 40, 40);
  });
}

// ======================
// LOOP
// ======================
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
