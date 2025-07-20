const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const car = { x: 180, y: 500, width: 40, height: 60, speed: 5 };
const obstacles = [];
let score = 0;
let gameOver = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && car.x > 0) car.x -= car.speed;
  if (e.key === "ArrowRight" && car.x + car.width < canvas.width) car.x += car.speed;
});

function drawCar() {
  ctx.fillStyle = "aqua";
  ctx.fillRect(car.x, car.y, car.width, car.height);
}

function spawnObstacle() {
  const x = Math.random() * (canvas.width - 40);
  obstacles.push({ x, y: -60, width: 40, height: 60 });
}

function drawObstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach(obs => {
    obs.y += 4;
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  });
}

function checkCollision() {
  for (let obs of obstacles) {
    if (
      car.x < obs.x + obs.width &&
      car.x + car.width > obs.x &&
      car.y < obs.y + obs.height &&
      car.y + car.height > obs.y
    ) {
      ctx.fillStyle = "white";
      ctx.font = "24px Arial";
      ctx.fillText("💥 Game Over!", 130, 300);
      gameOver = true;
    }
  }
}

function update() {
  if (gameOver) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCar();
  drawObstacles();
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Score: " + score, 10, 20);
  checkCollision();
  requestAnimationFrame(update);
}

setInterval(() => { if (!gameOver) spawnObstacle(); }, 1000);
setInterval(() => { if (!gameOver) score++; }, 1000);

update();
