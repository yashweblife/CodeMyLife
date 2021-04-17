var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth / 1.5;
canvas.height = window.innerHeight / 1.5;
var c = canvas.getContext('2d');
var bound = canvas.getBoundingClientRect();
var xlim = canvas.width;
var ylim = canvas.height;
var mouse = {
    x: 0,
    y: 0
}

function Ball() {
    this.pos = {
        x: Math.floor(Math.random() * xlim),
        y: Math.floor(Math.random() * xlim)
    }
    this.vel = {
        x: (Math.random() - 0.5),
        y: (Math.random() - 0.5)
    }
    this.r = Math.floor(Math.random() * 50);
    this.realRadius = this.r;
    this.color = `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.random()})`;
    this.respawn = () => {
        this.pos = {
            x: Math.floor(Math.random() * xlim),
            y: Math.floor(Math.random() * xlim)
        }
        this.vel = {
            x: (Math.random() - 0.5),
            y: (Math.random() - 0.5)
        }
    }
    this.check = (a) => {
        var dist = Math.sqrt((this.pos.x - a.x) ** 2 + (this.pos.y - a.y) ** 2);
        if (dist < 200) {
            this.r = Math.abs(dist - 200);
        } else {
            this.r = this.realRadius;
        }
    }
    this.show = () => {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2, false);
        c.fill();
        c.closePath();
    }
    this.update = () => {
        if (this.pos.x < 0 || this.pos.y < 0 || this.pos.x > xlim || this.pos.y > ylim) {
            this.respawn();
        }
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }
}

function World() {
    this.size = 200;
    this.balls = [];
    for (var i = 0; i < this.size; i++) {
        this.balls.push(new Ball());
    }
    this.check = (mouse) => {
        this.balls.forEach(ball => {
            ball.check(mouse);
        })
    }
    this.run = () => {
        this.balls.forEach(ball => {
            ball.update();
            ball.show();
        })
    }
    this.animate = () => {
        c.clearRect(0, 0, xlim, ylim);
        this.run();
        requestAnimationFrame(this.animate);
    }
}
var w = new World();
w.animate();

addEventListener('mousemove', (e) => {
    mouse.x = e.clientX - bound.left;
    mouse.y = e.clientY - bound.top;
    w.check(mouse);

})