function Block() {
    this.arr = [{
        row: 5,
        col: 4
    }, {
        row: 5,
        col: 5
    }, {
        row: 5,
        col: 6
    }, {
        row: 5,
        col: 7
    }, {
        row: 5,
        col: 8
    }, {
        row: 5,
        col: 9
    }]
};
Block.prototype.randomBlock = function(row, col) {
    var obj = {
        row: row,
        col: col
    };
    this.arr.push(obj);
}