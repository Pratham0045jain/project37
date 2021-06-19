var database;
var drawing = [];
var currentPath = [];
var backgroundImg;
var isDrawing = false;

function preload() {
  backgroundImg = loadImage("background1.png");
}

function setup() {
  canvas = createCanvas(displayWidth, displayHeight - 350);
  canvas.mousePressed(startPath);
  canvas.parent("canvascontainer");
  canvas.mouseReleased(endPath);

  

  database = firebase.database();
  var ref = database.ref("drawings");
  ref.on("value", gotData, errData);

  var saveButton = select("#saveButton");
  saveButton.mousePressed(saveDrawing);

  var clearButton = select("#clearButton");
  clearButton.mousePressed(clearDrawing);




}

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
}

function draw() {
  background(backgroundImg);

  if (isDrawing) {
    var point = {
      x: mouseX,
      y: mouseY
    }
    currentPath.push(point);
  }


  stroke(0);
  strokeWeight(4);
  noFill();
  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
    beginShape();
    for (var j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y)
    }
    endShape();
  }
}

function saveDrawing() {
  var ref = database.ref("drawings");
  var data = {
    name: "Pratham",
    drawing: drawing
  }
  var result = ref.push(data, dataSent);
  console.log(result.key);


  function dataSent(err, status) {

  }

}

function gotData(data) {

  //clear the listing
  var elts = selectAll('.listing');
  for (var i = 0; i < elts.length; i++){
    elts[i].remove();
  }



  var drawings = data.val();
  var keys = Object.keys(drawings);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    //console.log(key);

    var li = createElement('li','');
    li.class('listing');
    var ahref = createA("#",key);
    ahref.mousePressed(showDrawing);
    ahref.parent(li);
    li.parent('drawinglist');
  }
}

function errData(err) {
  console.log(err);
}

function showDrawing(){
  var key = this.html()
  var ref = database.ref('drawings/' + key);
  ref.once('value', oneDrawing, errData);

  function oneDrawing(data){
    var dbDrawing = data.val();
    drawing = dbDrawing.drawing;
    //console.log(drawing);
  }
}

function clearDrawing(){
  drawing = [];
}