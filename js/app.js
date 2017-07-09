var canvas = document.getElementById('snake-game-canvas');
var ctx = canvas.getContext('2d');
var snakeSize = 10; 
var w = 420;
var h = 420;
var score = 0;
var h_score = 0;
var snake;
var snakeSize = 10;
var food;

var drawModule = (function () { 

  var bodySnake = function(x, y) {
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = 'green';
    ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var bodyFood = function(x, y) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    ctx.fillStyle = '#ff021b';
    ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }

  var scoreText = function() {
    var score_text = "Score: " + score;
    ctx.fillStyle = 'red';
    ctx.font = "15px Arial";
    ctx.fillText(score_text, 340, 23);
  }

  var highestScore = function() {
    var score_text = "HS: " + h_score;
    ctx.fillStyle = 'blue';
    ctx.font = "16px Arial";
    ctx.fillText(score_text, 10, 20);
  }

  var drawSnake = function() {
    var length = 4;
    snake = [];
    for (var i = length-1; i >= 0; i--) {
      snake.push({x:i, y:0});
    }
  }
    
  var paint = function(){
    ctx.fillStyle = 'lightyellow';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'grey';
    ctx.strokeRect(0, 0, w, h);

    btn.setAttribute('hidden', true);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (direction == 'right') { 
      snakeX++; }
    else if (direction == 'left') { 
      snakeX--; }
    else if (direction == 'up') { 
      snakeY--; 
    } else if(direction == 'down') { 
      snakeY++; }

    if (snakeX == -1 || snakeX == w/snakeSize || snakeY == -1 || snakeY == h/snakeSize || checkCollision(snakeX, snakeY, snake)) {
        btn.removeAttribute('hidden', true);
        ctx.clearRect(0,0,w,h);
        gameloop = clearInterval(gameloop);
        score = 0;
        return;
      }
      
      if(snakeX == food.x && snakeY == food.y) {
        var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
        score++;
        if(score > h_score) {
          h_score++;
        }
        if(score == 4) {
          gameloop = clearInterval(gameloop);
          gameloop = setInterval(paint, 160);
        } else if(score == 8) {
          gameloop = clearInterval(gameloop);
          gameloop = setInterval(paint, 120);
        } else if(score == 12) {
          gameloop = clearInterval(gameloop);
          gameloop = setInterval(paint, 100);
        } else if(score == 16) {
          gameloop = clearInterval(gameloop);
          gameloop = setInterval(paint, 80);
        } else if(score == 20) {
          gameloop = clearInterval(gameloop);
          gameloop = setInterval(paint, 60);
        } else if(score == 25) {
          gameloop = clearInterval(gameloop);
          gameloop = setInterval(paint, 50);
        } else if(score == 30) {
          gameloop = clearInterval(gameloop);
          gameloop = setInterval(paint, 40);
        } else if(score == 40) {
          gameloop = clearInterval(gameloop);
          gameloop = setInterval(paint, 30);
        }
        createFood();
      } else {
        var tail = snake.pop();
        tail.x = snakeX; 
        tail.y = snakeY;
      }
      snake.unshift(tail);

      for(var i = 0; i < snake.length; i++) {
        bodySnake(snake[i].x, snake[i].y);
      } 
      
      bodyFood(food.x, food.y); 
      scoreText();
      highestScore();
  }

  var createFood = function() {
      food = {
        x: Math.floor((Math.random() * 30) + 1),
        y: Math.floor((Math.random() * 30) + 1)
      }

      for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;
        if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
          food.x = Math.floor((Math.random() * 30) + 1);
          food.y = Math.floor((Math.random() * 30) + 1);
        }
      }
  }

  var checkCollision = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
      } 
      return false;
  }

  var init = function(){
      direction = 'down';
      drawSnake();
      createFood();
      gameloop = setInterval(paint, 200);
  }

  return {
    init : init
  };   
}());

(function (window, document, drawModule, undefined) {
  var btn = document.getElementById('btn');
  btn.addEventListener("click", function(){ drawModule.init();});
	document.onkeydown = function(event) {
    keyCode = window.event.keyCode; 
    keyCode = event.keyCode;

    switch(keyCode) {
      case 37:
        if (direction != 'right') {
          direction = 'left';
        }
        break;
      case 39:
        if (direction != 'left') {
          direction = 'right';
        }
        break;

      case 38:
        if (direction != 'down') {
          direction = 'up';
        }
        break;
      case 40:
        if (direction != 'up') {
          direction = 'down';
        }
        break;
    }
  }
})(window, document, drawModule);
