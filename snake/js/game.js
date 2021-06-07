function Game(map, food, block, snake, span) {
    //储存实例化对象
    this.map = map;
    this.food = food;
    this.block = block;
    this.snake = snake;
    // 定义循环时间
    this.time = 300;
    this.timebar = null;
    // 定义开关
    this.start = true;
    // 定义累加器
    this.num = 0;
    this.span = span;
}
Game.prototype.intl = function() {
        // 地图
        this.intlMap();
        // 食物
        this.intlFood();
        //障碍物
        this.intlblock();
        //绘制贪吃蛇
        this.intlSnake();
        //移动贪吃蛇
        this.moveSnake();
        //移动
        this.bindEvent();
        //判断边界游戏结束
        this.check();
        //判断障碍物结束游戏
        this.checkBlock();
        //吃到食物增加一个
        this.bigFood();

    }
    // 封装
Game.prototype.intlMap = function() {
    // 地图
    this.map.intl();

}
Game.prototype.intlFood = function() {
    this.map.arr[this.food.row][this.food.col].style.backgroundImage = this.food.img;

}
Game.prototype.intlblock = function() {
    for (var i = 0; i < this.block.arr.length; i++) {
        var block = this.block.arr[i];
        this.map.arr[block.row][block.col].style.backgroundImage = this.block.img;
    }
}
Game.prototype.intlSnake = function() {
        // 设置头
        var head = this.snake.arr[0];
        //设置头的背景
        this.map.arr[head.row][head.col].style.backgroundImage = 'url(' + this.snake.headImage + ')';
        //设置身体
        for (var i = 1; i < this.snake.arr.length - 1; i++) {
            var body = this.snake.arr[i];
            //设置身体的背景
            this.map.arr[body.row][body.col].style.backgroundImage = 'url(' + this.snake.bodyImage + ')';
        }
        //设置尾巴
        var tail = this.snake.arr[this.snake.arr.length - 1];
        //设置尾巴的背景
        this.map.arr[tail.row][tail.col].style.backgroundImage = 'url(' + this.snake.tailImage + ')';

    }
    // 清除画布
Game.prototype.clear = function() {
    //    清除每个单元格 循环
    for (var i = 0; i < this.map.arr.length; i++) {
        for (var j = 0; j < this.map.arr[i].length; j++) {
            this.map.arr[i][j].style.backgroundImage = '';
        }
    }

}
Game.prototype.moveSnake = function() {
        var t = this;
        this.timebar = setInterval(function() {
            // 移动
            t.snake.move();
            // 结束游戏
            // 边界
            t.check();
            // 障碍物
            t.checkBlock();
            // 食物
            t.bigFood();
            // 自己
            t.checkMe();
            if (t.start) {
                // 清除画布
                t.clear();
                // 从新渲染
                // 食物
                t.intlFood();
                // 障碍物
                t.intlblock();
                // 蛇
                t.intlSnake();
            }
        }, this.time)
    }
    //监听事件
Game.prototype.bindEvent = function() {
    var that = this;
    // if (!that.start) {
    //     return;
    // }
    // that.start = false;
    document.addEventListener('keyup', function(e) {
        switch (e.keyCode) {
            case 37:
            case 38:
            case 39:
            case 40:
                that.snake.change(e.keyCode);
                break;
            default:
                ;
        }
    })
};

//判断边界游戏结束
Game.prototype.check = function() {
    var head = this.snake.arr[0];
    if (head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col) {
        this.start = false;
        clearInterval(this.timebar);
        alert('游戏结束');
    }
};
//判断障碍物游戏结束
Game.prototype.checkBlock = function() {
    var block = this.block.arr;
    var head = this.snake.arr[0];
    // console.log(block);
    for (var i = 0; i < block.length; i++) {
        if (block[i].row === head.row && block[i].col === head.col) {
            this.start = false;
            clearInterval(this.timebar);
            alert('游戏结束');
        }
    }
};
// 吃到食物变大
Game.prototype.bigFood = function() {
    var head = this.snake.arr[0];
    if (head.row === this.food.row && head.col === this.food.col) {
        this.snake.grow();
        // 随机食物
        this.randomFood();
        //增加速度
        this.speed();
        // 随即障碍物
        this.randomblock();
    }
};
// 随机食物
Game.prototype.randomFood = function() {
        var row = parseInt(Math.random() * this.map.row);
        var col = parseInt(Math.random() * this.map.col);
        var block = this.block.arr;
        for (var i = 0; i < block.length; i++) {
            if (block[i].row === row && block[i].col === col) {
                return this.randomFood();
            }
        }
        this.food.randomFood(row, col);
    }
    // 碰到自己结束游戏
Game.prototype.checkMe = function() {
    var snake = this.snake.arr;
    var head = this.snake.arr[0];
    for (var i = 1; i < snake.length; i++) {
        if (snake[i].row === head.row && snake[i].col === head.col) {
            this.start = false;
            clearInterval(this.timebar);
            alert('游戏结束');
        }
    }
};
//增加速度
Game.prototype.speed = function() {
    // 累加器
    this.num++;
    console.log(this.num);
    this.span.innerHTML = '得分' + this.num;
    // 吃到食物增加速度
    if (4 <= this.num && this.num < 8) {
        this.time = 200;
        clearInterval(this.timebar);
        this.moveSnake();
    } else if (8 <= this.num && this.num < 12) {
        this.time = 100;
        clearInterval(this.timebar);
        this.moveSnake();
    } else if (12 <= this.num) {
        this.time = 50;
        clearInterval(this.timebar);
        this.moveSnake();
    }
};
// 随机障碍物
Game.prototype.randomblock = function() {
    var row = parseInt(Math.random() * this.map.row);
    var col = parseInt(Math.random() * this.map.col);
    // console.log(row, col);
    var block = this.block.arr;
    var head = this.snake.arr[0];
    for (var i = 0; i < block.length; i++) {
        // 判断随机出现的障碍物不能在的地方
        if (row === block[i].row && col === block[i].col || row === head.row && col === head.col || row === this.food.row && col === this.food.col) {
            return this.randomblock();
        }
    }
    this.block.randomblock(row, col);
};