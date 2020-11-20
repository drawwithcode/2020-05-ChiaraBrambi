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
function preload(){}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(120);
}

function draw() {}

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
