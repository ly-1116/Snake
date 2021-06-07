function Maps(width, height, row, col, con) {
    this.width = width;
    this.height = height;
    this.row = row;
    this.col = col;
    this.innerWidth = parseInt(this.width / this.col);
    this.innerHeight = parseInt(this.height / this.row);
    this.arr = [];
    this.con = con;
}
Maps.prototype.intl = function() {
    // 地图
    // console.log(11111);
    for (var i = 0; i < this.row; i++) {
        // 创建行
        var rowDom = document.createElement('div');
        var rowArr = [];
        for (var j = 0; j < this.col; j++) {
            //创建每一个列单元格
            var colDom = document.createElement('div');
            //列单元格的样式
            this.css(colDom, {
                boxSizing: 'border-box',
                width: this.innerWidth + 'px',
                height: this.innerHeight + 'px',
                backgroundSize: 'cover'
            })
            rowDom.appendChild(colDom);
            rowArr.push(colDom);
        }
        // 行单元的样式
        this.css(rowDom, {
            display: 'flex',
        });
        this.con.appendChild(rowDom);
        this.arr.push(rowArr);
    }
    this.css(this.con, {
        width: this.width + 'px',
        height: this.height + 'px',
        margin: '0 auto',
        border: '1px solid #000',
        // backgroundColor: '#000'
    })

}

Maps.prototype.css = function(dom, obj) {
    for (k in obj) {
        dom.style[k] = obj[k];
    }
}