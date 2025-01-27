
import init, { Game } from "../../rust/pkg/rust.js";

const canvas = document.getElementById("gameCanvas");
let wrapper = document.getElementById("wrapper")
let gameOverSign = document.getElementById("gameOverSign")
const scoreDisplay = document.getElementById("score");
let distance;
function resizeCanvas() {
  if (window.innerWidth < 450) {
    wrapper.style.width = "100vw";
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;
    wrapper.style.borderRadius=0; 
    document.body.style.overflowY="hidden";
    scoreDisplay.style.top=0;
    scoreDisplay.style.height="fit-content";
    scoreDisplay.style.paddingTop="2vh";
    scoreDisplay.style.fontSize="4vh";
    distance=30;

  }
  else {
    wrapper.style.width = "fit-content";
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight * 0.8;
    distance=0;
  }
}
resizeCanvas()
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const restartBtn = document.getElementById("restart");

const pressedKeys = new Set();
const intervals = new Map();
const img = new Image();
const sideWayTree = new Image();
sideWayTree.src = "./SideWayTree.png";
img.src = "./tree.png";
let images = [img, sideWayTree];
let game;
let cur_cunk = 1;


let draw = (x, y) => {
  ctx.drawImage(images[0], x-6, y + 10+ distance, 50, 110);
};
let drawSideWayTree = (x, y) => {
  ctx.drawImage(images[1], x - 45, y - 108+distance, 100, 250);
};

