
import init, { Game } from "rust";

const canvas = document.getElementById("gameCanvas");
let wrapper = document.getElementById("wrapper")
function resizeCanvas() {
  if (window.innerWidth < 450) {
    wrapper.style.width = "100vw";
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight * 0.9; 
  }
  else {
    wrapper.style.width = "fit-content";
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight * 0.8;
    console.log(canvas.width)
  }
}
resizeCanvas()
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const width = canvas.width;
const height = canvas.height;
const restartBtn = document.getElementById("restart");
const img = new Image();
const sideWayTree = new Image();
const pressedKeys = new Set();
const intervals = new Map();
sideWayTree.src = "./SideWayTree.png";
img.src = "./tree.png";
let images = [img, sideWayTree];
let game;
let cur_cunk = 1;


let draw = (x, y) => {
  ctx.drawImage(images[0], x -8, y + 10, 50, 110);

};
let drawSideWayTree = (x, y) => {
  ctx.drawImage(images[1], x - 45, y - 70, 100, 250);

};

let distance_between_skiis_x;
let distance_between_skiis_y;
let x_offset_of_ligtning;
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

  ctx.fillRect(-35 + distance_between_skiis_y , 0, 30, 5);
  ctx.fillRect(-35 + distance_between_skiis_y * -1, distance_between_skiis_x, 30, 5);
  ctx.restore();
  // Малюємо тулуб
  ctx.fillStyle = "#b3030f";
  ctx.fillRect(0, -5, 20, 25);

  ctx.fillStyle = "#f5f0ec";
  ctx.fillRect(x_offset_of_ligtning, -5, 2, 22);

  ctx.beginPath();
  ctx.fillStyle = "#d8cf89"; // Колір повного кола
  ctx.arc(10, -10, 10, 0, Math.PI * 2, true); // Повне коло (360°)
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
  let regularTrees = [];
  let sideWayTrees = [];
  trees.sort((a, b) => a.y - b.y).forEach((tree) => {
    if (tree.x > width * 0.2 && tree.x < width * 0.8) {
      regularTrees.push(tree);
    } else {
      sideWayTrees.push(tree);
    }
  });
  regularTrees.forEach((tree) => {
    draw(tree.x, tree.y - player_y + 10);
  });
  sideWayTrees.forEach((tree) => {
    drawSideWayTree(tree.x, tree.y - player_y + 10);
  });
}

function drawShadow(trees, player_y) {
  trees.forEach((tree) => {
    if (tree.x > width * 0.2 && tree.x < width * 0.8)
      ctx.fillRect(tree.x - 8, tree.y - player_y + 110, 45, 60);
    else {
      ctx.fillRect(tree.x - 20, tree.y - player_y + 150, 70, 150);
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
    cur_cunk = 0;
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
      game.restart();
      gameLoop();
    });

    function gameLoop() {
      const req_cur_chunk =game.get_current_chunk();
      if ( req_cur_chunk!== cur_cunk) {
        trees = game.get_all_trees_for_js(); 
        cur_cunk=req_cur_chunk;
      }

      try {
        game.update();
        if (game.get_is_game_over()) {
          return;
        }
        let player_y = game.get_player_y();

        ctx.fillStyle = "#95b1df";
        ctx.clearRect(0, 0, width, height);
        drawShadow(trees, player_y)
        drawTraces(player_y);

        drawSkier(ctx, game.get_player_x(), height * 0.2, game.get_player_rotation());
        drawtrees(trees, player_y)
        scoreDisplay.textContent =
          "Score: " + Math.floor(game.get_player_y());

        requestAnimationFrame(gameLoop);
      } catch (error) {
        console.error("Error during game loop:", error);
      }
    }
    console.log(game.get_player_x())
    gameLoop();
  } catch (error) {
    console.error(error);
  }
}

run();

