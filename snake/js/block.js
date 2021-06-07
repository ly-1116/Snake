function Block(img) {
    this.img = 'url(' + img + ')';
    this.arr = [{
            row: 5,
            col: 3
        },
        {
            row: 4,
            col: 4
        },
        {
            row: 6,
            col: 5
        },
        {
            row: 7,
            col: 6
        },
        {
            row: 6,
            col: 7
        },
        {
            row: 6,
            col: 8
        },
        {
            row: 6,
            col: 9
        },
        {
            row: 6,
            col: 10
        },
        {
            row: 6,
            col: 11
        },
    ]
}
Block.prototype.randomblock = function(row, col) {
    var obj = {
            row: row,
            col: col
        }
        // console.log(obj);
    this.arr.push(obj);
}