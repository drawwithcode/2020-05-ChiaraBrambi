let socket = io();
let myColor = "red";
//quando arriva il messaggio attiva la funzione
socket.on("connect", newConnection);
socket.on("mouseBroadcast", otherMouse);
socket.on("color", setColor);
function newConnection() {
  console.log("your id:", socket.id);
}


function setColor(assignedColor){
  myColor = assignedColor;
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
    frameRate(12);

}

function draw() {
  background('pink');
  text('Walcame'+ assignedColor, mouseX,mouseY);
}

//quali info vuoi mandare tra i client?
function otherMouse(data){
  //quello che succede quando accede un altro
  push();
  fill(data.color);
  ellipse(data.x, data.y,20);
  pop();
}


function mouseMoved(){
  ellipse(mouseX,mouseY,20);
  let message ={
    x: mouseX,
    y: mouseY,
    color: myColor//nome della proprietà: valore
  }
//sand to the server
socket.emit("mouse", message);
}


function windowResized() {
  centerCanvas();
}
