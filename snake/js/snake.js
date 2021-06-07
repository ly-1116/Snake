function Snake(head, body, tail) {
    this.arr = [{
        row: 4,
        col: 7
    }, {
        row: 4,
        col: 6
    }, {
        row: 4,
        col: 5
    }];
    //头部
    this.head = head;
    //尾巴
    this.tail = tail;
    //获取键码 left :37  top :38   right:39  botton:40  
    //默认像右移动
    this.dersion = 39;
    this.headImage = head[this.dersion - 37];
    this.bodyImage = body;
    this.tailImage = tail[this.dersion - 37];
    this.star = true;
}
Snake.prototype.move = function() {
    //把尾巴弹出来
    var tail = this.arr.pop();
    //尾巴与当前头部坐标相同
    tail.row = this.arr[0].row;
    tail.col = this.arr[0].col;
    switch (this.dersion) {
        //左移
        case 37:
            tail.col--;
            break;
            // 上移
        case 38:
            tail.row--;
            break;
            // 右移
        case 39:
            tail.col++;
            break;
            // 下移
        case 40:
            tail.row++;
            break;
        default:
            ;
    }
    // 获取最后一个
    var tailend = this.arr[this.arr.length - 1];
    // 获取倒数第二个
    var body = this.arr[this.arr.length - 2];
    //判断尾巴在哪
    if (tailend.row === body.row) {
        // 判断在同一行的时候尾巴在左还是在右
        if (tailend.col > body.col) {
            this.tailImage = this.tail[0];
        } else {
            this.tailImage = this.tail[2];
        }
    } else if (tailend.col === body.col) {
        if (tailend.row > body.row) {
            this.tailImage = this.tail[1];
        } else {
            this.tailImage = this.tail[3];
        }
    }
    // 将尾巴放在数组最前面
    this.arr.unshift(tail);
    this.star = true;
}
Snake.prototype.change = function(e) {
    // 更改头部图片
    if (!this.star) {
        return;
    }
    this.star = false;
    if (Math.abs(e - this.dersion) === 2) {
        return;
    }
    this.dersion = e;

    this.headImage = this.head[e - 37];
    // 更改尾部图片
}
Snake.prototype.grow = function() {
    var tail = this.arr[this.arr.length - 1];
    var obj = {
        row: tail.row,
        col: tail.col
    }
    this.arr.push(obj);
}