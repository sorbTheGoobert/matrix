const mater = document.getElementById("matrix");
const ctx = mater.getContext("2d");

// init
let width = window.innerWidth;
let height = window.innerHeight;

const bgColor = "rgba(0, 0, 0, 0.95)";

class Body {
  constructor(x, y, color) {
    this.xPos = x;
    this.yPos = y;
    this.color = color;
    this.letter = letters.charAt(Math.floor(Math.random() * letters.length));
  }
  draw = () => {
    ctx.font = "32px matrix";
    ctx.fillStyle = this.color;
    ctx.fillText(this.letter, this.xPos, this.yPos);
  };
}

class Head {
  constructor() {
    this.letter = letters.charAt(Math.floor(Math.random() * letters.length));
    this.xPos = Math.random() * (width + 33) - 16;
    this.yPos = -1 * Math.floor(Math.random() * height) - 32;
    this.color = "rgb(150, 255, 150)";
    this.gap = 16;
    this.speed = 10;
    this.body = [];
    this.timer = Math.floor(Math.random() * 120);
    for (let bodyPart = 0; bodyPart < 15; bodyPart++) {
      this.body.push(
        new Body(
          this.xPos,
          this.yPos - bodyPart * this.gap - 30,
          `rgb(${(15 - bodyPart) * 10}, ${255 - bodyPart * 10}, ${
            (15 - bodyPart) * 10
          })`
        )
      );
    }
  }
  move = () => {
    if (this.timer % 10 == 0) {
      this.letter = letters.charAt(Math.floor(Math.random() * letters.length));
      for(let i = 0; i < 3; i++) {
        this.body[Math.floor(Math.random() * this.body.length)].letter =
          letters.charAt(Math.floor(Math.random() * letters.length));
      }
    }

    for (let bodyPart = 0; bodyPart < this.body.length; bodyPart++) {
      this.body[bodyPart].yPos += this.speed;
      if (this.body[bodyPart].yPos - 32 > height) {
        if (bodyPart == 0) {
          this.body[0].yPos = this.yPos - this.gap;
          this.body[0].xPos = this.xPos;
        } else {
          this.body[bodyPart].yPos = this.body[bodyPart - 1].yPos - this.gap;
          this.body[bodyPart].xPos = this.body[bodyPart - 1].xPos;
        }
      }
    }

    this.yPos += this.speed;
    if (this.yPos - 32 > height) {
      this.yPos = -1 * Math.floor(Math.random() * height) - 16;
      this.xPos = Math.random() * (width + 17) - 8;
    }

    this.timer++;
  };
  draw = () => {
    ctx.font = "32px matrix";
    this.body.forEach((bodyPart) => {
      bodyPart.draw();
    });
    ctx.fillStyle = this.color;
    ctx.fillText(this.letter, this.xPos, this.yPos);
  };
}

const letters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%'#&_(),.;:?!|{}<>[]^~";

const rainDroplets = [
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
  new Head(),
];

// Main animation
function animation() {
  // change size
  width = window.innerWidth;
  height = window.innerHeight;
  mater.width = width;
  mater.height = height;

  // Draw
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // animate
  rainDroplets.forEach((droplet) => {
    droplet.move();
    droplet.draw();
  });
  requestAnimationFrame(animation);
}

window.onload = animation();
