function Snake() {
    this.arr = [{
        row: 3,
        col: 7
    }, {
        row: 3,
        col: 6
    }, {
        row: 3,
        col: 5
    }, ];
    // 默认方向   键码  左:37 上:38 右:39 下:40
    this.direction = 39;
    // 定义开关
};
Snake.prototype.move = function() {
    // 生成新的头部
    var head = this.arr[0];
    // var tail = this.arr[this.arr.length - 1];
    var newhead = {
        row: head.row,
        col: head.col
    };

    // 移动
    switch (this.direction) {
        case 37:
            newhead.col--;
            break;
        case 38:
            newhead.row--;
            break;
        case 39:
            newhead.col++;
            break;
        case 40:
            newhead.row++;
            break;
        default:
            ;
    }
    this.arr.unshift(newhead);
    this.arr.pop();
};

// 改变方向方法
Snake.prototype.changeSnake = function(code) {
    if (Math.abs(code - this.direction) === 2) {
        return;
    } else {
        this.direction = code;
    }
};
Snake.prototype.grow = function() {
    var tail = this.arr[this.arr.length - 1];
    this.arr.push(tail);
}