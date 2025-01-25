import init, { Game } from "../../rust/pkg/rust.js"; 


const canvas = document.getElementById("gameCanvas");
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

let draw = (x, y) => {
  ctx.drawImage(images[0], x - 20, y , 70, 120);
};
let drawSideWayTree = (x, y) => {
  ctx.drawImage(images[1], x - 50, y + 40, 100, 250);
};

async function run() {
  try {
    await init(); // Initialize the WASM module
    game = Game.new(width, height, 15); // Initialize the game object
    game.begin(); // Start the game

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

    function gameLoop() {
      try {
        game.update();
        if (game.get_is_game_over()) {
          alert("Game Over! Your score: " + game.get_player_y());
          return;
        }
        let player_y = game.get_player_y();

        const trees = game.get_all_trees_for_js();
        ctx.fillStyle = "#95b1df";
        ctx.clearRect(0, 0, width, height);
        trees.forEach((tree) => {
          if (tree.x > 50 && tree.x < width - 50)
            ctx.fillRect(tree.x - 5, tree.y - player_y + 110, 45, 40);
          else {
            ctx.fillRect(tree.x -20, tree.y - player_y + 280, 40, 70);
          }
        });
        ctx.fillStyle = "blue";
        let regularTrees = [];
        let sideWayTrees = [];
        ctx.fillRect(game.get_player_x(), height * 0.2, 20, 20);
        trees.sort((a, b) => a.y - b.y).forEach((tree) => {
          if (tree.x > 50 && tree.x < width - 50) {
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

restartBtn.addEventListener("click", () => {
  game = Game.new(width, height, 3);
  game.begin();
  gameLoop();
});