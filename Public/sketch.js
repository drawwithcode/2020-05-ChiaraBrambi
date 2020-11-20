let socket = io();
//quando arriva il messaggio attiva la funzione
socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);

function newConnection() {
  console.log("your id:", socket.id);
}

function drawOtherMouse(data){
  //quello che succede quando accede un altro
  fill('yellow');
  ellipse(data.x, data.y,20);
}

var cnv;
let w, h, num, radius;
let blackOn, redOn, blueOn, greenOn, yellowOn, purpleOn; //colori
let colorOn = 0; //colori
let paper;

function preload(){}

function centerCanvas() {
var q = (windowWidth - width) / 2;
var s = (windowHeight - height) / 2;
cnv.position(q, s);
}

function setup() {
    cnv = createCanvas(720, 720);
    centerCanvas();
    ellipseMode(CORNER);
    num = 25;
    h = height / num;
    w = width / num;
    radius = 25;
    background(120);


  //colori
  blackOn = color(0);
  redOn = color(241, 80, 96);
  blueOn = color(50, 85, 164);
  greenOn = color(0, 169, 92);
  yellowOn = color(255, 181, 17);
  purpleOn = color(187, 118, 207);

  // extra canvas to draw
  paper = createGraphics(windowWidth,windowHeight);
  paper.clear();
  paper.stroke(207, 244, 255);
}

function draw() {
  stroke(207, 244, 255);
  grid();
  image(paper, 0, 0);
}

function mouseMoved(){
  fill('white');
  ellipse(mouseX,mouseY,20);
  let message ={
    x: mouseX,
    y:mouseY,
  };
//sand to the server
socket.emit("mouse", message);
}

function grid() {
// questo permette di muoversi SENZA diegnare
  for (let x = 0; x < width; x += w) {
    for (let y = 0; y < height; y += h) {
      if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
        fill(colorOn)
      } else {
        fill('white')
      }
      rect(x, y, w, h)
    }
  }
}
