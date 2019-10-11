function Object(x, y, w, h, c, type) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.update = function () {
        if(this.type === 'wall') {
            ctx.fillStyle = "rgba(255, 2f55, 255, 0.5)";
        } else {
            // console.log()
            ctx.fillStyle = c;
        }
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
        ctx.fillStyle = "rgba(255, 2f55, 255, 0.5)";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}