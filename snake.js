window.onload = function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let w = 450;
    let h = 450;
    let cellWidth = 10;
    let direction;
    let score = 0;
    let snakeArray;
    let level = 1;
    let food;

    function init() {
        direction = 'right';
        createSnake();
        createFood();

        if (typeof gameLoop != "undefined") {
            clearInterval(gameLoop);
        }
        gameLoop = setInterval(paint, 100);
    }

    init();

    function createSnake() {
        var length = 4;
        snakeArray = [];

        // for (let index in length) {
        //     snakeArray.push({x:index, y:0});
        // }

        for (var i = length - 1; i >= 0; i--) {
            //This will create a horizontal snake starting from the top left
            snakeArray.push({ x: i, y: 0 });
        }
    }

    function createFood() {
        food = {
            x: Math.round(Math.random() * (w - cellWidth) / cellWidth),
            y: Math.round(Math.random() * (h - cellWidth) / cellWidth)
        };
    }

    function paint() {
        ctx.fillStyle = "#ccc";
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, w, h);

        let nx = snakeArray[0].x;
        let ny = snakeArray[0].y;

        if (direction == "right") nx++;
        else if (direction == "left") nx--;
        else if (direction == "up") ny--;
        else if (direction == "down") ny++;

        if (nx == -1 || nx == w / cellWidth || ny == -1 || ny == h / cellWidth || snakeCollided(nx, ny, snakeArray)) {
            //restart game
            init();
            //Lets organize the code a bit now.
            return;
        }

        let tail;

        if (nx == food.x && ny == food.y) {
            tail = { x: nx, y: ny };
            score++;

            createFood();
        }
        else {
            tail = snakeArray.pop(); //pops out the last cell
            tail.x = nx; tail.y = ny;
        }

        snakeArray.unshift(tail); //puts back the tail as the first cell

        snakeArray.forEach(item => {
            paintCell(item.x, item.y, "blue");
        });

        //Lets paint the food
        paintCell(food.x, food.y, "red");
        //Lets paint the score
        let scoreText = `Score: ${score}`
        let levelText = `Level: ${level}`;

        ctx.fillText(scoreText, 5, h - 5);
        ctx.fillText(levelText, 60, h - 5);
    }

    function paintCell(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);

        ctx.strokeStyle = "white";
        ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
    }

    function snakeCollided(x, y, array) {
        array.forEach(item => {
            if (item.x == x && item.y == y) {
                return true;
            }
            return false;
        });
    }

    window.addEventListener('keydown', (e) => {
        let key = e.keyCode;

        if (key == "37" && direction != "right") direction = "left";
        else if (key == "38" && direction != "down") direction = "up";
        else if (key == "39" && direction != "left") direction = "right";
        else if (key == "40" && direction != "up") direction = "down";
    });

}

