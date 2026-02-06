const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ======================
// GAME STATE
// ======================
let score = 0;
let lives = 3;
let gameOver = false;
let fireCooldown = 0;
let fireRate = 20;
let wave = 1;

// ======================
// PLAYER
// ======================
const player = {
  x: canvas.width / 2 - 20,
  y: canvas.height - 60,
  width: 40,
  height: 20,
  speed: 6
};

// ======================
// INPUT
// ======================
const keys = {};

document.addEventListener("keydown", e => {
  const key = e.key.toLowerCase();
  keys[key] = true;

  if (key === "q") gameOver = true;

  if (key === "r" && gameOver) {
    resetGame();
  }
});

document.addEventListener("keyup", e => {
  keys[e.key.toLowerCase()] = false;
});

// ======================
// PROJECTILES
// ======================
const bullets = [];
const enemyBullets = [];

// ======================
// ENEMIES
// ======================
let enemies = [];

function spawnWave() {
  enemies = [];
  const rows = 3 + wave;
  const cols = 6;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      enemies.push({
        x: 80 + c * 70,
        y: 60 + r * 50,
        width: 30,
        height: 20,
        dx: wave
      });
    }
  }
}

spawnWave();

// ======================
// UPDATE
// ======================
function update() {
  if (gameOver) return;

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
  }

  // Move bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= 10;
    if (bullets[i].y < 0) bullets.splice(i, 1);
  }

  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    enemyBullets[i].y += 6;
    if (enemyBullets[i].y > canvas.height) enemyBullets.splice(i, 1);
  }

  // Enemy movement + shooting
  enemies.forEach(e => {
    e.x += e.dx;

    if (Math.random() < 0.002 * wave) {
      enemyBullets.push({
        x: e.x + e.width / 2,
        y: e.y + e.height,
        width: 4,
        height: 10
      });
    }
  });

  // Bounce enemies
  if (enemies.some(e => e.x < 0 || e.x > canvas.width - e.width)) {
    enemies.forEach(e => {
      e.dx *= -1;
      e.y += 10;
    });
  }

  // Bullet collision (safe reverse loops)
  for (let b = bullets.length - 1; b >= 0; b--) {
    for (let e = enemies.length - 1; e >= 0; e--) {
      if (hit(bullets[b], enemies[e])) {
        bullets.splice(b, 1);
        enemies.splice(e, 1);
        score += 10;
        break;
      }
    }
  }

  // Enemy bullet collision
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    if (hit(enemyBullets[i], player)) {
      enemyBullets.splice(i, 1);
      lives--;
      if (lives <= 0) gameOver = true;
    }
  }

  // Enemy hits player
  enemies.forEach(e => {
    if (hit(e, player)) gameOver = true;
  });

  // Next wave
  if (enemies.length === 0) {
    wave++;
    spawnWave();
  }
}

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
// DRAW
// ======================
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.textBaseline = "top";

  // Player
  ctx.fillStyle = "#00ff66";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Bullets
  ctx.fillStyle = "yellow";
  bullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));

  ctx.fillStyle = "red";
  enemyBullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));

  // Enemies
  ctx.fillStyle = "#00aa00";
  enemies.forEach(e => ctx.fillRect(e.x, e.y, e.width, e.height));

  // UI (FIXED FONT)
  ctx.fillStyle = "#00ff66";
  ctx.font = "16px monospace";

  ctx.fillText(`Score: ${score}`, 10, 10);
  ctx.fillText(`Lives: ${lives}`, 10, 30);
  ctx.fillText(`Wave: ${wave}`, 10, 50);

  // Game Over Screen
  if (gameOver) {
    ctx.textAlign = "center";
    ctx.font = "40px monospace";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 40);

    ctx.font = "20px monospace";
    ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2);
    ctx.fillText("Press R to Restart", canvas.width / 2, canvas.height / 2 + 40);

    ctx.textAlign = "start";
  }
}

// ======================
// RESET
// ======================
function resetGame() {
  score = 0;
  lives = 3;
  wave = 1;
  fireRate = 20;
  bullets.length = 0;
  enemyBullets.length = 0;
  gameOver = false;
  player.x = canvas.width / 2 - 20;
  spawnWave();
}

// ======================
// LOOP
// ======================
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
