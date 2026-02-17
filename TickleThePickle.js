// ======================
// CANVAS SETUP
// ======================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startScreen = document.getElementById("startScreen");
const endScreen = document.getElementById("endScreen");
const endScore = document.getElementById("endScore");
const victoryScreen = document.getElementById("victoryScreen");
const victoryScore = document.getElementById("victoryScore");

let gameStarted = false;
let paused = false;

// ======================
// SPRITE DRAWING FUNCTIONS
// (Drawn directly on canvas — zero CORS, zero background issues)
// ======================

function drawPlayer(x, y, w, h) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);

  // Cape
  ctx.fillStyle = "#5a0080";
  ctx.beginPath();
  ctx.moveTo(-w / 2, h * 0.1);
  ctx.lineTo(-w * 0.6, h / 2);
  ctx.lineTo(w * 0.6, h / 2);
  ctx.lineTo(w / 2, h * 0.1);
  ctx.closePath();
  ctx.fill();

  // Body
  ctx.fillStyle = "#2a002a";
  ctx.fillRect(-w * 0.25, -h * 0.15, w * 0.5, h * 0.4);

  // Head
  ctx.fillStyle = "#f5e6d0";
  ctx.beginPath();
  ctx.ellipse(0, -h * 0.3, w * 0.22, h * 0.25, 0, 0, Math.PI * 2);
  ctx.fill();

  // Widow's peak / bat ears
  ctx.fillStyle = "#1a001a";
  ctx.beginPath();
  ctx.moveTo(-w * 0.22, -h * 0.38);
  ctx.lineTo(-w * 0.3, -h * 0.52);
  ctx.lineTo(-w * 0.12, -h * 0.42);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(w * 0.22, -h * 0.38);
  ctx.lineTo(w * 0.3, -h * 0.52);
  ctx.lineTo(w * 0.12, -h * 0.42);
  ctx.closePath();
  ctx.fill();

  // Glowing red eyes
  ctx.fillStyle = "#ff0033";
  ctx.shadowColor = "#ff0033";
  ctx.shadowBlur = 6;
  ctx.beginPath();
  ctx.ellipse(-w * 0.08, -h * 0.32, w * 0.05, h * 0.05, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(w * 0.08, -h * 0.32, w * 0.05, h * 0.05, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Fangs
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(-w * 0.05, -h * 0.18);
  ctx.lineTo(-w * 0.02, -h * 0.08);
  ctx.lineTo(w * 0.01, -h * 0.18);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(w * 0.02, -h * 0.18);
  ctx.lineTo(w * 0.05, -h * 0.08);
  ctx.lineTo(w * 0.08, -h * 0.18);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawPickle(x, y, w, h) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);

  ctx.fillStyle = "#4a7c3f";
  ctx.beginPath();
  ctx.ellipse(0, 0, w * 0.38, h * 0.48, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#6ab04c";
  ctx.lineWidth = 2;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.arc(i * w * 0.1, 0, h * 0.35, Math.PI * 0.15, Math.PI * 0.85);
    ctx.stroke();
  }

  ctx.fillStyle = "#3a6a2f";
  [[-w * 0.15, -h * 0.1], [w * 0.1, h * 0.15], [-w * 0.05, h * 0.25], [w * 0.2, -h * 0.2]].forEach(([bx, by]) => {
    ctx.beginPath();
    ctx.arc(bx, by, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.ellipse(-w * 0.12, -h * 0.1, w * 0.08, h * 0.09, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(w * 0.12, -h * 0.1, w * 0.08, h * 0.09, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.arc(-w * 0.1, -h * 0.1, w * 0.04, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(w * 0.14, -h * 0.1, w * 0.04, 0, Math.PI * 2);
  ctx.fill();

  // Angry brows
  ctx.strokeStyle = "#222";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-w * 0.2, -h * 0.22);
  ctx.lineTo(-w * 0.04, -h * 0.18);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w * 0.04, -h * 0.18);
  ctx.lineTo(w * 0.2, -h * 0.22);
  ctx.stroke();

  ctx.restore();
}

function drawStrongPickle(x, y, w, h) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);

  ctx.fillStyle = "#2d5a1e";
  ctx.beginPath();
  ctx.ellipse(0, 0, w * 0.42, h * 0.48, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#1a3d0f";
  ctx.lineWidth = 3;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.arc(i * w * 0.1, 0, h * 0.38, Math.PI * 0.15, Math.PI * 0.85);
    ctx.stroke();
  }

  // Spiky crown
  ctx.fillStyle = "#8b0000";
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo(i * w * 0.15 - w * 0.06, -h * 0.42);
    ctx.lineTo(i * w * 0.15, -h * 0.6);
    ctx.lineTo(i * w * 0.15 + w * 0.06, -h * 0.42);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = "#ff2200";
  ctx.shadowColor = "#ff2200";
  ctx.shadowBlur = 4;
  ctx.beginPath();
  ctx.ellipse(-w * 0.14, -h * 0.1, w * 0.09, h * 0.09, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(w * 0.14, -h * 0.1, w * 0.09, h * 0.09, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(-w * 0.12, -h * 0.1, w * 0.03, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(w * 0.16, -h * 0.1, w * 0.03, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// ======================
// BOSS IMAGE
// ======================
const bossPickleImg = new Image();
bossPickleImg.src =
  "https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-cartoon-pickle-character-with-big-eyes-png-image_12526411.png";

function drawPickleSlices(ex, progress) {
  const alpha = 1 - progress;
  ctx.save();
  ctx.globalAlpha = alpha;

  ex.slices.forEach(slice => {
    const dist = progress * slice.speed;
    const sx = ex.cx + Math.cos(slice.angle) * dist;
    const sy = ex.cy + Math.sin(slice.angle) * dist;
    const rot = slice.spin * progress * Math.PI * 3;
    const sw = slice.w;
    const sh = slice.h;

    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(rot);

    // Slice body — green oval (cross-section of pickle)
    ctx.fillStyle = "#4a7c3f";
    ctx.beginPath();
    ctx.ellipse(0, 0, sw, sh, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lighter green flesh ring
    ctx.strokeStyle = "#6ab04c";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, sw * 0.7, sh * 0.7, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Seeds (2 small white ovals)
    ctx.fillStyle = "#e8f5c8";
    ctx.beginPath();
    ctx.ellipse(-sw * 0.25, 0, sw * 0.15, sh * 0.2, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(sw * 0.2, sh * 0.1, sw * 0.12, sh * 0.18, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Dark outline
    ctx.strokeStyle = "#2d5a1e";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(0, 0, sw, sh, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  });

  ctx.globalAlpha = 1;
  ctx.restore();
}

// ======================
// GAME STATE
// ======================
let score, lives, gameOver, fireCooldown, fireRate, wave, flashTimer;
let bossActive = false;
let bossDefeated = false;
let upgradedThisWave = false;

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
        type: strong ? "strong" : "normal",
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
    maxHp: 50,
    type: "boss",
    wobble: 0,
    boss: true,
    shootRate: 0.03
  });
}

// ======================
// SHOW VICTORY SCREEN
// ======================
function showVictoryScreen() {
  // Hide the canvas UI by clearing it with a solid color so game elements
  // don't bleed through the overlay
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  victoryScore.textContent = `Final Score: ${score}`;
  victoryScreen.style.display = "flex";
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
  upgradedThisWave = false;

  bullets = [];
  enemyBullets = [];
  explosions = [];

  player.x = canvas.width / 2 - player.width / 2;
  player.y = canvas.height - 80;

  endScreen.style.display = "none";
  startScreen.style.display = "none";
  victoryScreen.style.display = "none";

  spawnWave();
}

// ======================
// START GAME
// ======================
startScreen.addEventListener("click", () => {
  if (gameStarted) return;
  gameStarted = true;
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
  if (keys["p"] && score >= 200 && !upgradedThisWave) {
    fireRate = Math.max(5, fireRate - 5);
    score -= 200;
    upgradedThisWave = true;
    keys["p"] = false;
  }

  bullets.forEach(b => (b.y -= 10));
  enemyBullets.forEach(b => (b.y += 6));

  // Cull off-screen bullets so they never accumulate
  bullets = bullets.filter(b => b.y + b.height > 0);
  enemyBullets = enemyBullets.filter(b => b.y < canvas.height);

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
    // Guard: bullet may have already been removed in a previous iteration
    if (!bullets[i]) continue;

    let bulletUsed = false;

    for (let j = enemies.length - 1; j >= 0; j--) {
      if (hit(bullets[i], enemies[j])) {
        // Mark bullet as used BEFORE resolving enemy logic so we don't
        // re-enter enemy checks with a stale index after splice
        bulletUsed = true;
        enemies[j].hp--;

        if (enemies[j].hp <= 0) {
          const numSlices = enemies[j].boss ? 10 : 5;
          const baseSpeed = enemies[j].boss ? 90 : 45;
          const sliceW = enemies[j].boss ? 14 : 9;
          const sliceH = enemies[j].boss ? 10 : 7;
          const slices = Array.from({ length: numSlices }, (_, k) => ({
            angle: (k / numSlices) * Math.PI * 2 + (Math.random() - 0.5) * 0.6,
            speed: baseSpeed + Math.random() * baseSpeed * 0.6,
            spin: (Math.random() - 0.5) * 2,
            w: sliceW + Math.random() * 4,
            h: sliceH + Math.random() * 3
          }));
          explosions.push({
            cx: enemies[j].x + enemies[j].width / 2,
            cy: enemies[j].y + enemies[j].height / 2,
            slices,
            timer: 28,
            maxTimer: 28
          });

          if (enemies[j].boss) {
            score += 500;
            bossDefeated = true;
            gameOver = true;
            enemies.splice(j, 1);
            // Show victory screen instead of game over screen
            showVictoryScreen();
          } else {
            score += 25;
            enemies.splice(j, 1);
          }
        }
        break;
      }
    }

    // Splice the bullet once, after the inner loop, only if it hit something
    if (bulletUsed) {
      bullets.splice(i, 1);
    }
  }

  // Player hit
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    if (hit(enemyBullets[i], player)) {
      enemyBullets.splice(i, 1);
      lives--;
      flashTimer = 10;
      if (lives <= 0) {
        gameOver = true;
        // Only show game over if it was NOT a boss victory
        if (!bossDefeated) {
          endScreen.style.display = "flex";
          endScore.textContent = `Score: ${score}`;
        }
      }
    }
  }

  // Explosions
  explosions.forEach((ex, i) => {
    ex.timer--;
    if (ex.timer <= 0) explosions.splice(i, 1);
  });

  if (flashTimer > 0) flashTimer--;

  // Pickle invasion — lose if any enemy reaches 2 rows above the player
  const invasionLine = player.y - 100; // 2 enemy rows (50px each) above player
  if (!bossActive && enemies.some(e => e.y + e.height >= invasionLine)) {
    gameOver = true;
    endScreen.style.display = "flex";
    endScore.textContent = `Score: ${score}`;
  }

  // Next wave / boss
  if (enemies.length === 0 && !bossActive && !gameOver) {
    wave++;
    upgradedThisWave = false;
    if (wave === 4) {
      spawnBoss();
    } else {
      spawnWave();
    }
  }
}

// ======================
// DRAW
// ======================
function draw() {
  // If game is over and we're showing a full-screen overlay, skip drawing
  if (gameOver) return;

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

  // Danger line — 2 enemy rows above player
  if (!bossActive) {
    const invasionLine = player.y - 100;
    ctx.save();
    ctx.strokeStyle = "rgba(255, 60, 60, 0.45)";
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(0, invasionLine);
    ctx.lineTo(canvas.width, invasionLine);
    ctx.stroke();
    ctx.restore();
  }

  // Player (drawn after danger line so it appears on top)
  if (flashTimer % 2 === 0) {
    drawPlayer(player.x, player.y, player.width, player.height);
  }

  // Bullets
  ctx.fillStyle = "yellow";
  bullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));

  ctx.fillStyle = "red";
  enemyBullets.forEach(b => ctx.fillRect(b.x, b.y, b.width, b.height));

  // Enemies
  enemies.forEach(e => {
    const wobbleY = Math.sin(e.wobble) * 3;
    if (e.type === "boss") {
      ctx.drawImage(bossPickleImg, e.x, e.y + wobbleY, e.width, e.height);
      // Boss HP bar
      const hpPct = e.hp / e.maxHp;
      ctx.fillStyle = "#222";
      ctx.fillRect(e.x, e.y + e.height + 6, e.width, 8);
      ctx.fillStyle = hpPct > 0.5 ? "#00ff66" : hpPct > 0.25 ? "#ffaa00" : "#ff2200";
      ctx.fillRect(e.x, e.y + e.height + 6, e.width * hpPct, 8);
      ctx.strokeStyle = "#555";
      ctx.lineWidth = 1;
      ctx.strokeRect(e.x, e.y + e.height + 6, e.width, 8);
    } else if (e.type === "strong") {
      drawStrongPickle(e.x, e.y + wobbleY, e.width, e.height);
    } else {
      drawPickle(e.x, e.y + wobbleY, e.width, e.height);
    }
  });

  // Pickle slice explosions
  explosions.forEach(ex => {
    drawPickleSlices(ex, 1 - ex.timer / ex.maxTimer);
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