let distance_between_skiis_x;
let distance_between_skiis_y;
let x_offset_of_ligtning;
function drawBody( x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y); // Початок зверху зліва (з урахуванням радіуса)
  ctx.lineTo(x + width - radius, y); // Верхня сторона
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius); // Правий верхній кут
  ctx.lineTo(x + width, y + height - radius); // Права сторона
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height); // Правий нижній кут
  ctx.lineTo(x + radius, y + height); // Нижня сторона
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius); // Лівий нижній кут
  ctx.lineTo(x, y + radius); // Ліва сторона
  ctx.quadraticCurveTo(x, y, x + radius, y); // Лівий верхній кут
  ctx.closePath();
  ctx.fill();
}
function drawSkier(ctx, x, y, rotation) {
  const radians = (rotation + 90) * -1 * (Math.PI / 180);
  distance_between_skiis_x = (90 - Math.abs(rotation)) / 6
  distance_between_skiis_y = (rotation) / 15;
  x_offset_of_ligtning = 10 + rotation / 11.25;
  ctx.save();
  ctx.translate(x, y);
  ctx.save();
  ctx.rotate(radians);
  ctx.fillStyle = "black";
  let additionalOffset=rotation<0?  rotation/-3.5:0;
  ctx.fillRect(-35 + distance_between_skiis_y + additionalOffset, 2, 30, 4);
  ctx.fillRect(-35 + distance_between_skiis_y * -1+ additionalOffset, distance_between_skiis_x, 30, 4);
  ctx.restore();
  // Малюємо тулуб
  ctx.fillStyle = "#b3030f";
  
  drawBody(0, -5, 20, 25,10);

  ctx.fillStyle = "#f5f0ec";
  ctx.fillRect(x_offset_of_ligtning, -5, 2, 22);

  ctx.beginPath();
  ctx.fillStyle = "#d8cf89"; 
  ctx.arc(10 , -10, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = "#b3030f"; 
  ctx.arc(10, -10, 10, 0, Math.PI, true); 
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = "#f5f0ec"; 
  ctx.arc(10, -20,3 , 0, Math.PI*2, true); 
  ctx.fill();
  ctx.closePath();
  ctx.restore();




}
function drawtrees(trees, player_y) {
  trees.sort((a, b) => a.y - b.y).forEach((tree) => {
    if (tree.x > width * 0.2 && tree.x < width * 0.8) {
    draw(tree.x, tree.y - player_y + 10);
    } else {
    drawSideWayTree(tree.x, tree.y - player_y + 10);
    }
  });
}

const shadowDistance= 110 + distance;
function drawShadow(trees, player_y) {
  trees.forEach((tree) => {
    if (tree.x > width * 0.2 && tree.x < width * 0.8)
      ctx.fillRect(tree.x - 8, tree.y - player_y + shadowDistance, 45, 60);
    else {
      ctx.fillRect(tree.x - 20, tree.y - player_y + shadowDistance, 70, 150);
    }
  });
}

function drawTraces(player_y) {
  let traces = game.get_all_traces_for_js();

  if (traces.length < 2) return; // Якщо точок недостатньо, нічого не малюємо

  // Малювання першої кривої (ліва лінія)
  ctx.beginPath();
  ctx.moveTo(traces[0].x + 5, traces[0].y - player_y + height * 0.205); // Початкова точка
  for (let i = 1; i < traces.length - 1; i++) {
    const cpX = (traces[i].x + traces[i + 1].x) / 2 + 5; // Середина між двома точками
    const cpY = (traces[i].y + traces[i + 1].y) / 2 - player_y + height * 0.205;
    ctx.quadraticCurveTo(
      traces[i].x + 5,
      traces[i].y - player_y + height * 0.205,
      cpX,
      cpY
    );
  }
  ctx.lineTo(
    traces[traces.length - 1].x + 5,
    traces[traces.length - 1].y - player_y + height * 0.205
  );
  ctx.strokeStyle = "#95b1df";
  ctx.lineWidth = 4;
  ctx.stroke();

  // Малювання другої кривої (права лінія)
  ctx.beginPath();
  ctx.moveTo(traces[0].x + 15, traces[0].y - player_y + height * 0.205); // Початкова точка
  for (let i = 1; i < traces.length - 1; i++) {
    const cpX = (traces[i].x + traces[i + 1].x) / 2 + 15; // Середина між двома точками
    const cpY = (traces[i].y + traces[i + 1].y) / 2 - player_y + height * 0.205;
    ctx.quadraticCurveTo(
      traces[i].x + 15,
      traces[i].y - player_y + height * 0.205,
      cpX,
      cpY
    );
  }
  ctx.lineTo(
    traces[traces.length - 1].x + 15,
    traces[traces.length - 1].y - player_y + height * 0.205
  );
  ctx.strokeStyle = "#95b1df";
  ctx.lineWidth = 4;
  ctx.stroke();
}
let mode = Math.floor(width/50)

async function run() {
  try {
    await init();
    game = Game.new(height, width, mode);
    game.generate_chunk(0)
    cur_cunk = 10;
    let trees = game.get_all_trees_for_js();
    function map(value, canvasWidth) {
      const minRotation = -50;
      const maxRotation = 50;
      const normalizedValue = (value / canvasWidth) * 2 - 1;
      return Math.max(
        minRotation,
        Math.min(maxRotation, normalizedValue * maxRotation)
      );
    }
    function startAction(key, direction) {
      if (intervals.has(key)) return;

      game.btn_change_rotation(direction);

      const interval = setInterval(() => {
        game.btn_change_rotation(direction);

      }, 13);

      intervals.set(key, interval);
    }
    function stopAction(key) {
      if (intervals.has(key)) {
        clearInterval(intervals.get(key));
        intervals.delete(key);
      }
    }
    window.addEventListener("keydown", (event) => {
      const key = event.key;
      if (!pressedKeys.has(key)) {
        pressedKeys.add(key);
        if (key === "ArrowLeft") {
          startAction(key, -1);
        } else if (key === "ArrowRight") {
          startAction(key, 1);
        }
      }
    });
    window.addEventListener("keyup", (event) => {
      const key = event.key;
      pressedKeys.delete(key);
      stopAction(key);
    });
    canvas.addEventListener("mousemove", (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const rotation = map(mouseX, rect.width);
      game.change_player_rotation(rotation);
    });
    canvas.addEventListener("touchmove", (event) => {
      event.preventDefault();

      const rect = canvas.getBoundingClientRect();
      const touchX = event.touches[0].clientX - rect.left;
      const rotation = map(touchX, rect.width);

      game.change_player_rotation(rotation);
    });
    restartBtn.addEventListener("click", () => {
      gameOverSign.style.display="none";
      game.restart();
      gameLoop();
    });

    function gameLoop() {
      let player_y = game.get_player_y();
      const req_cur_chunk =game.get_current_chunk();
      if ( req_cur_chunk!== cur_cunk  && player_y % height> height*0.5) {
        trees = game.get_all_trees_for_js();
        cur_cunk=req_cur_chunk;
      }

      try {
        game.update();
        if (game.get_is_game_over()) {
          gameOverSign.style.display="flex";
          return;
        }

        ctx.fillStyle = "#95b1df";
        ctx.clearRect(0, 0, width, height);
        drawShadow(trees, player_y)
        drawTraces(player_y);

        drawSkier(ctx, game.get_player_x(), height * 0.2 , game.get_player_rotation());
        drawtrees(trees, player_y)

        scoreDisplay.textContent =
          "Score: " + Math.floor(game.get_player_y());

        requestAnimationFrame(gameLoop);
      } catch (error) {
        console.error("Error during game loop:", error);
      }
    }

    gameLoop();
  } catch (error) {
    console.error(error);
  }
}

run();

