let socket = io();
let myColor = 'white';
let pFriend;
let sfondo;
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
    noStroke();
    fill(data.color);
    ellipse(data.x, data.y,20);
    pop();
  }

let newFriend;
  function newPlayer(newPlayerColor){
    console.log(newPlayerColor);

    //testo
    newFriend = createP('new friend joined: ' + newPlayerColor);
    newFriend.style('color', newPlayerColor);

  }


var cnv;
function preload(){
//sfondo = loadImage('public/sfondo.png');
}

function centerCanvas() {
var q = (windowWidth - width) / 2;
var s = (windowHeight - height) / 2;
cnv.position(q, s);
}

let pMe;

function setup() {
    cnv = createCanvas(windowHeight, windowHeight);
    centerCanvas();
    ellipseMode(CORNER);
    frameRate(12);
    push();
    textSize(30);
    //image(sfondo,0,0);
    textAlign('center');
    fill(myColor);
    text('Walcame'+ myColor, width/2,height/2);
    pop();
//testo iniziale
    pFriend = createP('Draw with your friend and reduce the stress!');
    pFriend.style('font-size', '25px');
    pFriend.style('color', myColor);

    pMe= createP('>> you are: ' + myColor);
    pMe.style('font-size', '25px');
    pMe.style('color', myColor);
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
  ellipse(0,0,50);
  rect(0,0,100,10)
}


function windowResized() {
  centerCanvas();
}
