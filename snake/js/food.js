function Food(row, col, img) {
    this.row = row;
    this.col = col;
    this.img = 'url(' + img + ')';
}
// 重置位置
Food.prototype.randomFood = function(row, col) {
    this.row = row;
    this.col = col;

}