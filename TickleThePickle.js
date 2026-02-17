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

function drawBossPickle(x, y, w, h) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);

  // Glow aura
  const grad = ctx.createRadialGradient(0, 0, h * 0.3, 0, 0, h * 0.7);
  grad.addColorStop(0, "rgba(0,255,80,0.18)");
  grad.addColorStop(1, "rgba(0,255,80,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, h * 0.7, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.fillStyle = "#1a4a10";
  ctx.beginPath();
  ctx.ellipse(0, 0, w * 0.45, h * 0.48, 0, 0, Math.PI * 2);
  ctx.fill();

  // Warts
  ctx.fillStyle = "#0f2e08";
  [[-w*0.3,-h*0.2],[w*0.28,h*0.2],[-w*0.1,h*0.35],[w*0.35,-h*0.05],[-w*0.32,h*0.1]].forEach(([bx, by]) => {
    ctx.beginPath();
    ctx.arc(bx, by, 7, 0, Math.PI * 2);
    ctx.fill();
  });

  // Gold crown
  ctx.fillStyle = "#ffd700";
  ctx.beginPath();
  ctx.moveTo(-w * 0.35, -h * 0.45);
  const pts = [-w*0.35, -w*0.175, 0, w*0.175, w*0.35];
  const ht  = [-h*0.55, -h*0.68, -h*0.75, -h*0.68, -h*0.55];
  pts.forEach((cx, i) => ctx.lineTo(cx, ht[i]));
  ctx.lineTo(w * 0.35, -h * 0.45);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#b8860b";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Eyes
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.ellipse(-w * 0.18, -h * 0.08, w * 0.12, h * 0.14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(w * 0.18, -h * 0.08, w * 0.12, h * 0.14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ff0000";
  ctx.shadowColor = "#ff0000";
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(-w * 0.18, -h * 0.08, w * 0.07, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(w * 0.18, -h * 0.08, w * 0.07, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(-w * 0.15, -h * 0.1, w * 0.03, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(w * 0.21, -h * 0.1, w * 0.03, 0, Math.PI * 2);
  ctx.fill();

  // Grin
  ctx.strokeStyle = "#88ff00";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, h * 0.1, w * 0.2, 0, Math.PI);
  ctx.stroke();

  // Fangs
  ctx.fillStyle = "#fff";
  [[-w*0.1,-w*0.02],[w*0.02,w*0.1]].forEach(([l, r]) => {
    ctx.beginPath();
    ctx.moveTo(l, h * 0.1);
    ctx.lineTo((l + r) / 2, h * 0.22);
    ctx.lineTo(r, h * 0.1);
    ctx.closePath();
    ctx.fill();
  });

  ctx.restore();
}

function drawExplosion(x, y, size, progress) {
  ctx.save();
  ctx.translate(x + size / 2, y + size / 2);
  const rays = 8;
  const outerR = size * 0.5 * (1 - progress * 0.3);
  const innerR = size * 0.15;
  const alpha = 1 - progress;

  ctx.globalAlpha = alpha;
  ctx.fillStyle = `hsl(${30 + progress * 40}, 100%, 60%)`;
  ctx.beginPath();
  for (let i = 0; i < rays * 2; i++) {
    const angle = (i / (rays * 2)) * Math.PI * 2;
    const r = i % 2 === 0 ? outerR : innerR;
    if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
    else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = `rgba(255,255,200,${alpha})`;
  ctx.beginPath();
  ctx.arc(0, 0, innerR * 1.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();
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
  height: 55,
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
  if (e.key === "Escape" && gameStarted && !gameOver) paused = !paused;
  if (e.key.toLowerCase() === "r" && gameOver) resetGame();
});
document.addEventListener("keyup", e => { keys[e.key.toLowerCase()] = false; });

// ======================
// OBJECTS
// ======================
let bullets = [], enemyBullets = [], explosions = [], enemies = [];

// ======================
// SPAWN WAVES
// ======================
function spawnWave() {
  enemies = [];
  const rows = 3 + wave, cols = 6;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const strong = Math.random() < 0.2;
      enemies.push({
        x: 80 + c * 70, y: 60 + r * 50,
        width: 40, height: 30,
        dx: 1 + wave * 0.3,
        hp: strong ? 3 : 1,
        type: strong ? "strong" : "normal",
        wobble: Math.random() * 10,
        boss: false
      });
    }
  }
}

function spawnBoss() {
  enemies = [];
  bossActive = true;
  enemies.push({
    x: canvas.width / 2 - 80, y: 80,
    width: 160, height: 120,
    dx: 2, hp: 50, maxHp: 50,
    type: "boss", wobble: 0, boss: true, shootRate: 0.03
  });
}

function resetGame() {
  score = 0; lives = 3; fireRate = 20; fireCooldown = 0;
  wave = 1; gameOver = false; paused = false; flashTimer = 0;
  bossActive = false; bossDefeated = false;
  bullets = []; enemyBullets = []; explosions = [];
  player.x = canvas.width / 2 - player.width / 2;
  player.y = canvas.height - 80;
  endScreen.style.display = "none";
  startScreen.style.display = "none";
  spawnWave();
}

startScreen.addEventListener("click", () => {
  if (gameStarted) return;
  gameStarted = true;
  resetGame();
  loop();
});

function hit(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x &&
         a.y < b.y + b.height && a.y + a.height > b.y;
}

// ======================
// UPDATE
// ======================
function update() {
  if (!gameStarted || gameOver || paused) return;

  if (keys["a"] && player.x > 0) player.x -= player.speed;
  if (keys["d"] && player.x < canvas.width - player.width) player.x += player.speed;

  if (keys[" "] && fireCooldown <= 0) {
    bullets.push({ x: player.x + player.width / 2 - 2, y: player.y, width: 4, height: 10 });
    fireCooldown = fireRate;
  }
  fireCooldown--;

  if (keys["p"] && score >= 100) {
    fireRate = Math.max(5, fireRate - 5);
    score -= 100;
    keys["p"] = false;
  }

  bullets.forEach(b => b.y -= 10);
  enemyBullets.forEach(b => b.y += 6);

  enemies.forEach(e => {
    e.x += e.dx;
    e.wobble += 0.1;
    if (e.boss) {
      if (e.x <= 0 || e.x >= canvas.width - e.width) e.dx *= -1;
      if (Math.random() < e.shootRate)
        enemyBullets.push({ x: e.x + e.width / 2 - 3, y: e.y + e.height, width: 6, height: 14 });
    } else {
      if (Math.random() < 0.002 * wave)
        enemyBullets.push({ x: e.x + e.width / 2 - 2, y: e.y + e.height, width: 4, height: 10 });
    }
  });

  if (enemies.some(e => !e.boss && (e.x < 0 || e.x > canvas.width - e.width))) {
    enemies.forEach(e => { if (!e.boss) { e.dx *= -1; e.y += 10; } });
  }

  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = enemies.length - 1; j >= 0; j--) {
      if (hit(bullets[i], enemies[j])) {
        bullets.splice(i, 1);
        enemies[j].hp--;
        if (enemies[j].hp <= 0) {
          explosions.push({ x: enemies[j].x, y: enemies[j].y, size: enemies[j].boss ? 120 : 40, timer: 20, maxTimer: 20 });
          if (enemies[j].boss) { score += 500; bossDefeated = true; gameOver = true; }
          else score += 10;
          enemies.splice(j, 1);
        }
        break;
      }
    }
  }

  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    if (hit(enemyBullets[i], player)) {
      enemyBullets.splice(i, 1);
      lives--;
      flashTimer = 10;
      if (lives <= 0) gameOver = true;
    }
  }

  explosions.forEach((ex, i) => { ex.timer--; if (ex.timer <= 0) explosions.splice(i, 1); });
  if (flashTimer > 0) flashTimer--;

  bullets = bullets.filter(b => b.y > -20);
  enemyBullets = enemyBullets.filter(b => b.y < canvas.height + 20);

  if (enemies.length === 0 && !bossActive) {
    wave++;
    if (wave === 4) spawnBoss(); else spawnWave();
  }

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

  ctx.font = "16px monospace";
  ctx.fillStyle = "#00ff66";
  ctx.fillText(`Score: ${score}`, 10, 20);
  ctx.fillText(`Lives: ${lives}`, 10, 40);
  ctx.fillText(`Wave: ${wave}`, 10, 60);
  ctx.fillStyle = "#888";
  ctx.font = "11px monospace";
  ctx.fillText("P = upgrade fire (-100pts)", 10, canvas.height - 10);

  if (paused) {
    ctx.font = "30px monospace";
    ctx.fillStyle = "#00ff66";
    ctx.textAlign = "center";
    ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
    ctx.textAlign = "left";
    return;
  }

  if (flashTimer % 2 === 0) drawPlayer(player.x, player.y, player.width, player.height);

  ctx.fillStyle = "#ffff00";
  ctx.shadowColor = "#ffff00";
  ctx.shadowBlur = 6;
  bullets.forEach(b => { ctx.fillRect(b.x, b.y, b.width, b.height); });

  ctx.fillStyle = "#ff4444";
  ctx.shadowColor = "#ff0000";
  ctx.shadowBlur = 8;
  enemyBullets.forEach(b => { ctx.fillRect(b.x, b.y, b.width, b.height); });
  ctx.shadowBlur = 0;

  enemies.forEach(e => {
    const wy = Math.sin(e.wobble) * 3;
    if (e.boss) {
      drawBossPickle(e.x, e.y + wy, e.width, e.height);
      const hpPct = e.hp / e.maxHp;
      ctx.fillStyle = "#222";
      ctx.fillRect(e.x, e.y + e.height + 6, e.width, 8);
      ctx.fillStyle = hpPct > 0.5 ? "#00ff66" : hpPct > 0.25 ? "#ffaa00" : "#ff2200";
      ctx.fillRect(e.x, e.y + e.height + 6, e.width * hpPct, 8);
      ctx.strokeStyle = "#555";
      ctx.lineWidth = 1;
      ctx.strokeRect(e.x, e.y + e.height + 6, e.width, 8);
    } else if (e.type === "strong") {
      drawStrongPickle(e.x, e.y + wy, e.width, e.height);
    } else {
      drawPickle(e.x, e.y + wy, e.width, e.height);
    }
  });

  explosions.forEach(ex => {
    drawExplosion(ex.x, ex.y, ex.size, 1 - ex.timer / ex.maxTimer);
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
