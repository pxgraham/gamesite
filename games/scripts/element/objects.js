function Object(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.update = function () {
        ctx.fillStyle = c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

function Bullet(x, y, w, h, c, id) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.update = function () {
        ctx.fillStyle = c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}