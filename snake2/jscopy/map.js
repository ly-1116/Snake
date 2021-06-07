function Maps(width, height, row, col, con) {
    this.width = width;
    this.height = height;
    this.row = row;
    this.col = col;
    this.con = con;
    this.arr = [];
};
Maps.prototype.star = function() {
    for (var i = 0; i < this.row; i++) {
        var divrow = document.createElement('div');
        var rowarr = [];
        for (var j = 0; j < this.col; j++) {
            var divcol = document.createElement('div');
            rowarr.push(divcol);
            divrow.appendChild(divcol);
            this.css(divcol, {
                width: this.width / this.col + 'px',
                height: this.height / this.row + 'px',
                boxSizing: 'border-box'
            })

        }
        this.arr.push(rowarr);
        this.con.appendChild(divrow);
        this.css(divrow, {
            display: 'flex',
            width: this.width + 'px',
            height: this.height / this.row + 'px',
            boxSizing: 'border-box'
        })

    }
    this.css(this.con, {
        width: this.width + 'px',
        height: this.height + 'px',
        border: '1px solid  #ccc',
        margin: '0px auto',
        backgroundColor: '#ccc'

    });

}
Maps.prototype.css = function(dom, obj) {
    for (k in obj) {
        dom.style[k] = obj[k];
    }

}