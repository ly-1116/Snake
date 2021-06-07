function Game(map, food, block, snake, span) {
    this.map = map;
    this.food = food;
    this.block = block;
    this.snake = snake;
    // 定时器
    this.time = 400;
    this.timebar = null;
    this.star = true;
    this.num = 0;
    this.span = span;
    this.flag = false;
}
Game.prototype.intl = function() {
        // 地图
        this.intlMap();
        // 食物
        this.intlFood();
        // 障碍物
        this.intlBlock()
            // 贪吃蛇
        this.intlSnake();
        // 移动蛇
        this.intlMove();
        // 改变方向
        this.change();
    }
    // 地图
Game.prototype.intlMap = function() {
        this.map.star();
    }
    // 食物
Game.prototype.intlFood = function() {
        this.map.arr[this.food.row][this.food.col].style.backgroundColor = 'red';
    }
    // 障碍物
Game.prototype.intlBlock = function() {
        var block = this.block.arr;
        for (var i = 0; i < block.length; i++) {
            this.map.arr[block[i].row][block[i].col].style.backgroundColor = '#000';
        }
    }
    // 贪吃蛇
Game.prototype.intlSnake = function() {
    var snake = this.snake.arr;
    for (var i = 0; i < snake.length; i++) {
        this.map.arr[snake[i].row][snake[i].col].style.backgroundColor = 'green';
    };
};
// 清空画布/
Game.prototype.clear = function() {
    var map = this.map.arr
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map.length; j++) {
            this.map.arr[i][j].style.backgroundColor = '';
        };
    };
};
// 移动蛇
Game.prototype.intlMove = function() {
    var t = this;
    this.timebar = setInterval(function() {
        t.snake.move();
        // 判断边界
        t.check();
        // 判断障碍物
        t.checkBlock();
        t.checkMe();
        // 吃食物
        t.eatFood();

        if (t.star) {
            // 清空画布
            t.clear();
            // 重新渲染
            t.intlFood();
            t.intlBlock();
            t.intlSnake();
        };
        t.flag = false;
    }, this.time)
};
// 判断边界
Game.prototype.check = function() {
    var head = this.snake.arr[0];
    if (head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col) {
        this.star = false;
        clearInterval(this.timebar);
        alert('游戏结束')
    };
};
// 判断障碍物
Game.prototype.checkBlock = function() {
    var block = this.block.arr;
    var head = this.snake.arr[0];
    for (var i = 0; i < block.length; i++) {
        if (block[i].row === head.row && block[i].col === head.col) {
            this.star = false;
            clearInterval(this.timebar);
            alert('游戏结束')
        };
    };
};
// 判断自己
Game.prototype.checkMe = function() {
    var head = this.snake.arr[0];
    var snake = this.snake.arr;
    for (var i = 1; i < snake.length; i++) {
        if (snake[i].row === head.row && snake[i].col === head.col) {
            this.star = false;
            clearInterval(this.timebar);
            alert('游戏结束')

        };
    };
};
// 吃到食物
Game.prototype.eatFood = function() {
        var head = this.snake.arr[0];
        if (this.food.row === head.row && this.food.col === head.col) {
            this.snake.grow();
            // 随机食物
            this.randomFood();
            // 随即障碍物
            this.randomBlock();
            // console.log(111);
            // 增加速度
            this.addSpeed();
        }

    }
    // 随机食物
Game.prototype.randomFood = function() {
    var row = parseInt(Math.random() * this.map.row);
    var col = parseInt(Math.random() * this.map.col);
    var head = this.snake.arr[0];
    var block = this.block.arr;
    for (var i = 0; i < block.length; i++) {
        if (block[i].row === row && block[i].col === col) {
            return this.randomFood();
        };
    };
    this.food.randomFood(row, col);
};
// 随即障碍物
Game.prototype.randomBlock = function() {
    var row = parseInt(Math.random() * this.map.row);
    var col = parseInt(Math.random() * this.map.col);
    var block = this.block.arr;
    var head = this.snake.arr[0];
    var food = this.food;
    for (var i = 0; i < block.length; i++) {
        if (row === block[i].row && col === block[i] || row === head.row && col === head.col || row === food.row && col === food.col) {
            return this.randomBlock();
        }
    }
    this.block.randomBlock(row, col);
};
// 改变方向
Game.prototype.change = function() {
    var t = this;
    document.addEventListener('keydown', function(e) {
        if (t.flag) {
            return;
        }
        t.flag = true;
        var code = e.keyCode;
        if (code === 37 || code === 38 || code === 39 || code === 40) {
            t.snake.changeSnake(code);
        };
    });
};
// 增加速度
Game.prototype.addSpeed = function() {
    this.num++;
    this.span.innerHTML = '得分' + this.num;
    if (6 > this.num && this.num >= 3) {
        this.time = 200;
        clearInterval(this.timebar);
        this.intlMove();
    } else if (this.num >= 6) {
        this.time = 100;
        clearInterval(this.timebar);
        this.intlMove();
    }
};