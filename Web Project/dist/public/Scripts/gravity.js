

const body = document.body;
const html = document.documentElement;

const height = Math.max(body.getBoundingClientRect().height, html.getBoundingClientRect().height);

var image = document.getElementById("donutsmall");

var gravity = 0.4;
var friction = 0.29;

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
  }
  
  function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1
  
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
  }
  

document.addEventListener("DOMContentLoaded", ready);

function ready() {
  canvas.width = innerWidth
  canvas.height = body.clientHeight
}

const canvas = document.getElementById("FallingDonuts");
const c = canvas.getContext('2d')


const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  //height = Math.max(body.getBoundingClientRect().height, html.getBoundingClientRect().height);
  canvas.width = innerWidth
  canvas.height = body.clientHeight

  
  //init()
})

// Objects
class Donut {
  constructor(x, y, dy, radius, color) {
    this.x = x
    this.y = y
    this.dy = dy;
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = "rgba(255,255,255,0)"
    c.drawImage(image, this.x, this.y)
    c.fill()
    c.closePath()
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height){
      this.dy = -this.dy * friction;
    }
    else {
      this.dy +=gravity;
    }
    this.y += this.dy;;
    
    this.draw()
  }
}

// Implementation
var dnt;
var dntArray = [];
let objects
function init() {
  dntArray.push(new Donut(randomIntFromRange(0, canvas.width), randomIntFromRange(-500, 0), 2, 40, 'red'))
  // console.log(body.clientHeight );

}


// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)


  dntArray.forEach(object => {
   object.update()
  })
}

init()
animate()