let socket = io();
let myColor = 'white';
//quando arriva il messaggio attiva la funzione
socket.on("connect", newConnection);
socket.on("mouseBroadcast", otherMouse);
socket.on("color", setColor);
socket.on('newPlayer', newPlayer);

function setColor(assignedColor){
  myColor = assignedColor;
  }

  function newConnection() {
    console.log("your id:", socket.id);
  }

  //quali info vuoi mandare tra i client?
  function otherMouse(data){
    push();
    fill(data.color);
    ellipse(data.x, data.y,20);
    pop();
  }

  function newPlayer(newPlayerColor){
    console.log(newPlayerColor);
    push();
    fill('purple');
    rectMode(CENTER);
    rect(width/2,height/2,300, 100);
    textAlign('center');
    fill(newPlayerColor);
    textSize(20);
    text('new player joined: ' + newPlayerColor, width/2, height/2);
    pop();
  }


var cnv;
function preload(){}

function centerCanvas() {
var q = (windowWidth - width) / 2;
var s = (windowHeight - height) / 2;
cnv.position(q, s);
}

function setup() {
    cnv = createCanvas(windowHeight, windowHeight);
    centerCanvas();
    ellipseMode(CORNER);
    frameRate(12);
    push();
    background("purple");
    textSize(30);
    textAlign('center');
    fill(myColor);
    text('Walcame'+ myColor, width/2,height/2);
    pop();
}


function mouseMoved(){
  fill(myColor);
  ellipse(mouseX,mouseY,20);
  text('me', mouseX,mouseY);
  let message ={
    x: mouseX,
    y: mouseY,
    color: myColor,
  }
//sand to the server
socket.emit("mouse", message);
}

function draw() {
}


function windowResized() {
  centerCanvas();
}
