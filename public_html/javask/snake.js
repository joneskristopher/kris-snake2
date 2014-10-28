/* ----------------------------------------------------------------------------
 * variables
 * ----------------------------------------------------------------------------
 */

var snake;

var snakeLength;

var snakeSize;

var food;

var context;

var screenWidth;

var screenHeight;

var snakeDirection;

var gameState;

var gameOverMenu;

/* ----------------------------------------------------------------------------
 * game functions
 * ----------------------------------------------------------------------------
 */

gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 1000/30);

function gameInitialize() {
    var canvas = document.getElementById("gamescrn");
    context = canvas.getContext("2d");
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    document.addEventListener("keydown", keyBoardHandler);
    gameOverMenu = document.getElementById("gameover");
    setState("PLAY");
}

function gameLoop() {
    gameDraw();
    if (gameState == "PLAY"); {
        snakeUpdate();
        snakeDraw();
        foodDraw();
    }
}

function gameDraw() {
    context.fillStyle = "rgb(237, 230, 93)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}

/* ---------------------------------------------------------------------------
 * snake functions
 * ---------------------------------------------------------------------------
 */

function snakeInitialize() {
    snake = [];
    snakeLength = 5;
    snakeSize = 20;
    snakeDirection = "down";
    for(var index = snakeLength - 1; index >= 0; index--) {
        snake.push( {
            x: index,
            y: 0
        });
    }
}

function snakeDraw() {
    for(var index = 0; index < snake.length; index++) {
        context.fillStyle = "blue";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    checkFoodCollisions(snakeHeadX, snakeHeadY);
    checkWallCollisions(snakeHeadX, snakeHeadY);
    if (snakeDirection == "down") {
        snakeHeadY++;
    }
    if (snakeDirection == "right") {
        snakeHeadX++;
    }
    if (snakeDirection == "up") {
        snakeHeadY--;
    }
    if(snakeDirection == "left") {
        snakeHeadX--;
    }
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

/* ----------------------------------------------------------------------------
 * food functions
 * ----------------------------------------------------------------------------
 */

function foodInitialize () {
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}

function foodDraw () {
    context.fillStyle = "red";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function setFoodPosition () {
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);
    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}

/* ----------------------------------------------------------------------------
 * input functions
 * ----------------------------------------------------------------------------
 */
function keyBoardHandler(event) {
    console.log(event);
    if (event.keyCode == "76" && snakeDirection != "left") {
        snakeDirection = "right";
    } 
    if (event.keyCode == "73" && snakeDirection != "down") {
        snakeDirection = "up";
    }
    if (event.keyCode == "74" && snakeDirection != "right") {
        snakeDirection = "left";
    }
   
    if (event.keyCode == "75" && snakeDirection != "up") {
        snakeDirection = "down";
    }
}

/* ---------------------------------------------------------------------------
 * collision handling
 * ---------------------------------------------------------------------------
 */

function checkFoodCollisions(snakeHeadX, snakeHeadY) {
    if(snakeHeadX == food.x && snakeHeadY == food.y) {
         snake.push( {
            x: 0,
            y: 0
        });
        snakeLength++;
    }
}

function checkWallCollisions(snakeHeadX, snakeHeadY) {
    if(snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0) {
        setState("GAME OVER");
    }
}

/* ----------------------------------------------------------------------------
 * game state handling
 * ----------------------------------------------------------------------------
 */

function setState(state) {
    gameState = state;
    showMenu(state);
}

function displayMenu(menu) {
    menu.style.visibility = "visible";
}

function showMenu(state) {
    if (state == "GAME OVER") {
        displayMenu(gameOverMenu);
    }
}