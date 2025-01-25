
import init, { Game } from "rust"; 

const canvas = document.getElementById("gameCanvas");
let wrapper = document.getElementById("wrapper")
function resizeCanvas() {
  if (window.innerWidth < 450) {
    wrapper.style.width = "100vw"; // Робимо ширину обгортки рівною ширині екрана
    canvas.width = window.innerWidth; // Встановлюємо ширину канваса
    canvas.height = window.innerHeight * 0.9; // Встановлюємо висоту канваса (90% від висоти вікна)
  }
  else{
    wrapper.style.width = "fit-content";
    canvas.width = window.innerWidth*0.5;
    canvas.height = window.innerHeight* 0.8;
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

let draw = (x, y) => {
  ctx.drawImage(images[0], x - 20, y+60, 50, 110);
};
let drawSideWayTree = (x, y) => {
  ctx.drawImage(images[1], x - 50, y -70, 100, 250);
};

function drawSkier(ctx, x, y, rotation) {
const radians = (rotation + 90)*-1 * (Math.PI / 180); 
    ctx.save(); 
    ctx.translate(x, y);
    ctx.save();
    ctx.rotate(radians);
    ctx.fillStyle = "brown";
    let distance_between_skiis_x= (90-Math.abs(rotation))/6
    let distance_between_skiis_y=   (rotation)/9;
    ctx.fillRect(-35+distance_between_skiis_y*-1, 0, 30, 5); 
    ctx.fillRect(-35+distance_between_skiis_y, distance_between_skiis_x, 30, 5); 
    ctx.restore();
    // Малюємо тулуб
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, -5, 20, 25);
    let x_offset_of_ligtning= 10+ rotation/11.25
    ctx.fillStyle = "black";
    ctx.fillRect(x_offset_of_ligtning, -5, 2, 22); 
    // Малюємо голову (напівколо)
    ctx.beginPath();
    ctx.fillStyle = "#d8cf89"; // Колір повного кола
    ctx.arc(10, -10, 10, 0, Math.PI * 2, true); // Повне коло (360°)
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "black"; // Колір напівкруга
    ctx.arc(10, -10, 10, 0, Math.PI, true); // Напівкруг (180°)
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "black"; // Колір напівкруга

    ctx.restore(); 
}

async function run() {
  try {
    await init(); 
    game = Game.new(height ,width , 15);

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
      try {
        game.update();
        if (game.get_is_game_over()) {
          return;
        }
        let player_y = game.get_player_y();

        const trees = game.get_all_trees_for_js();
        ctx.fillStyle = "#95b1df";
        ctx.clearRect(0, 0, width, height);
        trees.forEach((tree) => {
          if (tree.x > width*0.2 && tree.x < width*0.8)
            ctx.fillRect(tree.x - 15, tree.y - player_y + 140, 45, 60);
          else {
            ctx.fillRect(tree.x -20, tree.y - player_y + 140, 70, 150);
          }
        });

        let traces = game.get_all_traces_for_js();
        traces.forEach((trace) => {
            ctx.beginPath();
            ctx.arc(trace.x +5, trace.y - player_y  + height*0.205, 4, 0, 2 * Math.PI); 
            ctx.fill(); 
            ctx.beginPath();
            ctx.arc(trace.x +15, trace.y - player_y  + height*0.205, 4, 0, 2 * Math.PI); 
            ctx.fill();
        });

        ctx.fillStyle = "blue";
        ctx.fillRect(game.get_player_x(), height*0.2, 20, 20);

        drawSkier(ctx,game.get_player_x(), height * 0.2, game.get_player_rotation());
        let regularTrees = [];
        let sideWayTrees = [];
        trees.sort((a, b) => a.y - b.y).forEach((tree) => {
          if (tree.x >  width*0.2  && tree.x <  width*0.8 ) {
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
          console.log(game.get_player_x())

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

