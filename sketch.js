
var backgroundImg;

var drawing = [];

function preload() {
  backgroundImg = loadImage("background1.png");
}

function setup() {
  createCanvas(800,400);
 // createSprite(400, 200, 50, 50);
}

function draw() {
  background(backgroundImg)  
  //drawSprites();

  point = {
    x : mouseX,
    y : mouseY
  }

  drawing.push(point);

  fill(255);
  stroke("red");
  beginShape();
  for (var j = 0; j<drawing.length;j++){
    vertex(drawing[j].x,drawing[j].y)
    
  }
  endShape();
  //drawing = [];
  
}